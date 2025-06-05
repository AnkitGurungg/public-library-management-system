package com.csplms.dto.responseDto.reports;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyFineStatsDTO {
    private int year;
    private int month;
    private String monthName;
    private Long totalFines;
    private Long paidFines;
    private Long totalAmount;
    private Long collectedAmount;
    private Double collectionRate;

    public MonthlyFineStatsDTO(Object[] result) {
        this.year = ((Number) result[0]).intValue();
        this.month = ((Number) result[1]).intValue();
        this.totalFines = ((Number) result[2]).longValue();
        this.paidFines = ((Number) result[3]).longValue();
        this.totalAmount = ((Number) result[4]).longValue();
        this.collectedAmount = ((Number) result[5]).longValue();
        this.collectionRate = totalFines > 0 ? (paidFines.doubleValue() / totalFines.doubleValue()) * 100 : 0.0;
        this.monthName = getMonthName(month);
    }

    private String getMonthName(int month) {
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        return months[month - 1];
    }
}
