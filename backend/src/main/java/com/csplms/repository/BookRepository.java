package com.csplms.repository;

import com.csplms.dto.responseDto.CategoryCountDTO;
import com.csplms.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    @Query(value = "SELECT COUNT(*) AS total_book FROM books WHERE available=1", nativeQuery = true)
    Integer countBooks();

    @Query(value = "select * from books where available=1 AND category_id=:categoryId order by added_date desc, book_id desc", nativeQuery = true)
    List<Book> getFilteredBooksByCategory(Integer categoryId);

    // for librarian and admin
    @Query(value = "select * from books order by available desc, book_id desc, added_date desc", nativeQuery = true)
    List<Book> getAllBooks();

//    delete books by category
    @Query(value = "select * from books where available=1 and category_id=:categoryId", nativeQuery = true)
    List<Book> selectAllDeleteCategoryBooksByCategoryId(Integer categoryId);

//    restore books by category
    @Query(value = "select * from books where available=0 and category_id=:categoryId", nativeQuery = true)
    List<Book> selectAllRestoreBooksByCategoryId(Integer categoryId);

//    both delete category and delete shelf uses this
    @Query(value = "select * from books where available=1 and shelf_id=:shelfId", nativeQuery = true)
    List<Book> selectAllDeleteShelfBooksByShelfId(Integer shelfId);

//    both restore category and restore shelf uses this
    @Query(value = "select * from books where available=0 and shelf_id=:shelfId", nativeQuery = true)
    List<Book> selectAllRestoreShelfBooksByShelfId(Integer shelfId);

    // header
    @Query(value = "select * from books where available=1 order by added_date desc, book_id desc;", nativeQuery = true)
    List<Book> getAllAvailableBooks();

    //home page
    @Query(
            value = "SELECT * FROM books WHERE available = 1 ORDER BY added_date DESC, book_id DESC",
            countQuery = "SELECT COUNT(*) FROM books WHERE available = 1",
            nativeQuery = true
    )
    Page<Book> getAllNewArrivalBooks(Pageable pageable);


    @Query("SELECT new com.csplms.dto.responseDto.CategoryCountDTO(c.name, COUNT(b)) " +
            "FROM Book b JOIN b.category c " +
            "GROUP BY c.name " +
            "ORDER BY COUNT(b) DESC")
    List<CategoryCountDTO> findCategoriesWithBookCount();

    // Find books that have never been borrowed
    @Query("SELECT b FROM Book b WHERE b NOT IN (SELECT DISTINCT br.borrowBooks FROM Borrow br)")
    List<Book> findBooksNeverBorrowed();

    @Query(value = "SELECT * FROM books where available=1 ORDER BY published_date DESC, added_date desc, book_id desc;", nativeQuery = true)
    List<Book> findBooksOrderByPublishedDate();

}
