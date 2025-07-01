package com.csplms.repository;

import com.csplms.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    Optional<Payment> findByPidx(String integer);

    //    Both for 1st chart
    @Query("SELECT YEAR(p.date) as year, MONTH(p.date) as month, SUM(p.amount) as totalRevenue " +
            "FROM Payment p " +
            "WHERE p.date >= :startDate AND p.date <= :endDate " +
            "GROUP BY YEAR(p.date), MONTH(p.date) " +
            "ORDER BY YEAR(p.date), MONTH(p.date)")
    List<Object[]> getMonthlyRevenue(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

//    Both for 1st chart
    @Query("SELECT YEAR(p.date) as year, MONTH(p.date) as month, SUM(p.amount) as totalRevenue " +
            "FROM Payment p " +
            "GROUP BY YEAR(p.date), MONTH(p.date) " +
            "ORDER BY YEAR(p.date), MONTH(p.date)")
    List<Object[]> getAllMonthlyRevenue();
}
