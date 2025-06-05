package com.csplms.mapper;

import com.csplms.dto.requestDto.BorrowRequestDto;
import com.csplms.dto.responseDto.BorrowResponseDto;
import com.csplms.entity.Book;
import com.csplms.entity.Borrow;
import com.csplms.entity.User;
import com.csplms.exception.ResourceEntityNotFoundException;
import com.csplms.repository.BookRepository;
import com.csplms.repository.UserRepository;
import com.csplms.util.GlobalDateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BorrowMapper {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final GlobalDateUtil globalDateUtil;

    @Autowired
    public BorrowMapper(BookRepository bookRepository, UserRepository userRepository, GlobalDateUtil globalDateUtil) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.globalDateUtil = globalDateUtil;
    }

    public Borrow toBorrow(BorrowRequestDto borrowRequestDto) {
        Book book = bookRepository.findById(borrowRequestDto.bookId()).orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id", borrowRequestDto.bookId()));
        User user = userRepository.findById(borrowRequestDto.userId()).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", borrowRequestDto.userId()));

        return new Borrow(
                book,
                user,
                false,
                2,
                globalDateUtil.getCurrentDate(),
                borrowRequestDto.dueDate(),
                false
        );
    }

    public BorrowResponseDto toBorrowResponseDto(Borrow borrow) {
        return new BorrowResponseDto(
                borrow.getBorrowId(),
                borrow.getBorrowBooks().getBookId(),
                borrow.getBorrowUsers().getUserId(),
                borrow.isReturnStatus(),
                borrow.getBorrowLimit(),
                borrow.getBorrowDate(),
                borrow.getDueDate(),
                borrow.isExtended()
        );
    }

}
