package com.example.demo_sm.service.impl;

import com.example.demo_sm.dto.MovieDto;
import com.example.demo_sm.entity.Genre;
import com.example.demo_sm.entity.Movie;
import com.example.demo_sm.exception.ResourceNotFoundException;
import com.example.demo_sm.mapper.MovieMapper;
import com.example.demo_sm.repository.GenreRepository;
import com.example.demo_sm.repository.MovieRepository;
import com.example.demo_sm.service.MovieService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MovieServiceImpl implements MovieService {

    private MovieRepository movieRepository;

    private GenreRepository genreRepository;

    @Override
    public MovieDto createEmployee(MovieDto movieDto) {

        Movie movie = MovieMapper.mapToMovie(movieDto);

        Genre genre = genreRepository.findById(movieDto.getGenreID())
                .orElseThrow(() -> new ResourceNotFoundException("No genre exists with the id: " + movieDto.getGenreID()));

        movie.setGenre(genre);

        // set current datetime
        Date date = new Date();
        movie.setCreatedDate(date);
        movie.setModifiedDate(date);

        movie.setMovieName(movieDto.getMovieName().toUpperCase());

        Movie savedMovie = movieRepository.save(movie);

        return MovieMapper.mapToMovieDto(savedMovie);
    }

    @Override
    public MovieDto getMovieById(Long movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("No movie exists with the id: " + movieId));

        return MovieMapper.mapToMovieDto(movie);

    }

    @Override
    public List<MovieDto> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();

        return movies.stream().map(MovieMapper::mapToMovieDto)
                .collect(Collectors.toList());
    }

    @Override
    public MovieDto updateMovie(Long movieId, MovieDto updateMovie) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("No movie exists with the id: " + movieId));

        movie.setMovieName(updateMovie.getMovieName().toUpperCase());

        Genre genre = genreRepository.findById(updateMovie.getGenreID())
                .orElseThrow(() -> new ResourceNotFoundException("No genre exists with the id: " + updateMovie.getGenreID()));

        movie.setGenre(genre);

        movie.setDateAdded(updateMovie.getDateAdded());
        movie.setReleaseDate(updateMovie.getReleaseDate());
        movie.setNumberInStock(updateMovie.getNumberInStock());
        movie.setNumberAvailable(updateMovie.getNumberAvailable());

        // set current datetime on ModifiedDate
        Date date = new Date();
        movie.setModifiedDate(date);

        Movie updateMovieObj = movieRepository.save(movie);

        return MovieMapper.mapToMovieDto(updateMovieObj);
    }

    @Override
    public void deleteMovie(Long movieId) {

        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("No movie exists with the id: " + movieId)
                );

        movieRepository.deleteById(movieId);
    }
}
