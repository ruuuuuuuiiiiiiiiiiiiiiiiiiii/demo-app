package com.example.demo_sm.repository;

import com.example.demo_sm.dto.RentalProjection;
import com.example.demo_sm.entity.RentalHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RentalHeaderRepository extends JpaRepository<RentalHeader, Long> {

    @Query("""
          SELECT
            new com.example.demo_sm.dto.RentalDto(
                rh.RentalId,
                rd.RentalDetailId,
                rd.Movie.MovieID,
                rh.Customer.CustomerID,
                rh.DateRented,
                rd.DateReturned,
                rh.CreatedDate,
                rh.ModifiedDate
            )
          FROM RentalHeader rh
          INNER JOIN RentalDetail rd ON rh.RentalId = rd.RentalHeader.RentalId
          INNER JOIN Customer c ON c.CustomerID = rh.Customer.CustomerID
          WHERE c.CustomerName = :customerName
    """)
    List<RentalProjection> findRentalByCustomerName(@Param("customerName") String customerName);

}
