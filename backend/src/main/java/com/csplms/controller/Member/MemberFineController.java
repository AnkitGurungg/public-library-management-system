package com.csplms.controller.Member;

import com.csplms.dto.responseDto.MemberFineDto;
import com.csplms.service.Member.MemberFineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/mla/user")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class MemberFineController {

    private final MemberFineService memberFineService;

    @Autowired
    public MemberFineController(MemberFineService memberFineService) {
        this.memberFineService = memberFineService;
    }

    @GetMapping("/fines")
    public ResponseEntity<Page<MemberFineDto>> getMemberFines(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "11") int size,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) Boolean extended,
            @RequestParam(required = false) Boolean paid
    ) {
        return new ResponseEntity<>(
                this.memberFineService.getMemberFines(page, size, title, categoryId, extended, paid),
                HttpStatus.OK
        );
    }

}
