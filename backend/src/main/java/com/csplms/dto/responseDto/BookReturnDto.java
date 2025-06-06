package com.csplms.dto.responseDto;

import com.csplms.entity.Book;
import com.csplms.entity.Borrow;
import com.csplms.entity.Category;
import com.csplms.entity.User;

import java.sql.Date;

public record BookReturnDto(
        Integer getBookId,
        String getTitle,
        String getAuthor,
        String getLanguage,
        String getEdition,
        int getPageCount,
        int getQuantity,
        Date getPublishedDate,
        float getPrice,
        String getImageURL,
        String getDescription,
        Integer getCategoryId,
        String getCategoryName,
        Category getCategory,

        Integer getBorrowId,
        Book getBorrowBooks,
        User getBorrowUsers,
        boolean isReturnStatus,
        Date getBorrowDate,
        Date getDueDate,
        boolean isExtended,

        Integer getReturnId,
        Date getReturnDate,
        Borrow getBorrows

        ) {

}
