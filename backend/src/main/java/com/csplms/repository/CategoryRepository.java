package com.csplms.repository;

import com.csplms.entity.Category;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

//    Both getAllCategoriesAndShelfs and getAllAvailableCategories uses this
    @Query(value = "select * from categories where present=1 order by added_date desc, category_id desc", nativeQuery = true)
    List<Category> getAllAvailableCategories();

//    Get all the categories to display on admin panel
    @Query(value = "select * from categories order by present desc, category_id desc, added_date desc", nativeQuery = true)
    List<Category> getAllCategories();

    // Find most popular categories based on borrows
    @Query("SELECT c, COUNT(br) as borrowCount FROM Category c " +
            "JOIN c.books b JOIN b.borrows br GROUP BY c ORDER BY borrowCount DESC")
    List<Object[]> findMostPopularCategories();

    @Query("SELECT DISTINCT b.category FROM WishList w JOIN w.book b WHERE w.user.userId = :userId")
    List<Category> findDistinctByWishlistUser(@Param("userId") Integer userId);

    @Query("SELECT DISTINCT b.category FROM Borrow br JOIN br.borrowBooks b WHERE br.borrowUsers.userId = :userId")
    List<Category> findDistinctByBorrowUser(@Param("userId") Integer userId);

}
