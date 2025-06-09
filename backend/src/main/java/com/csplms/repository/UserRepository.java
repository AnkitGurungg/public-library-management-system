package com.csplms.repository;

import com.csplms.dto.responseDto.FinesInfo;
import com.csplms.entity.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

//    loadByUsername
    Optional<User> findUserByEmail(String email);

//    dashboard section
    @Query(value = "SELECT COUNT(*) AS toVerify FROM users WHERE active = 1 AND verified = 0 AND present = 1 AND is_profile_updated=1 and roles = 'ROLE_MEMBER'", nativeQuery = true)
    Integer countMembersToVerify();

    @Query(value = "SELECT COUNT(*) AS total_members FROM users WHERE active = 1 AND verified = 1 AND present = 1 AND is_profile_updated=1 AND roles = 'ROLE_MEMBER'", nativeQuery = true)
    Integer countVerifiedMembers();

//    librarians section
    @Query(value = "select * from users where roles='ROLE_LIBRARIAN' order by present desc, user_id desc, applied_date desc;",nativeQuery = true)
    List<User> getAllLibrarians();

//    members section
    @Query(value = "select * from users where active=1 and verified=0 and present=1 and is_profile_updated=1 and roles='ROLE_MEMBER' order by user_id desc, applied_date desc;", nativeQuery = true)
    List<User> getNonVerifiedMembers();

    @Query(value = "select * from users where active=1 AND roles='ROLE_MEMBER' order by user_id desc, present desc, verified desc, applied_date desc", nativeQuery = true)
    List<User> getVerifiedMembers();

    @Query(value = "select * from users where active=1 and verified=1 and present=1;", nativeQuery = true)
    List<User> userToNotify();

    @Query(value = "select * from users order by user_id desc, present desc, verified desc, applied_date desc;", nativeQuery = true)
    List<User> getAllUsers();

//    delete user
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "update users set present=0, verified=0 where user_id=:userId", nativeQuery = true)
    int deleteUser(Integer userId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "update users set present=0, verified=0 where user_id=:userId", nativeQuery = true)
    int deleteLibrarian(Integer userId);

    @Query(value = """
        SELECT
            b.*,
            br.*,
            u.*,
            c.category_id AS categoryId,
            c.name AS categoryName,
            rr.return_id AS returnId,
            rr.return_date AS returnDate,
            f.*,
            p.payment_id as paymentId,
            p.amount as amount,
            p.date as date
        FROM books b
        LEFT JOIN categories c ON b.category_id = c.category_id
        JOIN borrow_records br ON b.book_id = br.book_id
        JOIN users u ON u.user_id = br.user_id
        JOIN return_records rr ON br.borrow_id = rr.borrow_id
        JOIN fines f on rr.return_id = f.return_id
        LEFT JOIN payments p on f.fine_id = p.fine_id
        WHERE u.user_id=:userId order by rr.return_date desc, f.fine_id desc
        """, nativeQuery = true
    )
    List<FinesInfo> finesInfo(Long userId);

}
