package com.csplms.controller.Member;

import com.csplms.dto.requestDto.WishListRequestDto;
import com.csplms.entity.User;
import com.csplms.entity.WishList;
import com.csplms.service.Member.WishListService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/m/wishlist")
@EnableMethodSecurity(prePostEnabled = true)
@PreAuthorize("hasAnyAuthority('ROLE_MEMBER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN')")
public class WishListController {

    private final WishListService wishListService;

    @Autowired
    public WishListController(WishListService wishListService) {
        this.wishListService = wishListService;
    }

    @PostMapping("/add")
    public ResponseEntity<WishList> addToWishList(@RequestBody WishListRequestDto wishListRequestDto, HttpServletRequest request) {
        return new ResponseEntity<>(this.wishListService.addToWishList(wishListRequestDto, request.getHeader("Authorization")), HttpStatus.CREATED);
    }

    @GetMapping("/get/wishlists")
    public ResponseEntity<User> getMemberWishList() {
        return new ResponseEntity<>(this.wishListService.getMemberWishList(), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> getMemberWishList(@PathVariable("id") Long wishListId) {
        return new ResponseEntity<>(this.wishListService.deleteFromWishList(wishListId), HttpStatus.OK);
    }

}
