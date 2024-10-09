package com.example.demo_sm.service;

import com.example.demo_sm.dto.MovieDto;

import java.util.List;

public interface MovieService {

    MovieDto createEmployee(MovieDto movieDto);

    MovieDto getMovieById(Long movieId);

    List<MovieDto> getAllMovies();

    MovieDto updateMovie(Long movieId, MovieDto updateMovie);

    void deleteMovie(Long MovieId);

}
