package com.example.demo_sm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RentalDto {

    private Long RentalId;
    private Long RentalDetailId;
    private Long MovieId;
    private Long CustomerId;
    private Date DateRented;
    private Date DateReturned;
    private Date CreatedDate;
    private Date ModifiedDate;

}
