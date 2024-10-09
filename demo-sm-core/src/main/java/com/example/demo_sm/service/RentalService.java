package com.example.demo_sm.service;

import com.example.demo_sm.dto.RentalDto;

import java.util.List;

public interface RentalService {

    RentalDto createRental(RentalDto rentalDto);

    RentalDto getRentalById(Long rentalId);

    List<RentalDto> getRentalByCustomerName(String customerName);

    List<RentalDto> getAllRental();

    RentalDto updateRental(Long rentalId, RentalDto updatedRental);

    void deleteRental(Long rentalId);

}
