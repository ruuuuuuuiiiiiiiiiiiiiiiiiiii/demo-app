package com.example.demo_sm.mapper;

import com.example.demo_sm.dto.CustomerDto;
import com.example.demo_sm.entity.Customer;


public class CustomerMapper {

    public static CustomerDto mapToCustomerDto(Customer customer){
        return new CustomerDto(
            customer.getCustomerID(),
            customer.getCustomerName(),
            customer.isIsSubscribedToNewsletter(),
            customer.getBirthdate(),
            customer.getCreatedDate(),
            customer.getModifiedDate()
        );
    }

    public static Customer mapToCustomer(CustomerDto customerDto){
        Customer customer = new Customer();

        customer.setCustomerID(customerDto.getCustomerID());
        customer.setCustomerName(customerDto.getCustomerName());
        customer.setIsSubscribedToNewsletter(customerDto.isIsSubscribedToNewsletter());
        customer.setBirthdate(customerDto.getBirthdate());
        customer.setCreatedDate(customerDto.getCreatedDate());
        customer.setModifiedDate(customerDto.getModifiedDate());

        return customer;
    }

}
