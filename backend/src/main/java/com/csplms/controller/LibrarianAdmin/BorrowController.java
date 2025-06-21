package com.csplms.controller.LibrarianAdmin;

import com.csplms.dto.responseDto.AdminBorrowDto;
import com.csplms.entity.Borrow;
import jakarta.mail.MessagingException;
import org.springframework.data.domain.Page;
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
@RequestMapping("/api/v1/la/borrows")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class BorrowController {

    private final BorrowService borrowService;

    @Autowired
    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    @PostMapping
    public ResponseEntity<BorrowResponseDto> borrow(@RequestBody BorrowRequestDto borrowRequestDto) throws MessagingException, MailFailedException {
        return new ResponseEntity<>(this.borrowService.borrow(borrowRequestDto), HttpStatus.CREATED);
    }

    @PostMapping("/extend/{id}")
    public ResponseEntity<Borrow> extend(@PathVariable("id") Integer borrowId, @RequestBody ExtendDueDateDto extendDueDateDto) throws MessagingException, MailFailedException {
        return new ResponseEntity<>(this.borrowService.extend(borrowId, extendDueDateDto), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BorrowResponseDto> getBorrowRecord(@PathVariable("id") Integer borrowId) {
        return new ResponseEntity<>(this.borrowService.getBorrowRecord(borrowId), HttpStatus.OK);
    }

    @GetMapping("/borrowed-books")
    public ResponseEntity<Page<AdminBorrowDto>> getAllBorrowRecords(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Boolean extended,
            @RequestParam(required = false) Boolean returnStatus
    ) {
        return new ResponseEntity<>(
                this.borrowService.getAllBorrowRecords(page, size, name, extended, returnStatus),
                HttpStatus.OK
        );
    }

    @GetMapping("/overdue-books")
    public ResponseEntity<List<AdminBorrowDto>> getAllOverdueBooks() {
        return new ResponseEntity<>(this.borrowService.getAllOverdueBooks(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
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
