import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createCustomer, getCustomerById, updateCustomerById } from '../../api/CustomerApi';

import moment from 'moment';

const CustomerComponent = () => {
    const [customerName, setCustomerName] = useState("");
    const [isSubscribedToNewsletter, setIsSubscribedToNewsletter] = useState(false);
    const [birthdate, setBirtdate] = useState("");

    const [errors, setErrors] = useState({
        customerName: '',
        isSubscribedToNewsletter: '',
        birthdate: ''
    });
    const {id} = useParams();
    const navigator = useNavigate();
  
    useEffect(() => {
      if (id) {
        getCustomerById(id).then((response) => {
            setCustomerName(response.data.customerName);
            setIsSubscribedToNewsletter(response.data.isSubscribedToNewsletter);
            setBirtdate(moment(response.data.birthdate).format("YYYY-MM-DD"));
        }).catch(error => {
          console.error(error);
        })
  
      }
    }, [id])
  
    const saveOrUpdateCustomer = (e) =>{
      e.preventDefault();
  
      if (validateForm()) {
        const customer = { 
          customerName, 
          isSubscribedToNewsletter, 
          birthdate
        }
  
        if (id) {
          updateCustomerById(id, customer)
            .then((response) => {
              console.log(response.data);
              navigator("/customers")
            }).catch(error => {
              console.error(error);
              alert("Something went wrong!");
              navigator("/customers")
            })
        } else {
          createCustomer(customer)
            .then((response) => {
              console.log(response.data);
              navigator("/customers")
            }).catch(error => {
              console.error(error);
              alert("Something went wrong!");
              navigator("/customers")
            })
        }
      }
    }
  
    const validateForm = () => {
      let valid = true;
  
      const errorsCopy = {... errors}

      let ageLimitDate = moment().subtract(13, 'years').format("YYYY-MM-DD");
      let formattedBirthdate = moment(birthdate).format("YYYY-MM-DD");

      if (!birthdate.trim()){
        errorsCopy.birthdate = "Birthdate is required"
        valid = false;
      } else if (formattedBirthdate > ageLimitDate) {
        errorsCopy.birthdate = "Customer should be 13 years and up!";
        valid = false;
      } else {
        errorsCopy.birthdate = '';
      }
  
      if (customerName.trim()){
        errorsCopy.customerName = '';
      } else {
        errorsCopy.customerName = "Name is required"
        valid = false;
      }

      setErrors(errorsCopy)
  
      return valid;
    }
  
    const pageTitle = () => {
      if (id){
        return <h2 className="card-title text-center">Update Customer</h2>
      } else {
        return <h2 className="card-title text-center">Add Customer</h2>
      }
    }

    const handleChange = (event) => {
      setIsSubscribedToNewsletter(event.target.checked);
    }
  
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3 mt-3'>
              { pageTitle() }
              <div className='card-body'>
                <form>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Name:</label>
                    <input
                      disabled={id}
                      type='text'
                      placeholder='Enter Customer Name'
                      name='customerName'
                      value={customerName}
                      className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
                      onChange={(e) => { setCustomerName(e.target.value); validateForm(); }}
                    >
                    </input>
                    { errors.customerName && <div className='invalid-feedback'> {errors.customerName} </div> }
                  </div>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Newsletter Subscription: </label>
                    <input
                      className='ml-10'
                      type='checkbox'
                      placeholder='Enter Newsletter Subscription'
                      name='Newsletter Subscription'
                      checked={isSubscribedToNewsletter}
                      onChange={(e) => { handleChange(e) }}
                    >
                    </input>
                  </div>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Birthdate:</label>
                    <input
                      disabled={id}
                      type='date'
                      placeholder='Enter Birthdate'
                      name='birthdate'
                      value={birthdate}
                      className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}
                      onChange={(e) => { setBirtdate(moment(e.target.value).format("YYYY-MM-DD")); validateForm(); }}
                    >
                    </input>
                    { errors.birthdate && <div className='invalid-feedback'> {errors.birthdate} </div> }
                  </div>
                  <button className='btn btn-success mb-2 mt-2' onClick={saveOrUpdateCustomer}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CustomerComponent