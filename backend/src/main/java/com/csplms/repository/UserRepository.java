package com.csplms.repository;

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

    @Query(value = "select * from users where active=1 AND is_profile_updated=1 AND roles='ROLE_MEMBER' order by user_id desc, present desc, verified desc, applied_date desc", nativeQuery = true)
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

}
