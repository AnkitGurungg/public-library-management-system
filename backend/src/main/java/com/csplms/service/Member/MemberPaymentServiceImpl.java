package com.csplms.service.Member;

import com.csplms.entity.*;
import com.csplms.exception.KhaltiPaymentInitiateFailedException;
import com.csplms.exception.MailFailedException;
import com.csplms.exception.ResourceEntityNotFoundException;
import com.csplms.mapper.MemberPaymentMapper;
import com.csplms.repository.*;
import com.csplms.util.EmailUtil;
import com.csplms.util.GlobalDateUtil;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;
import com.csplms.dto.requestDto.KhaltiPaymentRequest;
import com.csplms.config.KhaltiAPIProperties;
import com.csplms.dto.requestDto.KhaltiPaymentInitiateRequestDto;
import com.csplms.dto.requestDto.KhaltiPaymentLookupRequestDto;
import com.csplms.dto.requestDto.KhaltiPaymentVerificationRequestDto;
import com.csplms.dto.responseDto.KhaltiPaymentInitiateResponseDto;
import com.csplms.dto.responseDto.KhaltiPaymentLookupResponseDto;
import com.csplms.dto.responseDto.KhaltiPaymentVerificationResponseDto;

import java.util.Map;
import java.util.Optional;

@Service
public class MemberPaymentServiceImpl implements MemberPaymentService {

    private final RestClient khaltiRestClient;
    private final MemberPaymentMapper memberPaymentMapper;
    private final FineRepository fineRepository;
    private final GlobalDateUtil globalDateUtil;
    private final PaymentRepository paymentRepository;
    private final EmailUtil emailUtil;
    private final KhaltiAPIProperties khaltiProperties;

    private static final Logger logger = LoggerFactory.getLogger(MemberPaymentServiceImpl.class);

    @Autowired
    public MemberPaymentServiceImpl(
            RestClient khaltiRestClient,
            MemberPaymentMapper memberPaymentMapper,
            FineRepository fineRepository,
            GlobalDateUtil globalDateUtil,
            PaymentRepository paymentRepository,
            EmailUtil emailUtil,
            KhaltiAPIProperties khaltiProperties
    ) {
        this.khaltiRestClient = khaltiRestClient;
        this.memberPaymentMapper = memberPaymentMapper;
        this.fineRepository = fineRepository;
        this.globalDateUtil = globalDateUtil;
        this.paymentRepository = paymentRepository;
        this.emailUtil = emailUtil;
        this.khaltiProperties = khaltiProperties;
    }

