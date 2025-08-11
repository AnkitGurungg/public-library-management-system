package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.requestDto.BookRequestDto;
import com.csplms.dto.responseDto.AdminBooksDto;
import com.csplms.dto.responseDto.BookDto;
import com.csplms.dto.responseDto.BookResponseDto;
import com.csplms.dto.responseDto.CategoryCountDTO;
import com.csplms.entity.Book;
import com.csplms.exception.MailFailedException;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BookService {
    List<AdminBooksDto> getAllBooks();

    @Transactional(rollbackFor = {MessagingException.class, MailException.class, MailFailedException.class, Exception.class})
    ResponseEntity<BookResponseDto> addBook(
            BookRequestDto bookDto,
            MultipartFile bookImage
    ) throws IOException, MessagingException, MailFailedException;

    String saveImageInS3(Book book, MultipartFile bookImage) throws IOException;

    BookDto getBook(int bookId);

    String getBookAddedUser(int bookId);

    @Transactional
    Integer deleteBook(int bookId);

    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    BookResponseDto updateBook(Integer id, BookRequestDto bookRequestDto, MultipartFile bookImage);

    BookResponseDto restoreBook(Integer id);

    List<CategoryCountDTO> getTopCategoriesForPieChart();
}
