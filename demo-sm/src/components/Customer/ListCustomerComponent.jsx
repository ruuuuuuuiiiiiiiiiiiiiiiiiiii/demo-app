import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCustomer, listCustomers } from '../../api/CustomerApi';
import { getGenreById, listGenres } from '../../api/GenreApi';
import moment from 'moment';

const ListCustomerComponent = () => {

    const [customers, setCustomers] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllCustomers();
    }, []);

    const getAllCustomers = () => {
        listCustomers()
            .then((response) => {
                setCustomers(response.data);
            }).catch(error => {
                console.error(error);
        })
    }

    const updateCustomer = (id) => {
        navigator(`/edit-customer/${id}`);
    }

    const removeCustomer = (id) => {
        console.log(id);

        deleteCustomer(id).then((response) => {
            console.log(response.data);
            getAllCustomers();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='container'>

            <h2 className='text-center'>List of Customers</h2>
            <button 
                className="rounded-md bg-secondary-500 px-3 py-2 hover:bg-primary-500 hover:text-white" 
                onClick={() => {navigator('/add-customer');}}
            >
                Add Customer
            </button>
            <div className='mt-2'>
                <table className="table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className='pr-3'>Customer ID</th>
                            <th className='pr-3'>Customer Name</th>
                            <th className='pr-3'>Customer Newsletter Subscription</th>
                            <th className='pr-3'>Customer BirthDate</th>
                            <th className='pr-3'>Customer Created Date</th>
                            <th className='pr-3'>Customer Modified Date</th>
                            <th className='pr-3 pl-14'>Actions</th>
                        </tr>
                    </thead>
                    <thead>
                        {
                            
                            customers.map(customer => 
                                <tr key={customer.customerID}>
                                    <td>{customer.customerID}</td>
                                    <td>{customer.customerName}</td>
                                    <td>{customer.isSubscribedToNewsletter ? "YES" : "NO"}</td>
                                    <td>{moment(customer.birthdate).format("YYYY-MM-DD")}</td>
                                    <td>{moment(customer.createdDate).format("YYYY-MM-DD")}</td>
                                    <td>{moment(customer.modifiedDate).format("YYYY-MM-DD")}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateCustomer(customer.customerID)} >Update</button>
                                        <button className='btn btn-danger' onClick={() => removeCustomer(customer.customerID)} style={{marginLeft: '10px'}}>Delete</button>
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

export default ListCustomerComponent