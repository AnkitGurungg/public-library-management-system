package com.csplms.controller.Member;

import com.csplms.dto.responseDto.FinesDto;
import com.csplms.service.Member.MemberFineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/mla/user/profile")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class MemberFineController {

    private final MemberFineService memberFineService;

    @Autowired
    public MemberFineController(MemberFineService memberFineService) {
        this.memberFineService = memberFineService;
    }

    @GetMapping("/fines/get/fines")
    public ResponseEntity<List<FinesDto>> getMemberFines() {
        return new ResponseEntity<>(this.memberFineService.getMemberFines(), HttpStatus.OK);
    }

}
