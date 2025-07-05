package com.csplms.service.Member;

import com.csplms.dto.responseDto.BookReturnDto;
import com.csplms.dto.responseDto.CategoryMinDTO;
import com.csplms.entity.Category;
import com.csplms.entity.User;
import com.csplms.exception.UserNotPresentException;
import com.csplms.repository.BookRepository;
import com.csplms.repository.BorrowRepository;
import com.csplms.repository.CategoryRepository;
import com.csplms.repository.UserRepository;
import com.csplms.util.GetAuthUserUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BorrowedBooksService {

    private final BorrowRepository borrowRepository;
    private final UserRepository userRepository;
    private final GetAuthUserUtil getAuthUserUtil;
    private final CategoryRepository categoryRepository;
    private final BookRepository bookRepository;

    private static final Logger logger = LoggerFactory.getLogger(BorrowedBooksService.class);

    @Autowired
    public BorrowedBooksService(BorrowRepository borrowRepository, UserRepository userRepository, GetAuthUserUtil getAuthUserUtil, CategoryRepository categoryRepository, BookRepository bookRepository) {
        this.borrowRepository = borrowRepository;
        this.userRepository = userRepository;
        this.getAuthUserUtil = getAuthUserUtil;
        this.categoryRepository = categoryRepository;
        this.bookRepository = bookRepository;
    }

    public Page<BookReturnDto> getBorrowedBooks(int pageNumber, int pageSize, String title, String language, Integer categoryId, Boolean extended) {

        logger.info("BorrowedBooks Get Arguments: {}, {}, {}, {}, {}, {}", pageNumber, pageSize, title, categoryId, language, extended);
        User user = userRepository.findUserByEmail(getAuthUserUtil.getAuthUser()).orElseThrow(() -> new UserNotPresentException("User not found"));
        Pageable pg = PageRequest.of(pageNumber, pageSize);
        return borrowRepository.findBorrowedBooksByUserId(pg, user.getUserId(), title, language, categoryId, extended);
    }

    public Map<String, Object> getBorrowedBookFilters() {
        User user = userRepository.findUserByEmail(getAuthUserUtil.getAuthUser()).orElseThrow(() -> new UserNotPresentException("User not found"));

        // Unique categories
        List<Category> categories = categoryRepository.findDistinctByBorrowUser(user.getUserId());
        List<CategoryMinDTO> categoryMin = categories.stream()
                .map(c -> new CategoryMinDTO(
                        c.getCategoryId(),
                        c.getName()
                ))
                .toList();

        // Unique languages
        List<String> languages = bookRepository.findDistinctLanguagesByBorrowUser(user.getUserId());

        Map<String, Object> filters = new HashMap<>();
        filters.put("categories", categoryMin);
        filters.put("languages", languages);

        return filters;
    }
}
