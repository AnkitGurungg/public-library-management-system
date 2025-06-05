package com.csplms.controller.LibrarianAdmin;

import com.csplms.entity.Borrow;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.csplms.exception.MailFailedException;
import org.springframework.web.bind.annotation.*;
import com.csplms.dto.requestDto.BorrowRequestDto;
import com.csplms.dto.requestDto.ExtendDueDateDto;
import com.csplms.dto.responseDto.reports.OverdueStatsDTO;
import com.csplms.dto.responseDto.BorrowResponseDto;
import com.csplms.service.LibrarianAdmin.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/la/borrow")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class BorrowController {

    private final BorrowService borrowService;

    @Autowired
    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    @PostMapping("/add")
    public ResponseEntity<BorrowResponseDto> borrow(@RequestBody BorrowRequestDto borrowRequestDto) throws MessagingException, MailFailedException {
        return new ResponseEntity<>(this.borrowService.borrow(borrowRequestDto), HttpStatus.CREATED);
    }

    @PostMapping("/extend/{id}")
    public ResponseEntity<Borrow> extend(@PathVariable("id") Integer borrowId, @RequestBody ExtendDueDateDto extendDueDateDto) throws MessagingException, MailFailedException {
        return new ResponseEntity<>(this.borrowService.extend(borrowId, extendDueDateDto), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<BorrowResponseDto> getBorrowRecord(@PathVariable("id") Integer borrowId) {
        return new ResponseEntity<>(this.borrowService.getBorrowRecord(borrowId), HttpStatus.OK);
    }

    @GetMapping("/get/borrows")
    public ResponseEntity<List<Borrow>> getAllBorrowRecords() {
        return new ResponseEntity<>(this.borrowService.getAllBorrowRecords(), HttpStatus.OK);
    }

    @GetMapping("/get/overdue")
    public ResponseEntity<List<Borrow>> getAllOverdueBooks() {
        return new ResponseEntity<>(this.borrowService.getAllOverdueBooks(), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> deleteBorrow(@PathVariable("id") int borrowId) throws MessagingException, MailFailedException {
        return new ResponseEntity<>(this.borrowService.deleteBorrow(borrowId), HttpStatus.OK);
    }

//    For 3rd chart (overdue statistics)
    @GetMapping("/overdue-stats")
    public ResponseEntity<OverdueStatsDTO> getOverdueStats() {
        try {
            OverdueStatsDTO stats = borrowService.getOverdueStats();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
