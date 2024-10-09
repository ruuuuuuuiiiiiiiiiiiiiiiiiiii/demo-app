import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteRental, listRentals, listRentalsByCustomerName } from '../../api/RentalApi';
import { listCustomers } from '../../api/CustomerApi';
import { listMovies } from '../../api/MovieApi';
import { getGenreById } from '../../api/GenreApi';
import moment from 'moment';

const ListRentalComponent = () => {

    const [rentals, setRentals] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [movies, setMovies] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllRentals();
        getAllCustomers();
        getAllMovies();
    }, []);

    const getAllRentals = () => {
        listRentals()
            .then((response) => {
                setRentals(response.data);
            }).catch(error => {
                console.error(error);
        })
    }

    const getAllCustomers = async () => {
        await listCustomers()
            .then((response) => {
                setCustomers(response.data);
            }).catch(error => {
                console.error(error);
        })
    }

    const getAllMovies = async () => {
        await listMovies()
            .then((response) => {
                setMovies(response.data);
            }).catch(error => {
                console.error(error);
        })
    }

    const getMovieName = (id) => {
        return movies.find((movie) => movie.movieID === id).movieName;
    }

    const getCustomerName = (id) => {
        return customers.find((customer) => customer.customerID === id).customerName;
    }

    const updateRental = (id) => {
        navigator(`/edit-rental/${id}`);
    }

    const removeRental = (id) => {
        console.log(id);

        deleteRental(id).then((response) => {
            console.log(response.data);
            getAllRentals();
        }).catch(error => {
            console.error(error);
        })
    }

    const handleOnChangeCustomer = (e) => {
        setCustomerName(e.target.value);
        if(e.target.value !== "Please Select Customer") {
            listRentalsByCustomerName(e.target.value)
                .then((response) => {
                    const data = response.data;

                    data.map(async (val) => {
                        if (val.genreID) {
                            getGenreById(val.genreID).then((response) => {
                                val.genreName = response.data.genreName;
                            }).catch(error => {
                            console.error(error);
                            })
                    
                        }
                    })
                    setRentals(data);
                }).catch(error => {
                    console.error(error);
            })
        } else {
            listRentals()
                .then((response) => {
                    const data = response.data;

                    data.map(async (val) => {
                        if (val.genreID) {
                            getGenreById(val.genreID).then((response) => {
                                val.genreName = response.data.genreName;
                            }).catch(error => {
                            console.error(error);
                            })
                    
                        }
                    })
                    setRentals(data);
                }).catch(error => {
                    console.error(error);
            })
        }
    }

    return (
        <div className='container'>

            <h2 className='text-center'>List of Rentals</h2>
            <button 
                className="rounded-md bg-secondary-500 px-3 py-2 hover:bg-primary-500 hover:text-white" 
                onClick={() => {navigator('/add-rental');}}
            >
                Add Rental
            </button>

            <div className='form-group mb-2 mt-2'>
                <label className='form-label'>Customer: </label>
                <select
                    name="Customer"
                    label="Customer"
                    value={customerName}
                    onChange={(e) => { handleOnChangeCustomer(e); }}
                    // className="form-select"
                >
                    <option value={"Please Select Customer"}>Please Select Customer</option>
                    {customers.map(
                    (customer) => {
                        return (
                        <option key={customer.customerID} value={customer.customerName}>{customer.customerName}</option>
                        );
                    }
                    )}
                </select>
                {/* { errors.movieName && <div className='invalid-feedback'> {errors.movieName} </div> } */}
                </div>

            <div className='mt-2'>
                <table className="table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className='pr-3'>Rental ID</th>
                            {/* <th>Rental Detail Id</th> */}
                            <th className='pr-3'> Movie Name </th>
                            <th className='pr-3'> Customer Name </th>
                            <th className='pr-3'> Date Rented </th>
                            <th className='pr-3'> Date Returned </th>
                            <th className='pr-3'> Rental Created Date </th>
                            <th className='pr-3'> Rental Modified Date </th>
                            <th className='pr-3 pl-14'> Actions </th>
                        </tr>
                    </thead>
                    <thead>
                        {
                            
                            rentals.map(rental => 
                                <tr key={rental.rentalId}>
                                    <td>{rental.rentalId}</td>
                                    {/* <td>{rental.rentalDetailId}</td> */}
                                    <td>{getMovieName(rental.movieId)}</td>
                                    <td>{getCustomerName(rental.customerId)}</td>
                                    <td>{moment(rental.dateRented).format("YYYY-MM-DD")}</td>
                                    <td>{rental.dateReturned ? moment(rental.dateReturned).format("YYYY-MM-DD"): ""}</td>
                                    <td>{moment(rental.createdDate).format("YYYY-MM-DD")}</td>
                                    <td>{moment(rental.modifiedDate).format("YYYY-MM-DD")}</td>
                                    <td>
                                        <button className='btn btn-info' disabled={rental.dateReturned} onClick={() => updateRental(rental.rentalId)} >Update</button>
                                        <button className='btn btn-danger' onClick={() => removeRental(rental.rentalId)} style={{marginLeft: '10px'}}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default ListRentalComponent