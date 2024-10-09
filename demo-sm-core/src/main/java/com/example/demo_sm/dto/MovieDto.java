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
public class MovieDto {

    private Long MovieID;
    private String MovieName;
    private Long GenreID;
    private Date DateAdded;
    private Date ReleaseDate;
    private Long NumberInStock;
    private Long NumberAvailable;
    private Date CreatedDate;
    private Date ModifiedDate;

}
