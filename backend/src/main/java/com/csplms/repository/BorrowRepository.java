package com.csplms.repository;

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

    @Query(value = "select * from borrow_records where return_status=0 AND due_date<:date order by borrow_date desc", nativeQuery = true)
    List<Borrow> getAllOverdueBooks(Date date);

    @Query(value = "select * from borrow_records where return_status=0 AND user_id=:userId order by borrow_date desc", nativeQuery = true)
    List<Borrow> userBorrows(Integer userId);

    @Query(value = "select * from borrow_records order by return_status asc, borrow_id desc, borrow_date desc", nativeQuery = true)
    List<Borrow> getAllBorrowRecords();

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
