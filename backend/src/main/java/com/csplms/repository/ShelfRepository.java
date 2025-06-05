package com.csplms.repository;

import com.csplms.entity.Shelf;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface ShelfRepository extends JpaRepository<Shelf, Integer> {
    List<Shelf> findByName(String name);

    @Query(value = "select * from shelfs order by present desc, shelf_id desc, added_date desc", nativeQuery = true)
    List<Shelf> getAllShelves();

    @Query(value = "select * from shelfs where present=1 order by present desc, added_date desc, shelf_id desc", nativeQuery = true)
    List<Shelf> getAllAvailableShelves();

    @Transactional
    Integer deleteShelfByShelfId(Integer shelfId);

//    getAllCategoriesAndShelfs (add book form)
    @Query(value = "select * from shelfs where present=1 and category_id=:categoryId", nativeQuery = true)
    List<Shelf> selectAllByCategoryId(Integer categoryId);

//    delete shelfs by category
    @Query(value = "select * from shelfs where present=1 and category_id=:categoryId", nativeQuery = true)
    List<Shelf> selectAllDeleteCategoryShelfsByCategoryId(Integer categoryId);

//    restore shelfs by category
    @Query(value = "select * from shelfs where present=0 and category_id=:categoryId", nativeQuery = true)
    List<Shelf> selectAllRestoreShelfsByCategoryId(Integer categoryId);

}
