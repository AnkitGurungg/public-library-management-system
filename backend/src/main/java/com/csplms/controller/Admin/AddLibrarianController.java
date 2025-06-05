package com.csplms.controller.Admin;

import com.csplms.dto.requestDto.KYCFillUpDto;
import com.csplms.entity.User;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import com.csplms.exception.MailFailedException;
import com.csplms.service.Admin.AddLibrarianService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/a/user")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AddLibrarianController {

    private final AddLibrarianService addLibrarianService;

    @Autowired
    public AddLibrarianController(AddLibrarianService addLibrarianService) {
        this.addLibrarianService = addLibrarianService;
    }

    @PostMapping("/add/librarian")
    public ResponseEntity<User> addLibrarianUser(
            @RequestPart KYCFillUpDto kycFillUpDto,
            @RequestPart MultipartFile userImage,
            @RequestPart MultipartFile[] evidenceImages) throws MessagingException, MailFailedException {
        return new ResponseEntity<>(addLibrarianService.addLibrarianUser(kycFillUpDto, userImage, evidenceImages), HttpStatus.CREATED);
    }

}
