package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.responseDto.reports.MonthlyRevenueDTO;
import com.csplms.entity.Payment;

import java.sql.Date;
import java.util.List;

public interface PaymentService {
    List<Payment> getAllPayments();

    List<MonthlyRevenueDTO> getMonthlyRevenue(Date startDate, Date endDate);

    List<MonthlyRevenueDTO> getLastTwelveMonthsRevenue();
}
