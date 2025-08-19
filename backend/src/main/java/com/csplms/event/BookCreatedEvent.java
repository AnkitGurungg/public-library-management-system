package com.csplms.event;

import lombok.Builder;
import lombok.Data;
import com.csplms.dto.responseDto.BookDto;
import com.csplms.enums.NotificationEventType;

@Data
@Builder
public class BookCreatedEvent implements NotificationEvent{
    private BookDto bookDto;
    private String[] emails;

    @Override
    public String getEventType() {
        return NotificationEventType.BOOK_CREATED.getRoutingKey();
    }
}
