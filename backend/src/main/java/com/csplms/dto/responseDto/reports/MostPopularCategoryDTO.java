package com.csplms.dto.responseDto.reports;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MostPopularCategoryDTO {
    private Integer categoryId;
    private String name;
    private String startingNumber;
    private String endingNumber;
    private Date addedDate;
    private boolean present;
    private int borrowCount;
}
