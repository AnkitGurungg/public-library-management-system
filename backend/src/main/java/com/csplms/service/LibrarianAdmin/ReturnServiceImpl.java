package com.csplms.service.LibrarianAdmin;

import com.csplms.entity.*;
import com.csplms.exception.MailFailedException;
import com.csplms.exception.ResourceListNotFoundException;
import com.csplms.exception.ResourceEntityNotFoundException;
import com.csplms.helper.ReturnHelper;
import com.csplms.mapper.FineMapper;
import com.csplms.repository.*;
import com.csplms.util.EmailUtil;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReturnServiceImpl implements ReturnService {

    private final BorrowRepository borrowRepository;
    private final ReturnRepository returnRepository;
    private final ReturnHelper returnHelper;
    private final BookRepository bookRepository;
    private final FineService fineService;
    private final FineMapper fineMapper;
    private final FineRepository fineRepository;
    private final EmailUtil emailUtil;
    private final UserRepository userRepository;

    @Autowired
    public ReturnServiceImpl(BorrowRepository borrowRepository, ReturnRepository returnRepository, ReturnHelper returnHelper, BookRepository bookRepository, FineService fineService, FineMapper fineMapper, FineRepository fineRepository, EmailUtil emailUtil, UserRepository userRepository) {
        this.borrowRepository = borrowRepository;
        this.returnRepository = returnRepository;
        this.returnHelper = returnHelper;
        this.bookRepository = bookRepository;
        this.fineService = fineService;
        this.fineMapper = fineMapper;
        this.fineRepository = fineRepository;
        this.emailUtil = emailUtil;
        this.userRepository = userRepository;
    }

    @Transactional(rollbackFor = {MessagingException.class, MailFailedException.class, Exception.class})
    @Override
    public Return returnBook(int borrowId) throws MessagingException, MailFailedException {
        System.out.println("Return the book");
        Borrow borrow = borrowRepository.findById(borrowId).orElseThrow(() -> new ResourceEntityNotFoundException("Borrow record", "id", borrowId));
        Borrow finalUserBorrow = borrow;
        User user = userRepository.findById(borrow.getBorrowUsers().getUserId())
                .orElseThrow(() -> new ResourceEntityNotFoundException("User", "Id", finalUserBorrow.getBorrowUsers().getUserId()));

//        Check if the Book is already returned
        returnHelper.checkReturnStatus(borrow);

        borrow.setReturnStatus(true);
        borrow = borrowRepository.save(borrow);
        borrowRepository.flush();

        // Increase quantity after return
        Book book = bookRepository.save(returnHelper.increaseQuantity(borrow));
        bookRepository.flush();

        // Add on return records
        Return returns = returnRepository.save(returnHelper.buildReturnBook(borrow));
        returnRepository.flush();

//        generate fine if Book is late returned
        if (returns.getReturnDate().after(borrow.getDueDate())){
            long totalAmount = fineService.generateFine(borrow, returns);
            Fine fine = fineRepository.save(fineMapper.toFine(returns, totalAmount));
            fineRepository.flush();
            emailUtil.bookLateReturnedMailToMember(user, book, returns, fine);
        } else {
            emailUtil.bookEarlyReturnedMailToMember(user, book, returns);
        }
        return returns;
    }

    @Override
    public List<Return> getAllReturns() {
        List<Return> returns = returnRepository.findAll();
        if (returns.isEmpty()) {
            throw new ResourceListNotFoundException("Return records");
        }
        return returns;
    }

}
