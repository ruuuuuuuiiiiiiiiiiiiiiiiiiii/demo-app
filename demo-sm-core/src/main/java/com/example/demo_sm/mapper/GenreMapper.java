package com.example.demo_sm.mapper;

import com.example.demo_sm.dto.GenreDto;
import com.example.demo_sm.entity.Genre;

public class GenreMapper {

    public static GenreDto mapToGenreDto(Genre genre) {
        return new GenreDto(
                genre.getGenreID(),
                genre.getGenreName(),
                genre.getCreatedDate(),
                genre.getModifiedDate()
        );
    }

    public static Genre mapToGenre(GenreDto genreDto) {
        return new Genre(
                genreDto.getGenreID(),
                genreDto.getGenreName(),
                genreDto.getCreatedDate(),
                genreDto.getModifiedDate()
        );
    }

}
