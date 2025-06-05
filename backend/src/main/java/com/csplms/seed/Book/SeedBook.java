package com.csplms.seed.Book;

import com.csplms.entity.Book;
import com.csplms.repository.BookRepository;
import com.csplms.util.GlobalDateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class SeedBook implements ApplicationRunner {

    private final BookRepository bookRepository;
    private final SeedBookHelper seedBookHelper;
    private final GlobalDateUtil globalDateUtil;

    @Autowired
    public SeedBook(BookRepository bookRepository, SeedBookHelper seedBookHelper, GlobalDateUtil globalDateUtil) {
        this.bookRepository = bookRepository;
        this.seedBookHelper = seedBookHelper;
        this.globalDateUtil = globalDateUtil;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
//        bookOne();
    }

//    public Book bookOne(){
//        Book book = new Book();
//        book.setTitle("Book One");
//        book.setAuthor("John Doe");
//        book.setAvailable(true);
//        book.setIsbn("234234");
//        book.setDescription("Desc");
//        book.setQuantity(100);
//        book.setLanguage("English");
//        book.setImageURL("9789937003377-6334.png");
//        book.setPageCount(100);
//        book.setPrice(300);
//        book.setPublishedDate(globalDateUtil.getCurrentDate());
//        book.setAddedDate(globalDateUtil.getCurrentDate());
//        book.setUpdatedDate(globalDateUtil.getCurrentDate());
//
//        return bookRepository.save(book);
//    }

}
