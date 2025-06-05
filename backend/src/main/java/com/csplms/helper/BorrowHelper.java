package com.csplms.helper;

import org.slf4j.Logger;
import com.csplms.entity.Book;
import com.csplms.entity.User;
import org.slf4j.LoggerFactory;
import com.csplms.entity.Borrow;
import com.csplms.dto.responseDto.FinesDto;
import com.csplms.dto.responseDto.FinesInfo;
import com.csplms.repository.BorrowRepository;
import org.springframework.stereotype.Component;
import com.csplms.exception.InvalidBorrowException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Component
public class BorrowHelper {

    private static final Logger logger = LoggerFactory.getLogger(BorrowHelper.class);
    private final BorrowRepository borrowRepository;

    @Autowired
    public BorrowHelper(BorrowRepository borrowRepository) {
        this.borrowRepository = borrowRepository;
    }

    public boolean verifyBorrow(Book book, User user) {
//        Check if the Book exist
        if(!book.isAvailable()){
            throw new InvalidBorrowException("Book has been deleted.");
        }

//        Check if the user exist
        if(!user.isPresent()){
            throw new InvalidBorrowException("User has been deleted.");
        }

        if(!user.isActive()){
            throw new InvalidBorrowException("User has not verified email.");
        }

//        Check if the user is verified
        if(!user.isVerified()){
            throw new InvalidBorrowException("User is not verified.");
        }
        return true;
    }

    public boolean checkQuantity(Book book) {
        if(book.getAvailableQuantity() <= 0){
            throw new InvalidBorrowException("Book is out of stock.");
        }
        return true;
    }

    public boolean checkBorrowLimit(User user) {
        List<Borrow> userBorrows = borrowRepository.userBorrows(user.getUserId());
        if(userBorrows.size() >= 2){
            throw new InvalidBorrowException("User exceeds borrow limit.");
        }
        return true;
    }

    public List<FinesDto> getFinesDtoResult(List<FinesInfo> rawFines){
        List<FinesDto> finesDtoList = rawFines.stream()
                .map(r -> new FinesDto(
                        r.getBookId(),
                        r.getTitle(),
                        r.getAuthor(),
                        r.getLanguage(),
                        r.getEdition(),
                        r.getPageCount(),
                        r.getTotalQuantity(),
                        r.getPublishedDate(),
                        r.getPrice(),
                        r.getImageURL(),
                        r.getDescription(),
                        r.getCategoryId(),
                        r.getCategoryName(),
                        r.getCategory(),

                        r.getBorrowId(),
                        r.getBorrowBooks(),
                        r.getBorrowUsers(),
                        r.isReturnStatus(),
                        r.getBorrowDate(),
                        r.getDueDate(),
                        r.isExtended(),

                        r.getReturnId(),
                        r.getReturnDate(),
                        r.getBorrows(),

                        r.getFineId(),
                        r.getTotalFine(),
                        r.isPaidStatus(),
                        r.getReturns(),
                        r.getPayment(),

                        r.getPaymentId(),
                        r.getAmount(),
                        r.getDate()
                ))
                .toList();
        return finesDtoList;
    }

    public boolean checkFinePaidStatus(List<FinesDto> results, User user) {
        for (FinesDto finesDto : results) {
            if (!finesDto.isPaidStatus()) {
                throw new InvalidBorrowException("User has not cleared previous fines");
            }
        }
        return true;
    }
}
