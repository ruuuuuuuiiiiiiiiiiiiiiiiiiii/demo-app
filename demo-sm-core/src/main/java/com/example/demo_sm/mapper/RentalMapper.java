package com.example.demo_sm.mapper;

import com.example.demo_sm.dto.RentalDto;
import com.example.demo_sm.dto.RentalProjection;
import com.example.demo_sm.entity.RentalDetail;
import com.example.demo_sm.entity.RentalHeader;

public class RentalMapper {

    public static RentalDto mapToRentalDto(RentalHeader rentalHeader, RentalDetail rentalDetail) {
        return new RentalDto(
                rentalHeader.getRentalId(),
                rentalDetail.getRentalDetailId(),
                rentalDetail.getMovie().getMovieID(),
                rentalHeader.getCustomer().getCustomerID(),
                rentalHeader.getDateRented(),
                rentalDetail.getDateReturned(),
                rentalHeader.getCreatedDate(),
                rentalHeader.getModifiedDate()
        );
    }

    public static RentalDto mapToRentalDto(RentalProjection rentalProjection) {
        return new RentalDto(
                rentalProjection.getRentalId(),
                rentalProjection.getRentalDetailId(),
                rentalProjection.getMovieId(),
                rentalProjection.getCustomerId(),
                rentalProjection.getDateRented(),
                rentalProjection.getDateReturned(),
                rentalProjection.getCreatedDate(),
                rentalProjection.getModifiedDate()
        );
    }

    public static RentalHeader mapToRentalHeader(RentalDto rentalDto) {
        RentalHeader rentalHeader = new RentalHeader();

        rentalHeader.setRentalId(rentalDto.getRentalId());
        rentalHeader.setDateRented(rentalDto.getDateRented());
        rentalHeader.setDateRented(rentalDto.getCreatedDate());
        rentalHeader.setModifiedDate(rentalDto.getModifiedDate());

        return rentalHeader;
    }

    public static RentalDetail mapToRentalDetail(RentalDto rentalDto) {
        RentalDetail rentalDetail = new RentalDetail();

        rentalDetail.setRentalDetailId(rentalDto.getRentalDetailId());
        rentalDetail.setDateReturned(rentalDto.getDateReturned());

        return rentalDetail;
    }
}
