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
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT")
    private Long MovieID;

    @Column(columnDefinition = "VARCHAR(100)")
    private String MovieName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GenreID")
    private Genre Genre;

    @Column(columnDefinition = "DATE")
    private Date DateAdded;

    @Column(columnDefinition = "DATE")
    private Date ReleaseDate;

    @Column(columnDefinition = "INT")
    private Long NumberInStock;

    @Column(columnDefinition = "INT")
    private Long NumberAvailable;

    @Column(columnDefinition = "DATETIME")
    private Date CreatedDate;

    @Column(columnDefinition = "DATETIME")
    private Date ModifiedDate;

}
