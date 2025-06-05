package com.csplms.repository;

import com.csplms.entity.Evidence;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface EvidenceRepository extends JpaRepository<Evidence, Integer> {

    @Query(value = "select * from evidences where user_id=:userId", nativeQuery = true)
    Evidence findByUserId(Integer userId);

}
