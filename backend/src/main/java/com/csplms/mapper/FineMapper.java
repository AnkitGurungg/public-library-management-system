package com.csplms.mapper;

import com.csplms.entity.Fine;
import com.csplms.entity.Return;
import org.springframework.stereotype.Component;

@Component
public class FineMapper {

    public Fine toFine(Return returns, long totalAmount) {
        return new Fine(
                totalAmount,
                false,
                returns
        );
    }
}
