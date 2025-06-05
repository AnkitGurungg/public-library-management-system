package com.csplms.mapper;

import com.csplms.entity.Book;
import com.csplms.entity.User;
import com.csplms.entity.WishList;
import com.csplms.util.GlobalDateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WishListMapper {

    private final GlobalDateUtil globalDateUtil;

    @Autowired
    public WishListMapper(GlobalDateUtil globalDateUtil) {
        this.globalDateUtil = globalDateUtil;
    }

    public WishList toWishList(User user, Book book) {
        return new WishList(
                user,
                book,
                globalDateUtil.getCurrentDate()
        );
    }
}
