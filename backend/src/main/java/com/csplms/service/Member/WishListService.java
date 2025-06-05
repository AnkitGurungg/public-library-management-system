package com.csplms.service.Member;

import com.csplms.dto.requestDto.WishListRequestDto;
import com.csplms.entity.Book;
import com.csplms.entity.User;
import com.csplms.entity.WishList;
import com.csplms.exception.ResourceEntityNotFoundException;
import com.csplms.exception.UserNotPresentException;
import com.csplms.mapper.WishListMapper;
import com.csplms.repository.BookRepository;
import com.csplms.repository.UserRepository;
import com.csplms.repository.WishListRepository;
import com.csplms.security.JwtService;
import com.csplms.util.GetAuthUserUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Comparator;
import java.util.List;

@Service
public class WishListService {

    private final JwtService jwtService;
    private final WishListRepository wishListRepository;
    private final UserRepository userRepository;
    private final WishListMapper wishListMapper;
    private final GetAuthUserUtil getAuthUserUtil;
    private final BookRepository bookRepository;

    @Autowired
    public WishListService(JwtService jwtService, WishListRepository wishListRepository, UserRepository userRepository, WishListMapper wishListMapper, GetAuthUserUtil getAuthUserUtil, BookRepository bookRepository) {
        this.wishListRepository = wishListRepository;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.wishListMapper = wishListMapper;
        this.getAuthUserUtil = getAuthUserUtil;
        this.bookRepository = bookRepository;
    }

    public WishList addToWishList(WishListRequestDto wishListRequestDto, String jwtToken) {
        String email = getAuthUserUtil.getAuthUser();
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new UserNotPresentException("User Not Found"));
        Book book = bookRepository.findById(wishListRequestDto.bookId()).orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id: ", wishListRequestDto.bookId()));
        WishList wishList = wishListMapper.toWishList(user, book);
        return  wishListRepository.save(wishList);
    }

    public User getMemberWishList() {
        String email = getAuthUserUtil.getAuthUser();
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new UserNotPresentException("User Not Found"));

//        Sort by addedDate desc then wishListId desc
        if (user.getUserWishLists() != null) {
            user.getUserWishLists().sort(
                    Comparator.comparing(WishList::getAddedDate, Comparator.nullsLast(Date::compareTo)).reversed()
                            .thenComparing(WishList::getWishListId, Comparator.nullsLast(Comparator.reverseOrder()))
            );
        }
        return user;
    }

    public Integer deleteFromWishList(Long wishListId) {
        wishListRepository.deleteById(wishListId);
        return 1;
    }

}
