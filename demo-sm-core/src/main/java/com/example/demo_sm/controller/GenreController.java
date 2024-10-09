package com.example.demo_sm.controller;

import com.example.demo_sm.dto.GenreDto;
import com.example.demo_sm.service.GenreService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/genres")
public class GenreController {

    private GenreService genreService;

    @PostMapping
    public ResponseEntity<GenreDto> createGenre(@RequestBody GenreDto genreDto) {
        GenreDto savedGenre = genreService.createGenre(genreDto);

        return new ResponseEntity<>(savedGenre, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<GenreDto> getGenreById(@PathVariable("id") Long genreId) {
        GenreDto genreDto = genreService.getGenreById(genreId);

        return ResponseEntity.ok(genreDto);
    }

    @GetMapping
    public ResponseEntity<List<GenreDto>> getAllGenres() {
        List<GenreDto> genres = genreService.getAllGenres();

        return ResponseEntity.ok(genres);
    }

    @PutMapping("{id}")
    public ResponseEntity<GenreDto> updateGenre(@PathVariable("id") Long genreId,
                                                @RequestBody GenreDto updatedGenre) {
        GenreDto genreDto = genreService.updateGenre(genreId, updatedGenre);

        return ResponseEntity.ok(genreDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteGenre(@PathVariable("id") Long genreId) {
        genreService.deleteGenre(genreId);

        return ResponseEntity.ok("Genre deleted successfully!");
    }
}
