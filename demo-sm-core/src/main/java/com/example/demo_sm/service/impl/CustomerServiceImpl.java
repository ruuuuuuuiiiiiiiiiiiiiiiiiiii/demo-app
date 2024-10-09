package com.example.demo_sm.service.impl;

import com.example.demo_sm.dto.CustomerDto;
import com.example.demo_sm.entity.Customer;
import com.example.demo_sm.exception.ResourceNotFoundException;
import com.example.demo_sm.mapper.CustomerMapper;
import com.example.demo_sm.repository.CustomerRepository;
import com.example.demo_sm.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private CustomerRepository customerRepository;

    @Override
    public CustomerDto createCustomer(CustomerDto customerDto) {

        Customer customer = CustomerMapper.mapToCustomer(customerDto);

        // set current datetime
        Date date = new Date();
        customer.setCreatedDate(date);
        customer.setModifiedDate(date);

        // Birthday Logic for Customer should be 13 years and up
        LocalDate currentDate = LocalDate.now();
        LocalDate specificDate = LocalDate.ofInstant(customerDto.getBirthdate().toInstant(), ZoneId.systemDefault());

        long customerAgeChecker = ChronoUnit.YEARS.between(specificDate, currentDate);

        if(customerAgeChecker < 13){
            throw new ResourceNotFoundException("Customer should be 13 years and up!");
        }

        customer.setCustomerName(customerDto.getCustomerName().toUpperCase());

        Customer savedCustomer = customerRepository.save(customer);

        return CustomerMapper.mapToCustomerDto(savedCustomer);
    }

    @Override
    public CustomerDto getCustomerById(Long customerId) {

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("No genre exists with the id: " + customerId));

        return CustomerMapper.mapToCustomerDto(customer);
    }

    @Override
    public List<CustomerDto> getAllCustomers() {

        List<Customer> customers = customerRepository.findAll();

        return customers.stream().map(CustomerMapper::mapToCustomerDto)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDto updateEmployee(Long customerId, CustomerDto updatedCustomer) {

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("No genre exists with the id: " + customerId));

        customer.setCustomerName(updatedCustomer.getCustomerName().toUpperCase());
        customer.setIsSubscribedToNewsletter(updatedCustomer.isIsSubscribedToNewsletter());

        // Birthday Logic for Customer should be 13 years and up
        LocalDate currentDate = LocalDate.now();
        LocalDate specificDate = LocalDate.ofInstant(updatedCustomer.getBirthdate().toInstant(), ZoneId.systemDefault());

        long customerAgeChecker = ChronoUnit.YEARS.between(specificDate, currentDate);

        if(customerAgeChecker < 13){
            throw new ResourceNotFoundException("Customer should be 13 years and up!");
        } else {
            customer.setBirthdate(updatedCustomer.getBirthdate());
        }

        // set current datetime on ModifiedDate
        Date date = new Date();
        customer.setModifiedDate(date);

        Customer updateCustomerObj = customerRepository.save(customer);

        return CustomerMapper.mapToCustomerDto(updateCustomerObj);
    }

    @Override
    public void deleteCustomer(Long customerId) {

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("No genre exists with the id: " + customerId));

        customerRepository.deleteById(customerId);

    }
}
