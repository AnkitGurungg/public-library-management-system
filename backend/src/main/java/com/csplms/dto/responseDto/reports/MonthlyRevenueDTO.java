package com.csplms.dto.responseDto.reports;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyRevenueDTO {
    private int year;
    private int month;
    private String monthName;
    private Long totalRevenue;

    public MonthlyRevenueDTO(int year, int month, Long totalRevenue) {
        this.year = year;
        this.month = month;
        this.totalRevenue = totalRevenue;
        this.monthName = getMonthName(month);
    }

    private String getMonthName(int month) {
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        return months[month - 1];
    }
}
