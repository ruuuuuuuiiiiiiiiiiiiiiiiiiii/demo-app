package com.example.demo_sm.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT")
    private Long CustomerID;

    @Column(columnDefinition = "VARCHAR(100)")
    private String CustomerName;

    @Column(columnDefinition = "BIT")
    private boolean IsSubscribedToNewsletter;

    @Column(columnDefinition = "DATE")
    private Date Birthdate;

    @Column(columnDefinition = "DATETIME")
    private Date CreatedDate;

    @Column(columnDefinition = "DATETIME")
    private Date ModifiedDate;


}
