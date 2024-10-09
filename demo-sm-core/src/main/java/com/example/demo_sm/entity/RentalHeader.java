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
@Table(name = "rental_header")
public class RentalHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT")
    private Long RentalId;

    @Column(columnDefinition = "DATE")
    private Date DateRented;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer Customer;

    @Column(columnDefinition = "DATETIME")
    private Date CreatedDate;

    @Column(columnDefinition = "DATETIME")
    private Date ModifiedDate;

    @OneToOne(mappedBy = "RentalHeader", cascade = CascadeType.ALL)
    private RentalDetail rentalDetail;

}
