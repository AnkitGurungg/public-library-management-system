package com.csplms.service.LibrarianAdmin;

import com.csplms.dto.requestDto.ShelfRequestDto;
import com.csplms.dto.responseDto.AdminShelfDto;
import com.csplms.dto.responseDto.ShelfDto;
import com.csplms.dto.responseDto.ShelfResponseDto;
import com.csplms.entity.Shelf;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ShelfService {
    @Transactional
    ShelfResponseDto addShelf(ShelfRequestDto shelfRequestDTO);

    @Transactional
    Shelf updateShelf(int shelfId, ShelfRequestDto shelfRequestDTO);

    @Transactional
    Integer restoreShelf(int shelfId);

    ShelfDto getShelf(int shelfId);

    List<AdminShelfDto> getShelves();

    //    get all active shelves
    List<ShelfDto> getAllAvailableShelves();

    @Transactional
    Integer deleteShelf(Integer shelfId);
}
