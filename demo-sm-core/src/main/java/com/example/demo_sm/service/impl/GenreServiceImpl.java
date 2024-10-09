package com.example.demo_sm.service.impl;

import com.example.demo_sm.dto.GenreDto;
import com.example.demo_sm.entity.Genre;
import com.example.demo_sm.exception.ResourceNotFoundException;
import com.example.demo_sm.mapper.GenreMapper;
import com.example.demo_sm.repository.GenreRepository;
import com.example.demo_sm.service.GenreService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GenreServiceImpl implements GenreService {

    private GenreRepository genreRepository;

    @Override
    public GenreDto createGenre(GenreDto genreDto) {
        Genre genre = GenreMapper.mapToGenre(genreDto);

        // set current datetime
        Date date = new Date();
        genre.setCreatedDate(date);
        genre.setModifiedDate(date);
        genre.setGenreName(genreDto.getGenreName().toUpperCase());

        Genre savedGenre = genreRepository.save(genre);

        return GenreMapper.mapToGenreDto(savedGenre);
    }

    @Override
    public GenreDto getGenreById(Long genreId) {
        Genre genre = genreRepository.findById(genreId)
                .orElseThrow(() -> new ResourceNotFoundException("No genre exists with the id: " + genreId)
                );

        return GenreMapper.mapToGenreDto(genre);
    }

    @Override
    public List<GenreDto> getAllGenres() {
        List<Genre> genres = genreRepository.findAll();

        return genres.stream().map(GenreMapper::mapToGenreDto)
                .collect(Collectors.toList());
    }

    @Override
    public GenreDto updateGenre(Long genreId, GenreDto genreDto) {
        Genre genre = genreRepository.findById(genreId)
                .orElseThrow(() -> new ResourceNotFoundException("No genre exists with the id: " + genreId)
                );

        genre.setGenreName(genreDto.getGenreName().toUpperCase());

        // set current datetime on ModifiedDate
        Date date = new Date();
        genre.setModifiedDate(date);

        Genre updatedGenreObj = genreRepository.save(genre);

        return GenreMapper.mapToGenreDto(updatedGenreObj);
    }

    @Override
    public void deleteGenre(Long genreId) {
        Genre genre = genreRepository.findById(genreId)
                .orElseThrow(() -> new ResourceNotFoundException("No genre exists with the id: " + genreId)
        );

        genreRepository.deleteById(genreId);
    }
}
