import APIService from "../services/APIService";

const BASE_URL = '/customers';

export const listCustomers = () => {
    return APIService().get(BASE_URL);
}

export const createCustomer = (customer) => {
    return APIService().post(BASE_URL, customer);
}

export const getCustomerById = (customerId) => {
    return APIService().get(BASE_URL + "/" + customerId);
}

export const updateCustomerById = (customerId, customer) => {
    return APIService().put(BASE_URL + "/" + customerId, customer);
}

export const deleteCustomer = (customerId) => {
    return APIService().delete(BASE_URL + "/" + customerId);
}