package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.responseDto.AdminFineDto;
import com.csplms.dto.responseDto.reports.FineCollectionStatsDTO;
import com.csplms.dto.responseDto.reports.MonthlyFineStatsDTO;
import com.csplms.entity.Borrow;
import com.csplms.entity.Return;

import java.sql.Date;
import java.util.List;

public interface FineService {
    long generateFine(Borrow borrow, Return returns);

    List<AdminFineDto> getAllFineRecords();

    FineCollectionStatsDTO getFineCollectionStats();

    List<MonthlyFineStatsDTO> getMonthlyFineStats(Date startDate, Date endDate);
}
