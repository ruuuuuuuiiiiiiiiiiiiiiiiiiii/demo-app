package com.example.demo_sm.service;

import com.example.demo_sm.dto.GenreDto;

import java.util.List;

public interface GenreService {

    GenreDto createGenre(GenreDto genreDto);

    GenreDto getGenreById(Long genreId);

    List<GenreDto> getAllGenres();

    GenreDto updateGenre(Long genreId, GenreDto genreDto);

    void deleteGenre(Long genreId);

}
