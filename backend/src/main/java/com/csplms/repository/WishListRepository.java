package com.csplms.repository;

import com.csplms.entity.WishList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WishListRepository extends JpaRepository<WishList, Long> {

    @Query(
            value = "SELECT w.* from wish_list w " +
                    "JOIN books b on w.book_id = b.book_id " +
                    "WHERE w.user_id = :userId " +
                    "AND (:title IS NULL OR b.title LIKE CONCAT('%', :title, '%')) " +
                    "AND (:language IS NULL OR b.language = :language) " +
                    "AND (:categoryId IS NULL OR b.category_id = :categoryId) " +
                    "AND (:inStock IS NULL OR (:inStock = TRUE AND b.available_quantity > 0) OR (:inStock = FALSE AND b.available_quantity = 0)) " +
                    "ORDER BY w.added_date DESC, " +
                    "w.wish_list_id DESC",
            countQuery = "SELECT count(*) from wish_list w " +
                         "JOIN books b on w.book_id = b.book_id " +
                         "WHERE w.user_id = :userId " +
                         "AND (:title IS NULL OR b.title LIKE CONCAT('%', :title, '%')) " +
                         "AND (:categoryId IS NULL OR b.category_id = :categoryId) " +
                         "AND (:language IS NULL OR b.language = :language) " +
                         "AND (:inStock IS NULL OR (:inStock = TRUE AND b.available_quantity > 0) OR (:inStock = FALSE AND b.available_quantity = 0))",
            nativeQuery = true
    )
    Page<WishList> findByUserId(
            Pageable pg,
            @Param("userId") Integer userId,
            @Param("title") String title,
            @Param("categoryId") Integer categoryId,
            @Param("language") String language,
            @Param("inStock") Boolean inStock
    );
}