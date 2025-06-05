package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.responseDto.reports.FineCollectionStatsDTO;
import com.csplms.dto.responseDto.reports.MonthlyFineStatsDTO;
import com.csplms.entity.Borrow;
import com.csplms.entity.Fine;
import com.csplms.entity.Return;
import com.csplms.exception.ResourceListNotFoundException;
import com.csplms.mapper.FineMapper;
import com.csplms.repository.FineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FineService {

    @Value("${fine.rate}")
    private String fineRate;

    private final FineMapper fineMapper;
    private final FineRepository fineRepository;
    private static final Logger logger = LoggerFactory.getLogger(FineService.class);

    @Autowired
    public FineService(FineMapper fineMapper, FineRepository fineRepository) {
        this.fineMapper = fineMapper;
        this.fineRepository = fineRepository;
    }

    public long generateFine(Borrow borrow, Return returns) {
        double milliSeconds = returns.getReturnDate().getTime() - borrow.getDueDate().getTime();
        double days = milliSeconds/86400000;

        return Math.round(Integer.parseInt(fineRate)*days);
    }

    public List<Fine> getAllFineRecords() {
        List<Fine> fines = this.fineRepository.findAll();
        if (fines.isEmpty()) {
            throw new ResourceListNotFoundException("Fine records");
        }
        return fines;
    }

    public FineCollectionStatsDTO getFineCollectionStats() {
        Object result = fineRepository.getFineCollectionStats();
        logger.warn("result is: {}", result);
        Object[] resultArray = (Object[]) result;
        return new FineCollectionStatsDTO(resultArray);
    }

    public List<MonthlyFineStatsDTO> getMonthlyFineStats(Date startDate, Date endDate) {
        List<Object[]> results = fineRepository.getMonthlyFineCollectionStats(startDate, endDate);
        return results.stream()
                .map(MonthlyFineStatsDTO::new)
                .collect(Collectors.toList());
    }

}
