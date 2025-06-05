package com.csplms.service.Member;

import com.csplms.dto.responseDto.BookReturnDto;
import com.csplms.dto.responseDto.BookReturnInfo;
import com.csplms.entity.User;
import com.csplms.exception.UserNotPresentException;
import com.csplms.repository.ReturnRepository;
import com.csplms.repository.UserRepository;
import com.csplms.util.GetAuthUserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BorrowedBooksService {

    private final ReturnRepository returnRepository;
    private final UserRepository userRepository;
    private final GetAuthUserUtil getAuthUserUtil;

    @Autowired
    public BorrowedBooksService(ReturnRepository returnRepository, UserRepository userRepository, GetAuthUserUtil getAuthUserUtil) {
        this.returnRepository = returnRepository;
        this.userRepository = userRepository;
        this.getAuthUserUtil = getAuthUserUtil;
    }

    public List<BookReturnDto> getBorrowedBooks() {
        User user = userRepository.findUserByEmail(getAuthUserUtil.getAuthUser()).orElseThrow(() -> new UserNotPresentException("User not found"));
        List<BookReturnInfo> rawResults = returnRepository.findReturnedBooksByUserId(Long.valueOf(user.getUserId()));
        List<BookReturnDto> results = rawResults.stream()
                .map(r -> new BookReturnDto(
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
                        r.getBorrows()
                ))
                .toList();

        return results;
    }
}
