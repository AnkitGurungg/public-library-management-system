package com.csplms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.csplms.entity.Return;
import org.springframework.stereotype.Repository;

@Repository
public interface ReturnRepository extends JpaRepository<Return, Integer> {

}
