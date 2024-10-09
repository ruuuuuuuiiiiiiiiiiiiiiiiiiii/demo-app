package com.example.demo_sm.service;

import com.example.demo_sm.dto.CustomerDto;

import java.util.List;

public interface CustomerService {

    CustomerDto createCustomer(CustomerDto customerDto);

    CustomerDto getCustomerById(Long customerId);

    List<CustomerDto> getAllCustomers();

    CustomerDto updateEmployee(Long customerId, CustomerDto updatedCustomer);

    void deleteCustomer(Long customerId);

}
