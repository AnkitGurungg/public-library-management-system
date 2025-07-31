package com.csplms.service.Member;

import com.csplms.dto.requestDto.WishListRequestDto;
import com.csplms.dto.responseDto.WishListDto;
import com.csplms.entity.WishList;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface WishListService {
    WishList addToWishList(WishListRequestDto wishListRequestDto);

    Page<WishListDto> getMemberWishList(int page, int size, String title, Integer categoryId, String language, Boolean inStock);

    List<Integer> getMemberWishListIds();

    Map<String, Object> getWishlistFilters();

    Integer deleteFromWishList(Long wishListId);
}
