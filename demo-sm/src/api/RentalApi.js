import APIService from "../services/APIService";

const BASE_URL = '/rentals';

export const listRentals = () => {
    return APIService().get(BASE_URL);
}

export const listRentalsByCustomerName = (customerName) => {
    return APIService().get(BASE_URL+ "/customer/" + customerName);
}

export const createRental = (rental) => {
    return APIService().post(BASE_URL, rental);
}

export const getRentalById = (rentalId) => {
    return APIService().get(BASE_URL + "/" + rentalId);
}

export const updateRentalById = (rentalId, rental) => {
    return APIService().put(BASE_URL + "/" + rentalId, rental);
}

export const deleteRental = (rentalId) => {
    return APIService().delete(BASE_URL + "/" + rentalId);
}