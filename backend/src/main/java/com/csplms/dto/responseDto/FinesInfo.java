package com.csplms.dto.responseDto;

import com.csplms.entity.*;

import java.sql.Date;

public interface FinesInfo {
//    book
    Integer getBookId();
    String getTitle();
    String getAuthor();
    String getLanguage();
    String getEdition();
    int getPageCount();
    int getAvailableQuantity();
    int getTotalQuantity();
    Date getPublishedDate();
    float getPrice();
    String getImageURL();
    String getDescription();

//    category
    Integer getCategoryId();
    String getCategoryName();
    Category getCategory();

//    borrow records
    Integer getBorrowId();
    Book getBorrowBooks();
    User getBorrowUsers();
    boolean isReturnStatus();
    Date getBorrowDate();
    Date getDueDate();
    boolean isExtended();

//    return records
    Integer getReturnId();
    Date getReturnDate();
    Borrow getBorrows();

//    fines
    Integer getFineId();
    long getTotalFine();
    boolean isPaidStatus();
    Return getReturns();
    Payment getPayment();

//    payment
    Integer getPaymentId();
    Integer getAmount();
    Date getDate();

}
