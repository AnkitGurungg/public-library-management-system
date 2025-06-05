package com.csplms.service.LibrarianAdmin;

import org.slf4j.Logger;
import com.csplms.entity.Book;
import com.csplms.exception.*;
import com.csplms.entity.User;
import com.csplms.repository.*;
import com.csplms.entity.Shelf;
import org.slf4j.LoggerFactory;
import com.csplms.util.EmailUtil;
import com.csplms.entity.Category;
import com.csplms.mapper.BookMapper;
import com.csplms.helper.BookHelper;
import com.csplms.util.GlobalDateUtil;
import com.csplms.util.GetAuthUserUtil;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.mail.MailException;
import org.springframework.http.ResponseEntity;
import com.csplms.dto.requestDto.BookRequestDto;
import com.csplms.dto.responseDto.BookResponseDto;
import com.csplms.dto.responseDto.CategoryCountDTO;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.nio.file.Path;
import java.nio.file.Files;
import java.io.IOException;

@Transactional
@Service
public class BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final BookHelper bookHelper;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final EmailUtil emailUtil;
    private final GetAuthUserUtil getAuthUserUtil;
    private final GlobalDateUtil globalDateUtil;
    private static final Logger logger = LoggerFactory.getLogger(BookService.class);

    private final String ROOT_DIR_STRING = System.getProperty("user.dir");
    private final ShelfRepository shelfRepository;
    private final BorrowRepository borrowRepository;

    @Autowired
    public BookService(BookRepository bookRepository, BookMapper bookMapper, BookHelper bookHelper, CategoryRepository categoryRepository, EmailUtil emailUtil, UserRepository userRepository, ShelfRepository shelfRepository, BorrowRepository borrowRepository, GetAuthUserUtil getAuthUserUtil, GlobalDateUtil globalDateUtil) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
        this.bookHelper = bookHelper;
        this.categoryRepository = categoryRepository;
        this.emailUtil = emailUtil;
        this.userRepository = userRepository;
        this.shelfRepository = shelfRepository;
        this.borrowRepository = borrowRepository;
        this.getAuthUserUtil = getAuthUserUtil;
        this.globalDateUtil = globalDateUtil;
    }

    public List<Book> getAllBooks(){
        List<Book> bookList = this.bookRepository.getAllBooks();
        if(bookList.isEmpty()){
            throw new ResourceListNotFoundException("Books");
        }
        return bookList;
    }

    @Transactional(rollbackFor = {MessagingException.class, MailException.class, MailFailedException.class, Exception.class})
    public ResponseEntity<BookResponseDto> addBook(
            BookRequestDto bookDto,
            MultipartFile bookImage
    ) throws IOException, MessagingException, MailFailedException {
        try {
//            Get the staff email
            String currentUser = getAuthUserUtil.getAuthUser();

//            Get the staff full object
            User user = userRepository.findUserByEmail(currentUser).orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", 0));

            // Save image
            String imagePath = saveImage(bookImage);

            // Save the Book to database
            Book book = bookMapper.toBook(bookDto, imagePath, user);
            Book savedBook = bookRepository.save(book);
            bookRepository.flush();

            List<User> users = userRepository.userToNotify();
            if (!users.isEmpty()) {
//            transform list of users mail to an array
                String[] emails = users.stream()
                        .map(User::getEmail)
                        .toArray(String[]::new);

//            send to mail to every user
                emailUtil.newBookMail(savedBook, emails);
            }
            return new ResponseEntity<>(bookMapper.toBookResponseDto(savedBook), HttpStatus.CREATED);
        } catch (Exception ex) {
            if (ex instanceof DataIntegrityViolationException dive
                    && dive.getCause().toString().contains("uk_title")) {
                throw new UniqueKeyViolationException("Title already used: "+ bookDto.title());
            }
            throw ex;
        }
    }

    public String saveImage(
        MultipartFile bookImage
    ) throws IOException {
        try {
            Path imagePath = Path.of(ROOT_DIR_STRING, "uploads", bookImage.getOriginalFilename());
            Files.write(imagePath, bookImage.getBytes());
            Path path = Path.of("uploads", bookImage.getOriginalFilename());

            return path.toString();
        }
        catch (Exception e) {
            return e.getMessage();
        }
    }

    public Book getBook(int bookId) {
        Book book = this.bookRepository.findById(bookId).orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id", bookId));
        if (!book.isAvailable()){
            throw new ResourceEntityNotFoundException("Book", "Id", bookId);
        }
        return book;
    }

    public String getBookAddedUser(int bookId) {
        Book book = this.bookRepository.findById(bookId).orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id", bookId));
        User user = book.getAddedBy();
        String name = (user != null) ? user.getName() : null;
        logger.info("Book added by: {}", name);
        return name;
    }

    @Transactional
    public Integer deleteBook(int bookId) {
        Book book = this.bookRepository.findById(bookId).orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id", bookId));
        Shelf shelf = this.shelfRepository.findById(book.getShelf().getShelfId()).orElseThrow(() -> new ResourceEntityNotFoundException("Shelf", "Id", book.getShelf().getShelfId()));
        shelf.setAvailableCapacity(shelf.getAvailableCapacity() + book.getTotalQuantity());
        shelfRepository.save(shelf);

        book.setAvailable(false);
        book.setTotalQuantity(0);
        book.setAvailableQuantity(0);
        bookRepository.save(book);
        return 1;
    }

    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    public BookResponseDto updateBook(Integer id, BookRequestDto bookRequestDto, MultipartFile bookImage) {
        try {

            // Fetch the book
            Book book = this.bookRepository.findById(id)
                    .orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id", id));

            // Fetch the new category and shelf
            Category category = categoryRepository.findById(bookRequestDto.categoryId())
                    .orElseThrow(() -> new ResourceEntityNotFoundException("Category", "Id", bookRequestDto.categoryId()));
            Shelf newShelf = shelfRepository.findById(bookRequestDto.shelfId())
                    .orElseThrow(() -> new ResourceEntityNotFoundException("Shelf", "Id", bookRequestDto.shelfId()));

            int requestedQuantity = bookRequestDto.quantity();
            int existingBookQuantity = book.getTotalQuantity();
            int existingAvailableQuantity = book.getAvailableQuantity();
            Shelf oldShelf = book.getShelf(); // Current shelf of the book

            if (oldShelf.getShelfId().equals(newShelf.getShelfId())) {
                // If same shelf, adjust capacity based on quantity change
                int shelfAvailableCapacity = newShelf.getAvailableCapacity();

                // Check if requested quantity exceeds shelf capacity
                if (requestedQuantity > shelfAvailableCapacity + existingBookQuantity) {
                    throw new ResourceAlreadyExistsException("Insufficient shelf capacity. Try selecting another");
                }

                if (requestedQuantity > existingBookQuantity) {
                    // Increase book quantity, decrease shelf capacity
                    int quantityDifference = requestedQuantity - existingBookQuantity;
                    book.setTotalQuantity(requestedQuantity);
                    book.setAvailableQuantity(existingAvailableQuantity + quantityDifference);
                    newShelf.setAvailableCapacity(shelfAvailableCapacity - quantityDifference);
                    logger.info("Same shelf: Increasing quantity by {}, available quantity by {}", quantityDifference, quantityDifference);

                } else if (requestedQuantity < existingBookQuantity) {
                    int countBorrowedBooks = borrowRepository.countUnreturnedBooksByBookId(book.getBookId());
                    logger.error("borrowed books is: {}", countBorrowedBooks);

                    // Check if the number of books greater than requested quantity has been already borrowed.
                    if(requestedQuantity < countBorrowedBooks) {
                        throw new ResourceAlreadyExistsException("Cannot reduce the quantity at moment, as more books have already been borrowed than the requested quantity");
                    }

                    // Decrease book quantity, increase shelf capacity
                    int quantityDifference = existingBookQuantity - requestedQuantity;
                    int newAvailableQuantity = Math.max(0, existingAvailableQuantity - quantityDifference); // ((existingAvailableQuantity + bb count) - quantityDifference)
                    int testAvailable = existingAvailableQuantity - quantityDifference;

                    logger.error("newAvailableQuantity is: {}", newAvailableQuantity);
                    logger.error("testAvailable is: {}", testAvailable);

                    book.setTotalQuantity(requestedQuantity);
                    book.setAvailableQuantity(newAvailableQuantity);
                    newShelf.setAvailableCapacity(shelfAvailableCapacity + quantityDifference);
                    logger.info("Same shelf: Decreasing quantity by {}, available quantity to {}", quantityDifference, newAvailableQuantity);
                }
            } else {
                // Different shelf: Adjust capacities of both old and new shelves
                int oldShelfAvailableCapacity = oldShelf.getAvailableCapacity();
                int newShelfAvailableCapacity = newShelf.getAvailableCapacity();

                // Check if new shelf has enough capacity for the requested quantity
                if (requestedQuantity > newShelfAvailableCapacity) {
                    throw new ResourceAlreadyExistsException("Insufficient capacity in new shelf. Try selecting another");
                }

                // Return capacity to old shelf (book is being removed)
                oldShelf.setAvailableCapacity(oldShelfAvailableCapacity + existingBookQuantity);
                // Reduce capacity from new shelf (book is being added)
                newShelf.setAvailableCapacity(newShelfAvailableCapacity - requestedQuantity);

                book.setTotalQuantity(requestedQuantity);
                book.setAvailableQuantity(requestedQuantity); // Set available quantity to total quantity for new shelf
                book.setShelf(newShelf);

                // Save old shelf if it was modified
                shelfRepository.save(oldShelf);
                logger.info("Different shelf: Moved book from shelf {} to shelf {}. Old shelf capacity increased by {}, new shelf capacity decreased by {}, available quantity set to {}",
                        oldShelf.getShelfId(), newShelf.getShelfId(), existingBookQuantity, requestedQuantity, requestedQuantity);
            }

            // Save new shelf and book
            shelfRepository.save(newShelf);
            bookRepository.save(book);
            shelfRepository.flush();
            bookRepository.flush();

            // Validate shelf capacities
            if (newShelf.getAvailableCapacity() > newShelf.getTotalCapacity()) {
                logger.error("Validation: newShelf.getAvailableCapacity(): {}, newShelf.getTotalCapacity(): {}",
                        newShelf.getAvailableCapacity(), newShelf.getTotalCapacity());
                throw new UpdateBookException("Available capacity cannot exceed total capacity in new shelf");
            }
            if (newShelf.getAvailableCapacity() < 0) {
                throw new UpdateBookException("New shelf available capacity cannot be negative");
            }
            if (oldShelf.getShelfId().equals(newShelf.getShelfId()) && oldShelf.getAvailableCapacity() > oldShelf.getTotalCapacity()) {
                logger.error("Validation: oldShelf.getAvailableCapacity(): {}, oldShelf.getTotalCapacity(): {}",
                        oldShelf.getAvailableCapacity(), oldShelf.getTotalCapacity());
                throw new UpdateBookException("Available capacity cannot exceed total capacity in old shelf");
            }
            if (oldShelf.getShelfId().equals(newShelf.getShelfId()) && oldShelf.getAvailableCapacity() < 0) {
                throw new UpdateBookException("Old shelf available capacity cannot be negative");
            }

            // Validate book quantities
            if (book.getAvailableQuantity() > book.getTotalQuantity()) {
                logger.error("Validation: book.getAvailableQuantity(): {}, book.getTotalQuantity(): {}",
                        book.getAvailableQuantity(), book.getTotalQuantity());
                throw new UpdateBookException("Available book quantity cannot exceed total quantity");
            }
            if (book.getAvailableQuantity() < 0) {
                throw new UpdateBookException("Available book quantity cannot be negative");
            }

//            Get updated image path
            String updatedBookImageURL = bookHelper.updateBookImage(bookImage);

            if (updatedBookImageURL != null) {
                book.setImageURL(updatedBookImageURL);
            }

            // Update book details
            book.setIsbn(bookRequestDto.isbn());
            book.setTitle(bookRequestDto.title());
            book.setAuthor(bookRequestDto.author());
            book.setLanguage(bookRequestDto.language());
            book.setEdition(bookRequestDto.edition());
            book.setPageCount(bookRequestDto.pageCount());
            book.setPublishedDate(bookRequestDto.publishedDate());
            book.setPrice(bookRequestDto.price());
            book.setDescription(bookRequestDto.description());
            book.setCategory(category);
            book.setShelf(newShelf);

            // Final save
            book = bookRepository.save(book);
            bookRepository.flush();

            return bookMapper.toBookResponseDto(book);
        } catch (Exception ex) {
            if (ex instanceof DataIntegrityViolationException dive
                    && dive.getCause().toString().contains("uk_title")) {
                throw new UniqueKeyViolationException("Title already used: " + bookRequestDto.title());
            }
            throw ex;
        }
    }

    public BookResponseDto restoreBook(Integer id) {
        Book book = this.bookRepository.findById(id).orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id", id));
        book.setAvailable(true);
        book = bookRepository.save(book);
        bookRepository.flush();

        return bookMapper.toBookResponseDto(book);
    }

    public List<CategoryCountDTO> getTopCategoriesForPieChart() {
        List<CategoryCountDTO> allCategories = bookRepository.findCategoriesWithBookCount();

        // If we have 4 or fewer categories, return them all
        if (allCategories.size() <= 4) {
            return allCategories;
        }

        // Get top 4 categories
        List<CategoryCountDTO> topCategories = allCategories.subList(0, 4);

        // Calculate sum of books in other categories
        long otherBooksCount = 0;
        for (int i = 4; i < allCategories.size(); i++) {
            otherBooksCount += allCategories.get(i).getBookCount();
        }

        // Add "Others" category
        if (otherBooksCount > 0) {
            topCategories.add(new CategoryCountDTO("Others", otherBooksCount));
        }

        return topCategories;
    }

}