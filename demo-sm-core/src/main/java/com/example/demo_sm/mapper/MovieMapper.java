package com.example.demo_sm.mapper;

import com.example.demo_sm.dto.MovieDto;
import com.example.demo_sm.entity.Movie;

public class MovieMapper {

    public static MovieDto mapToMovieDto(Movie movie){
        return new MovieDto(
                movie.getMovieID(),
                movie.getMovieName(),
                movie.getGenre().getGenreID(),
                movie.getDateAdded(),
                movie.getReleaseDate(),
                movie.getNumberInStock(),
                movie.getNumberAvailable(),
                movie.getCreatedDate(),
                movie.getModifiedDate()
        );
    }

    public static Movie mapToMovie(MovieDto movieDto){
        Movie movie = new Movie();

        movie.setMovieID(movieDto.getMovieID());
        movie.setMovieName(movieDto.getMovieName());
        movie.setDateAdded(movieDto.getDateAdded());
        movie.setReleaseDate(movieDto.getReleaseDate());
        movie.setNumberInStock(movieDto.getNumberInStock());
        movie.setNumberAvailable(movieDto.getNumberAvailable());
        movie.setCreatedDate(movieDto.getCreatedDate());
        movie.setModifiedDate(movieDto.getModifiedDate());

        return movie;

    }
}
