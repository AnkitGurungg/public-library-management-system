package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.responseDto.reports.MonthlyRevenueDTO;
import com.csplms.entity.Payment;
import com.csplms.exception.ResourceListNotFoundException;
import com.csplms.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payment> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        if (payments.isEmpty()) {
            throw new ResourceListNotFoundException("Payments");
        }
        return payments;
    }

    public List<MonthlyRevenueDTO> getMonthlyRevenue(Date startDate, Date endDate) {
        List<Object[]> results;

        if (startDate != null && endDate != null) {
            results = paymentRepository.getMonthlyRevenue(startDate, endDate);
        } else {
            results = paymentRepository.getAllMonthlyRevenue();
        }

        return results.stream()
                .map(result -> new MonthlyRevenueDTO(
                        ((Number) result[0]).intValue(),  // year
                        ((Number) result[1]).intValue(),  // month
                        ((Number) result[2]).longValue()  // totalRevenue
                ))
                .collect(Collectors.toList());
    }

    public List<MonthlyRevenueDTO> getLastTwelveMonthsRevenue() {
        Calendar cal = Calendar.getInstance();
        Date endDate = new Date(cal.getTimeInMillis());

        cal.add(Calendar.MONTH, -12);
        Date startDate = new Date(cal.getTimeInMillis());

        return getMonthlyRevenue(startDate, endDate);
    }

}
