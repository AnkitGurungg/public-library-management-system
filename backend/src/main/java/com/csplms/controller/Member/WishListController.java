package com.csplms.controller.Member;

import com.csplms.dto.requestDto.WishListRequestDto;
import com.csplms.dto.responseDto.WishListDto;
import com.csplms.entity.WishList;
import com.csplms.service.Member.WishListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<WishList> addToWishList(@RequestBody WishListRequestDto wishListRequestDto) {
        return new ResponseEntity<>(this.wishListService.addToWishList(wishListRequestDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<WishListDto>> getMemberWishList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "11") int size,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) Boolean inStock
    ) {
        return new ResponseEntity<>(
                this.wishListService.getMemberWishList(page, size, title, categoryId, language, inStock),
                HttpStatus.OK
        );
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Integer>> getMemberWishListIds() {
        return new ResponseEntity<>(this.wishListService.getMemberWishListIds(), HttpStatus.OK);
    }

    @GetMapping("/filters")
    public ResponseEntity<Map<String, Object>> getWishlistFilters() {
        return new ResponseEntity<>(this.wishListService.getWishlistFilters(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> getMemberWishList(@PathVariable("id") Long wishListId) {
        return new ResponseEntity<>(this.wishListService.deleteFromWishList(wishListId), HttpStatus.OK);
    }

}
