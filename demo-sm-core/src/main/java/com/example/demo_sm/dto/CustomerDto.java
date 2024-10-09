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
public class CustomerDto {

    private Long CustomerID;
    private String CustomerName;
    private boolean IsSubscribedToNewsletter;
    private Date Birthdate;
    private Date CreatedDate;
    private Date ModifiedDate;

}
