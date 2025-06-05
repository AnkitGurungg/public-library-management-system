package com.csplms.repository;

import com.csplms.entity.Fine;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;

@Repository
public interface FineRepository extends JpaRepository<Fine, Integer> {

//    For second chart
    @Query("SELECT " +
            "COUNT(f) as totalFines, " +
            "SUM(CASE WHEN f.paidStatus = true THEN 1 ELSE 0 END) as paidFines, " +
            "SUM(CASE WHEN f.paidStatus = false THEN 1 ELSE 0 END) as unpaidFines, " +
            "SUM(f.totalFine) as totalAmount, " +
            "SUM(CASE WHEN f.paidStatus = true THEN f.totalFine ELSE 0 END) as collectedAmount " +
            "FROM Fine f")
    Object getFineCollectionStats();

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
