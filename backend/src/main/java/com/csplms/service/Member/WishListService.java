package com.csplms.service.Member;

import com.csplms.dto.responseDto.CategoryMinDTO;
import com.csplms.entity.*;
import com.csplms.dto.responseDto.WishListDto;
import com.csplms.exception.ResourceEntityNotFoundException;
import com.csplms.exception.UserNotPresentException;
import com.csplms.mapper.WishListMapper;
import com.csplms.repository.BookRepository;
import com.csplms.repository.CategoryRepository;
import com.csplms.repository.UserRepository;
import com.csplms.repository.WishListRepository;
import com.csplms.security.JwtService;
import com.csplms.util.GetAuthUserUtil;
import com.csplms.dto.requestDto.WishListRequestDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class WishListService {

    private final WishListRepository wishListRepository;
    private final UserRepository userRepository;
    private final WishListMapper wishListMapper;
    private final GetAuthUserUtil getAuthUserUtil;
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;

    private static final Logger logger = LoggerFactory.getLogger(WishListService.class);

    @Autowired
    public WishListService(WishListRepository wishListRepository, UserRepository userRepository, WishListMapper wishListMapper, GetAuthUserUtil getAuthUserUtil, BookRepository bookRepository, CategoryRepository categoryRepository) {
        this.wishListRepository = wishListRepository;
        this.userRepository = userRepository;
        this.wishListMapper = wishListMapper;
        this.getAuthUserUtil = getAuthUserUtil;
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
    }

    public WishList addToWishList(WishListRequestDto wishListRequestDto) {
        String email = getAuthUserUtil.getAuthUser();
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new UserNotPresentException("User Not Found"));
        Book book = bookRepository.findById(wishListRequestDto.bookId()).orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id: ", wishListRequestDto.bookId()));
        WishList wishList = wishListMapper.toWishList(user, book);
        return wishListRepository.save(wishList);
    }

    public Page<WishListDto> getMemberWishList(int page, int size, String title, Integer categoryId, String language, Boolean inStock) {

        logger.info("MemberWishList Get Arguments: {}, {}, {}, {}, {}, {}", page, size, title, categoryId, language, inStock);
        String email = getAuthUserUtil.getAuthUser();
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new UserNotPresentException("User Not Found"));

        Pageable pg = PageRequest.of(page, size);
        Page<WishList> wishLists = wishListRepository.findByUserId(pg, user.getUserId(), title, categoryId, language, inStock);

        return wishLists.map(
                wishList -> {
                    Book book = wishList.getBook();
                    Category bCategory = book.getCategory();
                    Shelf shelf = book.getShelf();

                    return new WishListDto(
                            wishList.getWishListId(),

                            book.getBookId(),
                            book.getIsbn(),
                            book.getTitle(),
                            book.getAuthor(),
                            book.getLanguage(),
                            book.getPublishedDate(),
                            book.getAvailableQuantity(),
                            book.getImageURL(),

                            bCategory.getCategoryId(),
                            bCategory.getName(),

                            shelf.getShelfId(),
                            shelf.getName()
                    );
                }
        );
    }

    public List<Integer> getMemberWishListIds() {
        String email = getAuthUserUtil.getAuthUser();
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new UserNotPresentException("User Not Found"));

        List<WishList> userWishList = user.getUserWishLists();
        List<Integer> wishListIds = new ArrayList<>();

        if (userWishList != null) {
            for (WishList item : userWishList) {
                wishListIds.add(item.getBook().getBookId());
            }
        }

        return wishListIds;
    }

    public Map<String, Object> getWishlistFilters() {
        String email = getAuthUserUtil.getAuthUser();
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new UserNotPresentException("User Not Found"));

        // Unique categories
        List<Category> categories = categoryRepository.findDistinctByWishlistUser(user.getUserId());
        List<CategoryMinDTO> categoryMin = categories.stream()
                .map(c -> new CategoryMinDTO(
                        c.getCategoryId(),
                        c.getName()
                ))
                .collect(Collectors.toList());

        // Unique languages
        List<String> languages = bookRepository.findDistinctLanguagesByWishlistUser(user.getUserId());

        Map<String, Object> filters = new HashMap<>();
        filters.put("categories", categoryMin);
        filters.put("languages", languages);

        return filters;
    }

    public Integer deleteFromWishList(Long wishListId) {
        wishListRepository.deleteById(wishListId);
        return 1;
    }

}
