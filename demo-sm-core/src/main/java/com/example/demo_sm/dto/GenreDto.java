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
public class GenreDto {

    private Long GenreID;
    private String GenreName;
    private Date CreatedDate;
    private Date ModifiedDate;

}
