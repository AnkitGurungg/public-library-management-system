package com.csplms.dto.responseDto.reports;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OverdueStatsDTO {
    private Long totalBorrows;
    private Long overdueBorrows;
    private Long lateReturns;
    private Long onTimeReturns;
    private Double overdueRate;
    private Double averageDaysLate;

    public OverdueStatsDTO(Object[] result, Double avgDaysLate) {
//        this.totalBorrows = ((Number) result[0]).longValue();
//        this.overdueBorrows = ((Number) result[1]).longValue();
//        this.lateReturns = ((Number) result[2]).longValue();
//        this.onTimeReturns = ((Number) result[3]).longValue();
        this.totalBorrows = result[0] != null ? ((Number) result[0]).longValue() : 0L;
        this.overdueBorrows = result[1] != null ? ((Number) result[1]).longValue() : 0L;
        this.lateReturns = result[2] != null ? ((Number) result[2]).longValue() : 0L;
        this.onTimeReturns = result[3] != null ? ((Number) result[3]).longValue() : 0L;
        this.overdueRate = totalBorrows > 0 ? (overdueBorrows.doubleValue() / totalBorrows.doubleValue()) * 100 : 0.0;
        this.averageDaysLate = avgDaysLate != null ? avgDaysLate : 0.0;
    }

}
