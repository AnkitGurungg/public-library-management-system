package com.csplms.controller.LibrarianAdmin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.csplms.entity.Payment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.csplms.dto.responseDto.reports.MonthlyRevenueDTO;
import com.csplms.service.LibrarianAdmin.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import java.sql.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/m/payment")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class PaymentController {

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);
    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/get/payments")
    public ResponseEntity<List<Payment>> getAllPayments() {
        return new ResponseEntity<>(this.paymentService.getAllPayments(), HttpStatus.OK);
    }

//    Both for 1st chart
//    Selecting date ranges for revenue
    @GetMapping("/revenue/monthly")
    public ResponseEntity<List<MonthlyRevenueDTO>> getMonthlyRevenue(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        try {
            Date sqlStartDate = Date.valueOf(startDate);
            Date sqlEndDate = Date.valueOf(endDate);
            List<MonthlyRevenueDTO> revenue = paymentService.getMonthlyRevenue(sqlStartDate, sqlEndDate);
            return ResponseEntity.ok(revenue);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//    For last twelve months revenue
    @GetMapping("/revenue/last-twelve-months")
    public ResponseEntity<List<MonthlyRevenueDTO>> getLastTwelveMonthsRevenue() {
        try {
            List<MonthlyRevenueDTO> revenue = paymentService.getLastTwelveMonthsRevenue();
            return ResponseEntity.ok(revenue);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