    @Override
    public KhaltiPaymentInitiateResponseDto initiateFinePayment(KhaltiPaymentInitiateRequestDto khaltiPaymentInitiateRequestDto) {
        try {
            logger.warn("KhaltiPaymentInitiateRequestDto is: {}", khaltiPaymentInitiateRequestDto);
            KhaltiPaymentRequest khaltiPaymentRequest = memberPaymentMapper.prepareKhaltiPayment(khaltiPaymentInitiateRequestDto);
            KhaltiPaymentInitiateResponseDto khaltiPaymentInitiateResponseDto = khaltiRestClient
                    .post()
                    .uri(khaltiProperties.getInitiateUrl())
                    .body(khaltiPaymentRequest)
                    .retrieve()
                    .body(KhaltiPaymentInitiateResponseDto.class);
            logger.warn("KhaltiPaymentInitiateResponseDto is: {}", khaltiPaymentInitiateResponseDto);
            return khaltiPaymentInitiateResponseDto;
        } catch (Exception e){
            logger.error("KhaltiPaymentInitiateFailedException: {}", e.getMessage());
            throw new KhaltiPaymentInitiateFailedException(false, "Service temporarily unavailable. Please try again later.");
        }
    }

    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    @Override
    public KhaltiPaymentVerificationResponseDto verifyKhaltiPayment(KhaltiPaymentVerificationRequestDto verificationRequestDto) throws MessagingException, MailFailedException {
        final String pidx = verificationRequestDto.pidx();
        final String txnId = verificationRequestDto.txnId();
        final String total_amount = verificationRequestDto.total_amount();
        final String purchase_order_id = verificationRequestDto.purchase_order_id();
        final String purchase_order_name = verificationRequestDto.purchase_order_name();
        logger.warn("KhaltiPaymentVerificationRequestDto: {}", verificationRequestDto);

        KhaltiPaymentLookupResponseDto lookupResponse;
        try {
            lookupResponse = khaltiRestClient
                    .post()
                    .uri(khaltiProperties.getLookupUrl())
                    .body(new KhaltiPaymentLookupRequestDto(pidx))
                    .retrieve()
                    .body(KhaltiPaymentLookupResponseDto.class);
            logger.warn("khaltiPaymentLookupResponseDto: {}", lookupResponse);
        } catch (Exception e) {
            logger.error("Unexpected error during Khalti payment verification! {}", e.getMessage());
            return new KhaltiPaymentVerificationResponseDto(false, "Error", "Unexpected payment verification error. Please contact support team!", null);
        }

//        Null response - verification failed, do not process payment
        if (lookupResponse == null) {
            return new KhaltiPaymentVerificationResponseDto(
                    false,
                    "Unknown",
                    "Could not verify payment. Please contact support.",
                    null
            );
        }

//        Assigning messages based on khalti payment status
        final Map<String, String> statusMessages = Map.of(
                "Completed", "Payment successful. Fine has been marked as paid.",
                "Pending", "Payment is pending. Please wait or contact support.",
                "Refunded", "Payment has been refunded. Fine is not marked as paid.",
                "Expired", "Payment link has expired. Please try again.",
                "User canceled", "Payment was canceled by the user.",
                "Initiated", "Payment has been initiated but not completed."
        );
        String status = lookupResponse.status();
        String message = statusMessages.getOrDefault(
                status,
                "Unknown payment status. Please contact support."
        );
        Map<String, Object> data = Map.of(
                "pidx", lookupResponse.pidx(),
                "totalAmount", Math.floor(Double.valueOf(total_amount) / 100)
        );

//        Only the status with Completed must be treated as success.
        if ("Completed".equals(status)) {

            // Lock the row for update and check if fine is marked as paid
            Fine fine = fineRepository.findByIdForUpdate(Integer.parseInt(purchase_order_id)).orElseThrow(() -> new ResourceEntityNotFoundException("Fine", "Id", (long) Integer.parseInt(purchase_order_id)));
            if (fine.isPaidStatus()) {
                return new KhaltiPaymentVerificationResponseDto(true, status, message, data);
            }

            // Check if payment already exists
            Optional<Payment> existingPayment = paymentRepository.findByPidx(pidx);
            if (existingPayment.isPresent()) {
                return new KhaltiPaymentVerificationResponseDto(true, status, "Payment already processed.", data);
            }

            // Mark fine as paid
            fine.setPaidStatus(true);
            fine = fineRepository.saveAndFlush(fine);

            // Convert to rupees
            Double totalAmount = Double.valueOf(total_amount) / 100;
            Integer roundedIntegerValue = (int) Math.floor(totalAmount);

            // Insert payment
            Payment payment = new Payment();
            payment.setAmount(roundedIntegerValue);
            payment.setDate(globalDateUtil.getCurrentDate());
            payment.setPidx(pidx);
            payment.setTxnId(txnId);
            payment.setFine(fine);
            payment = paymentRepository.saveAndFlush(payment);

            // Send email
            User user = fine.getReturns().getBorrows().getBorrowUsers();
            Book book = fine.getReturns().getBorrows().getBorrowBooks();
            Borrow borrow = fine.getReturns().getBorrows();
            Return bookReturn = fine.getReturns();
            emailUtil.finePaidMail(user, book, borrow, bookReturn, payment);

            return new KhaltiPaymentVerificationResponseDto(true, status, message, data);
        }
        else {
            return new KhaltiPaymentVerificationResponseDto(false, status, message, null);
        }
    }

}
