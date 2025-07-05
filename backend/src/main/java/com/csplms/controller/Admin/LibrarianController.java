package com.csplms.controller.Admin;

import com.csplms.dto.requestDto.KYCFillUpDto;
import com.csplms.dto.responseDto.AdminUserDto;
import com.csplms.dto.responseDto.UserDto;
import com.csplms.entity.User;
import com.csplms.exception.MailFailedException;
import com.csplms.service.Admin.LibrarianService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/a/librarians")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class LibrarianController {

    private final LibrarianService librarianService;

    @Autowired
    public LibrarianController(LibrarianService librarianService){
        this.librarianService = librarianService;
    }

    @PostMapping
    public ResponseEntity<User> addLibrarianUser(
            @RequestPart KYCFillUpDto kycFillUpDto,
            @RequestPart MultipartFile userImage,
            @RequestPart MultipartFile[] evidenceImages) throws MessagingException, MailFailedException {
        return new ResponseEntity<>(
                librarianService.addLibrarianUser(kycFillUpDto, userImage, evidenceImages),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<AdminUserDto>> getAllLibrarians() {
        return new ResponseEntity<>(librarianService.getAllLibrarians(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getLibrarian(@PathVariable("id") int librarianId) {
        return new ResponseEntity<>(this.librarianService.getLibrarian(librarianId), HttpStatus.OK);
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<Integer> restoreLibrarian(@PathVariable("id") Integer userId) {
        return new ResponseEntity<>(this.librarianService.restoreMember(userId), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteLibrarian(@PathVariable("id") Integer userId) {
        return new ResponseEntity<>(this.librarianService.deleteLibrarian(userId), HttpStatus.OK);
    }

}
