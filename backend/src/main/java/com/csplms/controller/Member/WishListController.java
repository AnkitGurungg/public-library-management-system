package com.csplms.controller.Member;

import com.csplms.dto.requestDto.WishListRequestDto;
import com.csplms.dto.responseDto.WishListDto;
import com.csplms.entity.WishList;
import com.csplms.service.Member.WishListService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/m/wishlists")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class WishListController {

    private final WishListService wishListService;

    @Autowired
    public WishListController(WishListService wishListService) {
        this.wishListService = wishListService;
    }

    @PostMapping
    public ResponseEntity<WishList> addToWishList(@RequestBody WishListRequestDto wishListRequestDto, HttpServletRequest request) {
        return new ResponseEntity<>(this.wishListService.addToWishList(wishListRequestDto, request.getHeader("Authorization")), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<WishListDto>> getMemberWishList() {
        return new ResponseEntity<>(this.wishListService.getMemberWishList(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> getMemberWishList(@PathVariable("id") Long wishListId) {
        return new ResponseEntity<>(this.wishListService.deleteFromWishList(wishListId), HttpStatus.OK);
    }

}
