package com.example.demo_sm.controller;

import com.example.demo_sm.dto.RentalDto;
import com.example.demo_sm.service.RentalService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    private RentalService rentalService;

    @PostMapping
    public ResponseEntity<RentalDto> createRental(@RequestBody RentalDto rentalDto) {
        RentalDto savedRental = rentalService.createRental(rentalDto);

        return new ResponseEntity<>(savedRental, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<RentalDto> getRentalById(@PathVariable("id") Long rentalId) {
        RentalDto rentalDto = rentalService.getRentalById(rentalId);

        return ResponseEntity.ok(rentalDto);
    }

    @GetMapping("/customer/{name}")
    public ResponseEntity<List<RentalDto>> getRentalByCustomerName(@PathVariable("name") String customerName) {

        List<RentalDto> rentals = rentalService.getRentalByCustomerName(customerName);

        return ResponseEntity.ok(rentals);

    }

    @GetMapping
    public ResponseEntity<List<RentalDto>> getAllRentals(){
        List<RentalDto> rentals = rentalService.getAllRental();

        return ResponseEntity.ok(rentals);
    }

    @PutMapping("{id}")
    public ResponseEntity<RentalDto> updateRental(@PathVariable("id") Long rentalId,
                                                  @RequestBody RentalDto updatedRental) {
        RentalDto rentalDto = rentalService.updateRental(rentalId, updatedRental);

        return ResponseEntity.ok(rentalDto);

    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRental(@PathVariable("id") Long rentalId) {
        rentalService.deleteRental(rentalId);

        return ResponseEntity.ok("Rental deleted successfully!");
    }

}
