package com.example.demo_sm.controller;

import com.example.demo_sm.dto.MovieDto;
import com.example.demo_sm.service.MovieService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private MovieService movieService;

    @PostMapping
    public ResponseEntity<MovieDto> createMovie(@RequestBody MovieDto movieDto) {
        MovieDto savedMovie = movieService.createEmployee(movieDto);

        return new ResponseEntity<>(savedMovie, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<MovieDto> getMovieById(@PathVariable("id") Long movieId) {
        MovieDto movieDto = movieService.getMovieById(movieId);

        return ResponseEntity.ok(movieDto);
    }

    @GetMapping
    public ResponseEntity<List<MovieDto>> getAllMovie() {
        List<MovieDto> movies = movieService.getAllMovies();

        return ResponseEntity.ok(movies);
    }

    @PutMapping("{id}")
    public ResponseEntity<MovieDto> updateMovie(@PathVariable("id") Long movieId,
                                                   @RequestBody MovieDto updatedMovie) {
        MovieDto movieDto = movieService.updateMovie(movieId, updatedMovie);

        return ResponseEntity.ok(movieDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable("id") Long movieId) {
        movieService.deleteMovie(movieId);

        return ResponseEntity.ok("Movie deleted successfully!");
    }

}
