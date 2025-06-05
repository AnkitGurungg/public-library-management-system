package com.csplms.repository;

import com.csplms.dto.responseDto.BookReturnInfo;
import com.csplms.entity.Book;
import com.csplms.entity.Return;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReturnRepository extends JpaRepository<Return, Integer> {

//    might be null
    @Query(value = "select * from return_records where borrow_id=:borrowId", nativeQuery = true)
    Return findByBorrowId(Integer borrowId);

    @Query(value = """
        SELECT
            b.*,
            br.*,
            u.*,
            c.category_id AS categoryId,
            c.name AS categoryName,
            rr.return_id AS returnId,
            rr.return_date AS returnDate
        
        FROM books b
        JOIN borrow_records br ON b.book_id = br.book_id
        JOIN users u ON u.user_id = br.user_id
        LEFT JOIN return_records rr ON br.borrow_id = rr.borrow_id
        LEFT JOIN categories c ON b.category_id = c.category_id
        
        WHERE u.user_id =:userId;
        """, nativeQuery = true
    )
    List<BookReturnInfo> findReturnedBooksByUserId(Long userId);

}
