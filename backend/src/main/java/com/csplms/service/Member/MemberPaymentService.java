package com.csplms.service.Member;

import com.csplms.dto.requestDto.KhaltiPaymentInitiateRequestDto;
import com.csplms.dto.requestDto.KhaltiPaymentVerificationRequestDto;
import com.csplms.dto.responseDto.KhaltiPaymentInitiateResponseDto;
import com.csplms.entity.*;
import com.csplms.exception.MailFailedException;
import com.csplms.exception.ResourceEntityNotFoundException;
import com.csplms.mapper.MemberPaymentMapper;
import com.csplms.repository.*;
import com.csplms.util.DateTimeUtil;
import com.csplms.util.EmailUtil;
import com.csplms.util.GetAuthUserUtil;
import com.csplms.util.GlobalDateUtil;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;
import com.csplms.dto.requestDto.KhaltiPaymentRequest;

@Service
public class MemberPaymentService {

    private final RestClient restClient;
    private final MemberPaymentMapper memberPaymentMapper;
    private static final Logger logger = LoggerFactory.getLogger(MemberPaymentService.class);
    private final FineRepository fineRepository;
    private final DateTimeUtil dateTimeUtil;
    private final GlobalDateUtil globalDateUtil;
    private final PaymentRepository paymentRepository;
    private final EmailUtil emailUtil;
    private final GetAuthUserUtil getAuthUserUtil;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final BorrowRepository borrowRepository;
    private final ReturnRepository returnRepository;

    @Autowired
    public MemberPaymentService(RestClient restClient, MemberPaymentMapper memberPaymentMapper, FineRepository fineRepository, DateTimeUtil dateTimeUtil, GlobalDateUtil globalDateUtil, PaymentRepository paymentRepository, EmailUtil emailUtil, GetAuthUserUtil getAuthUserUtil, UserRepository userRepository, BookRepository bookRepository, BorrowRepository borrowRepository, ReturnRepository returnRepository) {
        this.restClient = restClient;
        this.memberPaymentMapper = memberPaymentMapper;
        this.fineRepository = fineRepository;
        this.dateTimeUtil = dateTimeUtil;
        this.globalDateUtil = globalDateUtil;
        this.paymentRepository = paymentRepository;
        this.emailUtil = emailUtil;
        this.getAuthUserUtil = getAuthUserUtil;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.borrowRepository = borrowRepository;
        this.returnRepository = returnRepository;
    }

    public KhaltiPaymentInitiateResponseDto initiateFinePayment(KhaltiPaymentInitiateRequestDto khaltiPaymentInitiateRequestDto) {
        logger.warn("KhaltiPaymentInitiateRequestDto is: {}", khaltiPaymentInitiateRequestDto);
        KhaltiPaymentRequest khaltiPaymentRequest = memberPaymentMapper.prepareKhaltiPayment(khaltiPaymentInitiateRequestDto);
        KhaltiPaymentInitiateResponseDto khaltiPaymentInitiateResponseDto = restClient
                .post()
                .uri("https://dev.khalti.com/api/v2/epayment/initiate/")
                .header("Authorization", "key 78d4ab4e77364e189f8fffe6f014ffee")
                .body(khaltiPaymentRequest)
                .retrieve()
                .body(KhaltiPaymentInitiateResponseDto.class);
        logger.warn("KhaltiPaymentInitiateResponseDto is: {}", khaltiPaymentInitiateResponseDto);
        return khaltiPaymentInitiateResponseDto;
    }

    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    public Boolean verifyKhaltiPayment(KhaltiPaymentVerificationRequestDto khaltiPaymentVerificationRequestDto) throws MessagingException, MailFailedException {
        final String status = khaltiPaymentVerificationRequestDto.status();
        final String pidx = khaltiPaymentVerificationRequestDto.pidx();
        final String txnId = khaltiPaymentVerificationRequestDto.txnId();
        final String tidx = khaltiPaymentVerificationRequestDto.tidx();
        final String total_amount = khaltiPaymentVerificationRequestDto.total_amount();
        final String purchase_order_id = khaltiPaymentVerificationRequestDto.purchase_order_id();
        final String purchase_order_name = khaltiPaymentVerificationRequestDto.purchase_order_name();

        Fine fine = fineRepository.findById(Integer.parseInt(purchase_order_id)).orElseThrow(() -> new ResourceEntityNotFoundException("Fine", "Id", Long.valueOf(purchase_order_id)));
        fine.setPaidStatus(true);
        fine = fineRepository.save(fine);
        fineRepository.flush();

        // convert to rupees
        Double totalAmount = Double.valueOf(total_amount)/100;
        Integer roundedIntegerValue =(int) Math.floor(totalAmount);

        // for payment table
        Payment payment = new Payment();
        payment.setAmount(roundedIntegerValue);
        payment.setDate(globalDateUtil.getCurrentDate());
        payment.setPidx(pidx);
        payment.setTxnId(txnId);
        payment.setTidx(tidx);
        payment.setFine(fine);
        payment = paymentRepository.save(payment);
        paymentRepository.flush();

//        For mail
//        Get the user
        Integer userId = fine.getReturns().getBorrows().getBorrowUsers().getUserId();
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", 0));
        logger.warn("User id is: {}", userId);

//        Get book
        Integer bookId = fine.getReturns().getBorrows().getBorrowBooks().getBookId();
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id", bookId));

//        Get borrow
        Integer borrowId = fine.getReturns().getBorrows().getBorrowId();
        Borrow borrow = borrowRepository.findById(borrowId).orElseThrow(() -> new ResourceEntityNotFoundException("Borrow", "Id", borrowId));

//        Get return
        Integer returnId = fine.getReturns().getReturnId();
        Return bookReturn = returnRepository.findById(returnId).orElseThrow(() -> new ResourceEntityNotFoundException("Return", "Id", borrowId));

        emailUtil.finePaidMail(user, book, borrow, bookReturn, payment);

        logger.warn(purchase_order_name);

        return true;
    }

}
