package com.csplms.service.Member;

import com.csplms.dto.responseDto.MemberFineDto;
import org.springframework.data.domain.Page;

public interface MemberFineService {
    Page<MemberFineDto> getMemberFines(int page, int size, String title, Integer categoryId, Boolean extended, Boolean paid);
}
