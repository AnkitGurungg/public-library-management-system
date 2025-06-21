package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.responseDto.AdminBorrowDto;
import com.csplms.dto.responseDto.reports.OverdueStatsDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.csplms.entity.Book;
import com.csplms.entity.User;
import com.csplms.entity.Borrow;
import com.csplms.util.EmailUtil;
import com.csplms.mapper.BorrowMapper;
import com.csplms.util.GlobalDateUtil;
import com.csplms.helper.BorrowHelper;
import jakarta.mail.MessagingException;
import com.csplms.dto.responseDto.FinesDto;
import com.csplms.dto.responseDto.FinesInfo;
import com.csplms.repository.BookRepository;
import com.csplms.repository.UserRepository;
import com.csplms.repository.BorrowRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.csplms.exception.MailFailedException;
import com.csplms.dto.requestDto.BorrowRequestDto;
import com.csplms.dto.requestDto.ExtendDueDateDto;
import com.csplms.dto.responseDto.BorrowResponseDto;
import com.csplms.exception.ResourceListNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import com.csplms.exception.ResourceAlreadyExistsException;
import com.csplms.exception.ResourceEntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BorrowService {

    private final EmailUtil emailUtil;

    @Value("${extend.due.date}")
    private long extendDays;

    private final GlobalDateUtil globalDateUtil;
    private final BookRepository bookRepository;
    private final BorrowMapper borrowMapper;
    private final BorrowRepository borrowRepository;
    private final UserRepository userRepository;
    private final BorrowHelper borrowHelper;

    private static final Logger logger = LoggerFactory.getLogger(BorrowService.class);

    @Autowired
    public BorrowService(BorrowMapper borrowMapper, BorrowRepository borrowRepository, BookRepository bookRepository, UserRepository userRepository, BorrowHelper borrowHelper, GlobalDateUtil globalDateUtil, EmailUtil emailUtil) {
        this.borrowMapper = borrowMapper;
        this.borrowRepository = borrowRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.borrowHelper = borrowHelper;
        this.globalDateUtil = globalDateUtil;
        this.emailUtil = emailUtil;
    }

    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    public BorrowResponseDto borrow(BorrowRequestDto borrowRequestDto) throws MessagingException, MailFailedException {
        Book book = bookRepository.findById(borrowRequestDto.bookId())
                .orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id", borrowRequestDto.bookId()));
        User user = userRepository.findById(borrowRequestDto.userId())
                .orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", borrowRequestDto.userId()));

//        Check all the conditions if the user is able to borrow Book
        borrowHelper.verifyBorrow(book, user);

//        Check borrow limit
        borrowHelper.checkBorrowLimit(user);

//        Get user Fines
        List<FinesInfo> rawFines = userRepository.finesInfo(Long.valueOf(borrowRequestDto.userId()));
//         Map fines to dto
        List<FinesDto> finesDtoList = borrowHelper.getFinesDtoResult(rawFines);
//        Check if the user has paid fines
        borrowHelper.checkFinePaidStatus(finesDtoList, user);

//        Check available quantity of the Book
        borrowHelper.checkQuantity(book);

//        Save borrow record
        Borrow borrow = borrowMapper.toBorrow(borrowRequestDto);
        System.out.println(borrow);
        borrow = borrowRepository.save(borrow);
        borrowRepository.flush();

//        Decrease the quantity
        book.setAvailableQuantity(book.getAvailableQuantity() - 1);
        bookRepository.save(book);
        bookRepository.flush();

        emailUtil.bookBorrowedMailToMember(user, book, borrow);

        return this.borrowMapper.toBorrowResponseDto(borrow);
    }

    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    public Borrow extend(Integer borrowId, ExtendDueDateDto extendDueDateDto) throws MessagingException, MailFailedException {
        Borrow borrow = this.borrowRepository.findById(borrowId).orElseThrow(() -> new ResourceEntityNotFoundException("Borrow record", "Id", borrowId));
        if (borrow.isExtended()){
            throw new ResourceAlreadyExistsException("Already extended");
        }

        if (globalDateUtil.getCurrentDate().after(borrow.getDueDate())) {
            throw new ResourceAlreadyExistsException("The borrow period has already expired. Extension not allowed");
        }

        Borrow finalBookBorrow = borrow;
        Book book = bookRepository.findById(borrow.getBorrowBooks().getBookId())
                .orElseThrow(() -> new ResourceEntityNotFoundException("Book", "Id", finalBookBorrow.getBorrowBooks().getBookId()));

        Borrow finalUserBorrow = borrow;
        User user = userRepository.findById(borrow.getBorrowUsers().getUserId())
                .orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", finalUserBorrow.getBorrowUsers().getUserId()));

//        build the borrow
        borrow.setDueDate(extendDueDateDto.dueDate());
        borrow.setExtended(true);
        borrow = this.borrowRepository.save(borrow);
        emailUtil.dueDateExtendedMailToMember(user, book, borrow);
        return borrow;
    }

    public BorrowResponseDto getBorrowRecord(Integer borrowId) {
        Borrow borrow = this.borrowRepository.findById(borrowId).orElseThrow(() -> new ResourceEntityNotFoundException("Borrow record", "id", borrowId));
        return this.borrowMapper.toBorrowResponseDto(borrow);
    }

    public Page<AdminBorrowDto> getAllBorrowRecords(int page, int size, String name, Boolean extended, Boolean returnStatus) {

        logger.info("BorrowRecords Get Arguments: {}, {}, {}, {}, {}", page, size, name, extended, returnStatus);
        Pageable pageable = PageRequest.of(page, size);
        Page<Borrow> borrows = this.borrowRepository.getAllBorrowRecords(pageable, name, extended, returnStatus);

        if (borrows.isEmpty()) {
            throw new ResourceListNotFoundException("Borrow records");
        }

        return borrows.map(borrow -> new AdminBorrowDto(
                borrow.getBorrowId(),
                borrow.getBorrowDate(),
                borrow.getDueDate(),
                borrow.isExtended(),
                borrow.isReturnStatus(),

                borrow.getBorrowBooks() != null ? borrow.getBorrowBooks().getBookId() : null,
                borrow.getBorrowBooks() != null ? borrow.getBorrowBooks().getTitle() : null,

                borrow.getBorrowUsers() != null ? borrow.getBorrowUsers().getUserId() : null,
                borrow.getBorrowUsers() != null ? borrow.getBorrowUsers().getName() : null
                )
        );
    }

    public Page<AdminBorrowDto> getAllOverdueBorrowBooks(int page, int size, String name, Boolean extended, Boolean returnStatus) {

        logger.info("OverdueRecords Get Arguments: {}, {}, {}, {}, {}", page, size, name, extended, returnStatus);
        Pageable pageable = PageRequest.of(page, size);
        Page<Borrow> borrows = borrowRepository.getAllOverdueBorrowBooks(pageable, name, extended, returnStatus, globalDateUtil.getCurrentDate());

        if (borrows.isEmpty()) {
            throw new ResourceListNotFoundException("Borrow records");
        }

        return borrows.map(borrow -> new AdminBorrowDto(
                borrow.getBorrowId(),
                borrow.getBorrowDate(),
                borrow.getDueDate(),
                borrow.isExtended(),
                borrow.isReturnStatus(),

                borrow.getBorrowBooks() != null ? borrow.getBorrowBooks().getBookId() : null,
                borrow.getBorrowBooks() != null ? borrow.getBorrowBooks().getTitle() : null,

                borrow.getBorrowUsers() != null ? borrow.getBorrowUsers().getUserId() : null,
                borrow.getBorrowUsers() != null ? borrow.getBorrowUsers().getName() : null
                )
        );
    }

    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    public Integer deleteBorrow(int borrowId) throws MessagingException, MailFailedException {
        Borrow borrow = this.borrowRepository.findById(borrowId)
                .orElseThrow(() -> new ResourceEntityNotFoundException("Borrow record", "Id", borrowId));
        if(borrow.isReturnStatus()){
            throw new ResourceAlreadyExistsException("Book already returned!");
        }
        Book book = bookRepository.findById(borrow.getBorrowBooks().getBookId())
                .orElseThrow(() -> new ResourceEntityNotFoundException("Book", "id", borrow.getBorrowBooks().getBookId()));
        book.setAvailableQuantity(book.getAvailableQuantity() + 1);
        bookRepository.save(book);
        bookRepository.flush();
        borrowRepository.delete(borrow);
        borrowRepository.flush();

        User user = userRepository.findById(borrow.getBorrowUsers().getUserId())
                .orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", borrow.getBorrowUsers().getUserId()));
        emailUtil.borrowDeletedMailToMember(user, book, borrow);

        return 1;
    }

    public OverdueStatsDTO getOverdueStats() {
        Object result = borrowRepository.getOverdueStats();
        Double avgDaysLate = borrowRepository.getAverageDaysLate();

        Object[] resultArray = (Object[]) result;
        return new OverdueStatsDTO(resultArray, avgDaysLate);
    }

}
