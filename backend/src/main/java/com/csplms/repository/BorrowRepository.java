package com.csplms.repository;

import com.csplms.dto.responseDto.BookReturnDto;
import com.csplms.entity.Borrow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;

@Repository
public interface BorrowRepository extends JpaRepository<Borrow, Integer> {

    @Query(value = "select count(*) as borrowed_books from borrow_records WHERE return_status = 0", nativeQuery = true)
    Integer countBorrowedBooks();

    @Query(value = "select * from borrow_records where return_status=0 AND user_id=:userId order by borrow_date desc", nativeQuery = true)
    List<Borrow> userBorrows(Integer userId);

    @Query(
            value = """
                    SELECT br.*
                    FROM borrow_records br
                    JOIN (
                        SELECT book_id,
                               COUNT(*) AS borrow_count,
                               MAX(borrow_date) AS latest_borrow_date
                        FROM borrow_records
                        GROUP BY book_id
                    ) AS book_stats
                    ON br.book_id = book_stats.book_id
                    GROUP BY br.book_id
                    ORDER BY book_stats.borrow_count DESC,
                             book_stats.latest_borrow_date DESC,
                             br.book_id DESC
                    """,
            countQuery = "SELECT COUNT(DISTINCT book_id) FROM borrow_records",
            nativeQuery = true
    )
    Page<Borrow> topBorrowedBooks(Pageable pageable);

    @Query(
            value = "SELECT b.* FROM borrow_records b " +
                    "JOIN users u ON b.user_id = u.user_id " +
                    "WHERE (:name IS NULL OR u.name LIKE %:name%) " +
                    "AND (:extended IS NULL OR b.extended = :extended) " +
                    "AND (:returnStatus IS NULL OR b.return_status = :returnStatus) " +
                    "ORDER BY b.return_status ASC, b.borrow_id DESC, b.borrow_date DESC",
            countQuery = "SELECT COUNT(*) FROM borrow_records b " +
                         "JOIN users u ON b.user_id = u.user_id " +
                         "WHERE (:name IS NULL OR u.name LIKE %:name%) " +
                         "AND (:extended IS NULL OR b.extended = :extended) " +
                         "AND (:returnStatus IS NULL OR b.return_status = :returnStatus)",
            nativeQuery = true
    )
    Page<Borrow> getAllBorrowRecords(
            Pageable pageable,
            @Param("name") String name,
            @Param("extended") Boolean extended,
            @Param("returnStatus") Boolean returnStatus
    );

    @Query(
            value = "SELECT b.* FROM borrow_records b " +
                    "JOIN users u ON b.user_id = u.user_id " +
                    "WHERE b.return_status = 0 " +
                    "AND b.due_date < :date " +
                    "AND (:name IS NULL OR u.name LIKE CONCAT('%', :name, '%')) " +
                    "AND (:extended IS NULL OR b.extended = :extended) " +
                    "AND (:returnStatus IS NULL OR b.return_status = :returnStatus) " +
                    "ORDER BY b.borrow_date DESC",
            countQuery = "SELECT COUNT(*) FROM borrow_records b " +
                         "JOIN users u ON b.user_id = u.user_id " +
                         "WHERE b.return_status = 0 " +
                         "AND b.due_date < :date " +
                         "AND (:name IS NULL OR u.name LIKE CONCAT('%', :name, '%')) " +
                         "AND (:extended IS NULL OR b.extended = :extended) " +
                         "AND (:returnStatus IS NULL OR b.return_status = :returnStatus)",
            nativeQuery = true
    )
    Page<Borrow> getAllOverdueBorrowBooks(
            Pageable pageable,
            @Param("name") String name,
            @Param("extended") Boolean extended,
            @Param("returnStatus") Boolean returnStatus,
            @Param("date") Date date
    );

    @Query(
            """
            SELECT new com.csplms.dto.responseDto.BookReturnDto(
                    b.bookId, b.title, b.language, b.imageURL,
                    c.categoryId, c.name,
                    br.borrowDate, br.dueDate, br.extended, br.returnStatus,
                    r.returnDate
                )
                FROM Borrow br
                JOIN br.borrowBooks b
                LEFT JOIN br.returns r
                LEFT JOIN b.category c
                WHERE br.borrowUsers.userId = :userId
                AND (:title IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :title, '%')))
                AND (:language IS NULL OR LOWER(b.language) = LOWER(:language))
                AND (:categoryId IS NULL OR c.categoryId = :categoryId)
                AND (:extended IS NULL OR br.extended = :extended)
                ORDER BY br.borrowDate DESC
            """
    )
    Page<BookReturnDto> findBorrowedBooksByUserId(
            Pageable pageable,
            @Param("userId") Integer userId,
            @Param("title") String title,
            @Param("language") String language,
            @Param("categoryId") Integer categoryId,
            @Param("extended") Boolean extended
    );

    @Query(value = "SELECT COUNT(*) FROM borrow_records WHERE return_status = false AND book_id = :bookId", nativeQuery = true)
    int countUnreturnedBooksByBookId(Integer bookId);

    @Query(value = "SELECT MONTH(b.borrow_date) as month, COUNT(b.borrow_id) as count " +
                   "FROM borrow_records b " +
                   "WHERE YEAR(b.borrow_date) = :year " +
                   "GROUP BY MONTH(b.borrow_date) " +
                   "ORDER BY month", nativeQuery = true)
    List<Object[]> countBorrowsByMonth(@Param("year") int year);

    //    Both for 3rd chart (overdue statistics)
    @Query("SELECT " +
           "COUNT(b) as totalBorrows, " +
           "SUM(CASE WHEN b.dueDate < CURRENT_DATE AND b.returnStatus = false THEN 1 ELSE 0 END) as overdueBorrows, " +
           "SUM(CASE WHEN b.returnStatus = true AND b.returns.returnDate > b.dueDate THEN 1 ELSE 0 END) as lateReturns, " +
           "SUM(CASE WHEN b.returnStatus = true AND b.returns.returnDate <= b.dueDate THEN 1 ELSE 0 END) as onTimeReturns " +
           "FROM Borrow b")
    Object getOverdueStats();

    //    Both for 3rd chart (overdue statistics)
    @Query("SELECT " +
           "AVG(DATEDIFF(b.returns.returnDate, b.dueDate)) as avgDaysLate " +
           "FROM Borrow b " +
           "WHERE b.returnStatus = true AND b.returns.returnDate > b.dueDate")
    Double getAverageDaysLate();

}
