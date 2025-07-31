package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.responseDto.AdminFineDto;
import com.csplms.dto.responseDto.reports.FineCollectionStatsDTO;
import com.csplms.dto.responseDto.reports.MonthlyFineStatsDTO;
import com.csplms.entity.*;
import com.csplms.exception.ResourceListNotFoundException;
import com.csplms.mapper.FineMapper;
import com.csplms.repository.FineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FineServiceImpl implements FineService {

    @Value("${fine.rate}")
    private String fineRate;

    private final FineMapper fineMapper;
    private final FineRepository fineRepository;
    private static final Logger logger = LoggerFactory.getLogger(FineServiceImpl.class);

    @Autowired
    public FineServiceImpl(FineMapper fineMapper, FineRepository fineRepository) {
        this.fineMapper = fineMapper;
        this.fineRepository = fineRepository;
    }

    @Override
    public long generateFine(Borrow borrow, Return returns) {
        double milliSeconds = returns.getReturnDate().getTime() - borrow.getDueDate().getTime();
        double days = milliSeconds/86400000;

        return Math.round(Integer.parseInt(fineRate)*days);
    }

    @Override
    public List<AdminFineDto> getAllFineRecords() {
        List<Fine> fines = this.fineRepository.findAll();
        if (fines.isEmpty()) {
            throw new ResourceListNotFoundException("Fine records");
        }

        List<AdminFineDto> dtosList = new ArrayList<>();
        for (Fine fine : fines){
            User user = fine.getReturns().getBorrows().getBorrowUsers();
            Book book = fine.getReturns().getBorrows().getBorrowBooks();
            Category category = fine.getReturns().getBorrows().getBorrowBooks().getCategory();
            Borrow borrow = fine.getReturns().getBorrows();
            Return returns = fine.getReturns();

            AdminFineDto item = new AdminFineDto(
                    fine.getFineId(),
                    fine.getTotalFine(),
                    fine.isPaidStatus(),

                    user.getUserId(),
                    user.getName(),

                    book.getBookId(),
                    book.getTitle(),

                    category.getCategoryId(),
                    category.getName(),

                    borrow.getBorrowId(),
                    borrow.getBorrowDate(),
                    borrow.getDueDate(),

                    returns.getReturnId(),
                    returns.getReturnDate()
            );
            dtosList.add(item);
        }

        dtosList.sort(
                Comparator.comparing(AdminFineDto::returnDate).reversed()
                        .thenComparing(AdminFineDto::fineId, Comparator.reverseOrder())
        );
        return dtosList;
    }

    @Override
    public FineCollectionStatsDTO getFineCollectionStats() {
        Object result = fineRepository.getFineCollectionStats();
        logger.warn("result is: {}", result);
        Object[] resultArray = (Object[]) result;
        return new FineCollectionStatsDTO(resultArray);
    }

    @Override
    public List<MonthlyFineStatsDTO> getMonthlyFineStats(Date startDate, Date endDate) {
        List<Object[]> results = fineRepository.getMonthlyFineCollectionStats(startDate, endDate);
        return results.stream()
                .map(MonthlyFineStatsDTO::new)
                .collect(Collectors.toList());
    }

}
