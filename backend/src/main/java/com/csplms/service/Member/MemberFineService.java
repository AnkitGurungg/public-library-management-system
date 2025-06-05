package com.csplms.service.Member;

import com.csplms.dto.responseDto.FinesDto;
import com.csplms.dto.responseDto.FinesInfo;
import com.csplms.entity.User;
import com.csplms.exception.ResourceListNotFoundException;
import com.csplms.exception.UserNotPresentException;
import com.csplms.repository.UserRepository;
import com.csplms.util.GetAuthUserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberFineService {

    private final GetAuthUserUtil getAuthUserUtil;
    private final UserRepository userRepository;

    @Autowired
    public MemberFineService(GetAuthUserUtil getAuthUserUtil, UserRepository userRepository) {
        this.getAuthUserUtil = getAuthUserUtil;
        this.userRepository = userRepository;
    }

    public List<FinesDto> getMemberFines() {
        String email = getAuthUserUtil.getAuthUser();
        Optional<User> user = userRepository.findUserByEmail(email);
        if (user.isEmpty()) {
            throw new UserNotPresentException("User not found");
        }

        List<FinesInfo> rawFines = userRepository.finesInfo(Long.valueOf(user.get().getUserId()));
        if (rawFines.isEmpty()) {
            throw new ResourceListNotFoundException("Fines");
        }
        List<FinesDto> results = rawFines.stream()
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
        return results;
    }
}
