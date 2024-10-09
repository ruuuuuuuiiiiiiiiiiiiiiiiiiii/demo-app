package com.example.demo_sm.service.impl;

import com.example.demo_sm.dto.RentalDto;
import com.example.demo_sm.dto.RentalProjection;
import com.example.demo_sm.entity.Customer;
import com.example.demo_sm.entity.Movie;
import com.example.demo_sm.entity.RentalDetail;
import com.example.demo_sm.entity.RentalHeader;
import com.example.demo_sm.exception.ResourceNotFoundException;
import com.example.demo_sm.mapper.RentalMapper;
import com.example.demo_sm.repository.CustomerRepository;
import com.example.demo_sm.repository.MovieRepository;
import com.example.demo_sm.repository.RentalDetailRepository;
import com.example.demo_sm.repository.RentalHeaderRepository;
import com.example.demo_sm.service.RentalService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RentalServiceImpl implements RentalService {

    private RentalHeaderRepository rentalHeaderRepository;
    private RentalDetailRepository rentalDetailRepository;
    private MovieRepository movieRepository;
    private CustomerRepository customerRepository;

    @Override
    public RentalDto createRental(RentalDto rentalDto) {
        // RentalHeader
        RentalHeader rentalHeader = RentalMapper.mapToRentalHeader(rentalDto);

        Customer customer = customerRepository.findById(rentalDto.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("No customer exists with the id: " + rentalDto.getCustomerId()));

        rentalHeader.setCustomer(customer);

        rentalHeader.setDateRented(rentalDto.getDateRented());

        // set current datetime
        Date date = new Date();
        rentalHeader.setCreatedDate(date);
        rentalHeader.setModifiedDate(date);

        // RentalDetail
        RentalDetail rentalDetail = RentalMapper.mapToRentalDetail(rentalDto);

        rentalDetail.setRentalHeader(rentalHeader);

        Movie movie = movieRepository.findById(rentalDto.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("No movie exists with the id: " + rentalDto.getMovieId()));

        rentalDetail.setMovie(movie);

        // movie count minus (to be implemented)
        if(movie.getNumberAvailable() != 0){
            movie.setNumberAvailable(movie.getNumberAvailable()-1);
            movie.setModifiedDate(date);

            movieRepository.save(movie);
        } else {
            throw new ResourceNotFoundException("No available movie stock with the id: " + rentalDto.getMovieId());
        }


        RentalHeader savedRentalHeader = rentalHeaderRepository.save(rentalHeader);
        RentalDetail savedRentalDetail = rentalDetailRepository.save(rentalDetail);

        return RentalMapper.mapToRentalDto(savedRentalHeader, savedRentalDetail);
    }

    @Override
    public RentalDto getRentalById(Long rentalId) {
        RentalHeader rentalHeader = rentalHeaderRepository.findById(rentalId)
                .orElseThrow(() -> new ResourceNotFoundException("No rental exists with the rental id: " + rentalId));

        RentalDetail rentalDetailChecker = rentalDetailRepository.findByRentalId(rentalId);

        RentalDetail rentalDetail = rentalDetailRepository.findById(rentalDetailChecker.getRentalDetailId())
                .orElseThrow(() -> new ResourceNotFoundException("No rental exists with the rental detail id: " + rentalDetailChecker.getRentalDetailId()));


        return RentalMapper.mapToRentalDto(rentalHeader, rentalDetail);
    }

    @Override
    public List<RentalDto> getRentalByCustomerName(String customerName) {

        List<RentalProjection> rentalsByName = rentalHeaderRepository.findRentalByCustomerName(customerName);

        return rentalsByName.stream().map(RentalMapper::mapToRentalDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RentalDto> getAllRental() {

        List<RentalHeader> rentalHeaders = rentalHeaderRepository.findAll();
        List<RentalDetail> rentalDetails = rentalDetailRepository.findAll();

        return rentalHeaders.stream()
                .flatMap((rentalHeader) -> rentalDetails.stream()
                        .filter((rentalDetail) -> rentalDetail.getRentalHeader().getRentalId().equals(rentalHeader.getRentalId()))
                        .map((rentalDetail) -> RentalMapper.mapToRentalDto(rentalHeader, rentalDetail)))
                .collect(Collectors.toList());
    }

    @Override
    public RentalDto updateRental(Long rentalId, RentalDto updatedRental) {

        RentalHeader rentalHeader = rentalHeaderRepository.findById(rentalId)
                .orElseThrow(() -> new ResourceNotFoundException("No rental exists with the rental id: " + rentalId));

        RentalDetail rentalDetailChecker = rentalDetailRepository.findByRentalId(rentalId);

        RentalDetail rentalDetail = rentalDetailRepository.findById(rentalDetailChecker.getRentalDetailId())
                .orElseThrow(() -> new ResourceNotFoundException("No rental exists with the rental detail id: " + rentalDetailChecker.getRentalDetailId()));

        // RentalHeader
        rentalHeader.setDateRented(updatedRental.getDateRented());

        Customer customer = customerRepository.findById(updatedRental.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("No customer exists with the id: " + updatedRental.getCustomerId()));

        rentalHeader.setCustomer(customer);

        // set current datetime on ModifiedDate
        Date date = new Date();
        rentalHeader.setModifiedDate(date);

        RentalHeader savedRentalHeader = rentalHeaderRepository.save(rentalHeader);

        // movie count minus or add based on action (to be implemented)
        if(updatedRental.getMovieId() != rentalDetail.getMovie().getMovieID()) {

            Movie oldMovie = movieRepository.findById(rentalDetail.getMovie().getMovieID())
                    .orElseThrow(() -> new ResourceNotFoundException("No movie exists with the id: " + rentalDetail.getMovie().getMovieID()));

            Movie newMovie = movieRepository.findById(updatedRental.getMovieId())
                    .orElseThrow(() -> new ResourceNotFoundException("No movie exists with the id: " + updatedRental.getMovieId()));

            if(newMovie.getNumberAvailable() != 0){
                newMovie.setNumberAvailable(newMovie.getNumberAvailable()-1);
                newMovie.setModifiedDate(date);

                movieRepository.save(newMovie);

                oldMovie.setNumberAvailable(oldMovie.getNumberAvailable()+1);
                oldMovie.setModifiedDate(date);

                movieRepository.save(oldMovie);
            } else {
                throw new ResourceNotFoundException("No available movie stock with the id: " + updatedRental.getMovieId());
            }
        }

        // RentalDetail
        rentalDetail.setRentalHeader(savedRentalHeader);

        Movie movie = movieRepository.findById(updatedRental.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("No movie exists with the id: " + updatedRental.getMovieId()));

        rentalDetail.setMovie(movie);

        rentalDetail.setDateReturned(updatedRental.getDateReturned());

        RentalDetail savedRentalDetail = rentalDetailRepository.save(rentalDetail);

        return RentalMapper.mapToRentalDto(savedRentalHeader, savedRentalDetail);
    }

    @Override
    public void deleteRental(Long rentalId) {

        RentalHeader rentalHeader = rentalHeaderRepository.findById(rentalId)
                .orElseThrow(() -> new ResourceNotFoundException("No rental exists with the rental id: " + rentalId));

        RentalDetail rentalDetailChecker = rentalDetailRepository.findByRentalId(rentalId);

        RentalDetail rentalDetail = rentalDetailRepository.findById(rentalDetailChecker.getRentalDetailId())
                .orElseThrow(() -> new ResourceNotFoundException("No rental exists with the rental detail id: " + rentalDetailChecker.getRentalDetailId()));

        // movie count minus (to be implemented)
        Movie movie = movieRepository.findById(rentalDetail.getMovie().getMovieID())
                .orElseThrow(() -> new ResourceNotFoundException("No movie exists with the id: " + rentalDetail.getMovie().getMovieID()));

        movie.setNumberAvailable(movie.getNumberAvailable()+1);
        Date date = new Date();
        movie.setModifiedDate(date);

        movieRepository.save(movie);

        rentalHeaderRepository.deleteById(rentalId);
        rentalHeaderRepository.deleteById(rentalDetail.getRentalDetailId());
    }
}
