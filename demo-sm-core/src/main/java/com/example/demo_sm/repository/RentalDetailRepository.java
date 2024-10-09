package com.example.demo_sm.repository;

import com.example.demo_sm.entity.RentalDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RentalDetailRepository extends JpaRepository<RentalDetail, Long> {

    @Query("""
        SELECT rd FROM RentalDetail rd WHERE rd.RentalHeader.RentalId = :rentalId
    """)
    RentalDetail findByRentalId(Long rentalId);

}
