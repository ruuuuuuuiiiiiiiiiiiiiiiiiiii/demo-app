package com.example.demo_sm.dto;

import java.util.Date;

public interface RentalProjection {

    Long getRentalId();
    Long getRentalDetailId();
    Long getMovieId();
    Long getCustomerId();
    Date getDateRented();
    Date getDateReturned();
    Date getCreatedDate();
    Date getModifiedDate();

}
