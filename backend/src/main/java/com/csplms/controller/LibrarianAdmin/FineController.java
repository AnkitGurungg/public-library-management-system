package com.csplms.controller.LibrarianAdmin;

import com.csplms.dto.responseDto.AdminFineDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.csplms.service.LibrarianAdmin.FineService;
import com.csplms.dto.responseDto.reports.MonthlyFineStatsDTO;
import com.csplms.dto.responseDto.reports.FineCollectionStatsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/la/fines")
@PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class FineController {

    private final FineService fineService;

    @Autowired
    public FineController(FineService fineService) {
        this.fineService = fineService;
    }

    @GetMapping
    public ResponseEntity<List<AdminFineDto>> getAllFineRecords() {
        return new ResponseEntity<>(this.fineService.getAllFineRecords(), HttpStatus.OK);
    }

//    For second chart
    @GetMapping("/collection-stats")
    public ResponseEntity<FineCollectionStatsDTO> getFineCollectionStats() {
        try {
            FineCollectionStatsDTO stats = fineService.getFineCollectionStats();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//    For 4th chart (monthly fine collection)
    @GetMapping("/monthly-stats")
    public ResponseEntity<List<MonthlyFineStatsDTO>> getMonthlyFineStats(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        try {
            Date sqlStartDate = Date.valueOf(startDate);
            Date sqlEndDate = Date.valueOf(endDate);

            List<MonthlyFineStatsDTO> stats = fineService.getMonthlyFineStats(sqlStartDate, sqlEndDate);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
