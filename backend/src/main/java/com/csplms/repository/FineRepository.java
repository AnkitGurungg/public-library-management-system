package com.csplms.repository;

import com.csplms.dto.responseDto.MemberFineDto;
import com.csplms.entity.Fine;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface FineRepository extends JpaRepository<Fine, Integer> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT f FROM Fine f WHERE f.fineId = :id")
    Optional<Fine> findByIdForUpdate(@Param("id") Integer id);

//    For second chart
    @Query("SELECT " +
            "COUNT(f) as totalFines, " +
            "SUM(CASE WHEN f.paidStatus = true THEN 1 ELSE 0 END) as paidFines, " +
            "SUM(CASE WHEN f.paidStatus = false THEN 1 ELSE 0 END) as unpaidFines, " +
            "SUM(f.totalFine) as totalAmount, " +
            "SUM(CASE WHEN f.paidStatus = true THEN f.totalFine ELSE 0 END) as collectedAmount " +
            "FROM Fine f")
    Object getFineCollectionStats();

    @Query(
            """
            SELECT new com.csplms.dto.responseDto.MemberFineDto(
                f.fineId, f.totalFine, f.paidStatus,
                b.bookId, b.title, b.language, b.imageURL,
                c.categoryId, c.name,
                br.borrowDate, br.dueDate, br.extended,
                r.returnDate,
                p.paymentId, p.amount
            )
            FROM Fine f
            JOIN f.returns r
            JOIN r.borrows br
            JOIN br.borrowBooks b
            LEFT JOIN b.category c
            LEFT JOIN f.payment p
            WHERE br.borrowUsers.userId = :userId
            ORDER BY r.returnDate DESC, f.fineId DESC
        """
    )
    List<MemberFineDto> finesInfoByUserId(@Param("userId") Integer userId);

    @Query(
            """
            SELECT new com.csplms.dto.responseDto.MemberFineDto(
                f.fineId, f.totalFine, f.paidStatus,
                b.bookId, b.title, b.language, b.imageURL,
                c.categoryId, c.name,
                br.borrowDate, br.dueDate, br.extended,
                r.returnDate,
                p.paymentId, p.amount
            )
            FROM Fine f
            JOIN f.returns r
            JOIN r.borrows br
            JOIN br.borrowBooks b
            LEFT JOIN b.category c
            LEFT JOIN f.payment p
            WHERE br.borrowUsers.userId = :userId
              AND (:title IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :title, '%')))
              AND (:categoryId IS NULL OR c.categoryId = :categoryId)
              AND (:extended IS NULL OR br.extended = :extended)
              AND (:paid IS NULL OR f.paidStatus = :paid)
            ORDER BY r.returnDate DESC, f.fineId DESC
        """
    )
    Page<MemberFineDto> findFinesByUserId(
            Pageable pageable,
            @Param("userId") Integer userId,
            @Param("title") String title,
            @Param("categoryId") Integer categoryId,
            @Param("extended") Boolean extended,
            @Param("paid") Boolean paid
    );

    //    For 4th chart (monthly fine collection)
    @Query("SELECT " +
            "YEAR(f.returns.returnDate) as year, " +
            "MONTH(f.returns.returnDate) as month, " +
            "COUNT(f) as totalFines, " +
            "SUM(CASE WHEN f.paidStatus = true THEN 1 ELSE 0 END) as paidFines, " +
            "SUM(f.totalFine) as totalAmount, " +
            "SUM(CASE WHEN f.paidStatus = true THEN f.totalFine ELSE 0 END) as collectedAmount " +
            "FROM Fine f " +
            "WHERE f.returns.returnDate >= :startDate AND f.returns.returnDate <= :endDate " +
            "GROUP BY YEAR(f.returns.returnDate), MONTH(f.returns.returnDate) " +
            "ORDER BY YEAR(f.returns.returnDate), MONTH(f.returns.returnDate)")
    List<Object[]> getMonthlyFineCollectionStats(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

}
