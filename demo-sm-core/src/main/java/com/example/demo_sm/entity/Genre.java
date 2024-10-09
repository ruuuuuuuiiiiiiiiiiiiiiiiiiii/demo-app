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
@Table(name = "genre")
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT")
    private Long GenreID;

    @Column(columnDefinition = "VARCHAR(50)")
    private String GenreName;

    @Column(columnDefinition = "DATETIME")
    private Date CreatedDate;

    @Column(columnDefinition = "DATETIME")
    private Date ModifiedDate;
}
