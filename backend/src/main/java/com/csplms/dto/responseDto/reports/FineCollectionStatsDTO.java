package com.csplms.dto.responseDto.reports;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FineCollectionStatsDTO {
    private Long totalFines;
    private Long paidFines;
    private Long unpaidFines;
    private Long totalAmount;
    private Long collectedAmount;
    private Double collectionRate;

    public FineCollectionStatsDTO(Object[] result) {
        System.out.println("result is: " + result[0]);
        System.out.println("result is: " + ((Number) result[0]).longValue());
        this.totalFines = ((Number) result[0]).longValue();
        this.paidFines = ((Number) result[1]).longValue();
        this.unpaidFines = ((Number) result[2]).longValue();
        this.totalAmount = ((Number) result[3]).longValue();
        this.collectedAmount = ((Number) result[4]).longValue();
        this.collectionRate = totalFines > 0 ? (paidFines.doubleValue() / totalFines.doubleValue()) * 100 : 0.0;
    }
}
