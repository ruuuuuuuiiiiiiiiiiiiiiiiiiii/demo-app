import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createRental, getRentalById, updateRentalById } from '../../api/RentalApi';
import { listCustomers } from '../../api/CustomerApi';
import { listMovies } from '../../api/MovieApi';

import moment from 'moment';

const MovieComponent = () => {
    const [movieId, setMovieId] = useState(0);
    const [movies, setMovies] = useState([]);
    const [customerId, setCustomerId] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [dateRented, setDateRented] = useState(moment().format("YYYY-MM-DD"));
    const [dateReturned, setDateReturned] = useState("");
    

    const [errors, setErrors] = useState({
        movieId: '',
        customerId: '',
        dateRented: '',
        dateReturned: '',
    });
    const {id} = useParams();
    const navigator = useNavigate();
  
    useEffect(() => {

      if (id) {
        getRentalById(id).then((response) => {
            setMovieId(response.data.movieId);
            setCustomerId(response.data.customerId);
            setDateRented(moment(response.data.dateRented).format("YYYY-MM-DD"));
            setDateReturned(response.data.dateReturned ? moment(response.data.dateReturned).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"));
        }).catch(error => {
          console.error(error);
        })
  
      }
    }, [id])

    useEffect(() => {
      getAllMovies();
      getAllCustomer();
    }, [])
  
    const saveOrUpdateMovie = (e) =>{
      e.preventDefault();
  
      if (validateForm()) {
        if (id) {}
        const rental = { 
          movieId,
          customerId,
          dateRented,
          dateReturned
        }
  
        if (id) {
          if (movieId !== 0 || customerId !== 0) {
            updateRentalById(id, rental)
              .then((response) => {
                console.log(response.data);
                navigator("/rentals")
              }).catch(error => {
                console.error(error);
                alert("Something went wrong!");
                navigator("/rentals")
              })
          }
        } else {
          if (movieId !== 0 || customerId !== 0) {
            createRental(rental)
              .then((response) => {
                console.log(response.data);
                navigator("/rentals")
              }).catch(error => {
                console.error(error);
                alert("Something went wrong!");
                navigator("/rentals")
              })
          }
        }
      }
    }
  
    const validateForm = () => {
      let valid = true;
  
      const errorsCopy = {... errors}
  
      if (movieId === 0){
        errorsCopy.movieId = "Movie is required"
        valid = false;
      } else {
        errorsCopy.movieId = '';
      }

      if (customerId === 0){
        errorsCopy.customerId = "Customer is required"
        valid = false;
      } else {
        errorsCopy.customerId = '';
      }

      console.log(dateReturned)
      if (!dateRented){
        errorsCopy.dateRented = "Date Rented is required"
        valid = false;
      } else {
        errorsCopy.dateRented = '';
      }

      if (id) {
        if (!dateReturned){
          errorsCopy.dateReturned = "Date Returned is required"
          valid = false;
        } else {
          errorsCopy.dateReturned = '';
        }
      }
  
      setErrors(errorsCopy)
  
      return valid;
    }
  
    const pageTitle = () => {
      if (id){
        return <h2 className="card-title text-center">Update Rental</h2>
      } else {
        return <h2 className="card-title text-center">Add Rental</h2>
      }
    }

    const handleChangeMovie = (event) => {
      setMovieId(event.target.value);
    }

    const handleChangeCustomer = (event) => {
      setCustomerId(event.target.value);
    }

    const getAllMovies = async () => {
      await listMovies()
          .then((response) => {
              // new config: display all movies with remaining quantity
              let data = response.data;

              let availableData = data.filter((val) => val.numberAvailable !== 0);

              const availableMovies = availableData.map(movie => movie)

              setMovies(availableMovies);

              // initial config: display all movies even not available movie
              // setMovies(response.data);
          }).catch(error => {
              console.error(error);
      })
    }

    const getAllCustomer = async () => {
      await listCustomers()
          .then((response) => {
              setCustomers(response.data);
          }).catch(error => {
              console.error(error);
      })
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
                    <label className='form-label'>Movie: </label>
                    <select
                      name="Movie"
                      label="Movie"
                      value={movieId}
                      onChange={(e) => { handleChangeMovie(e) }}
                      className={`form-select ${errors.movieId ? 'is-invalid' : ''}`}
                    >
                      <option value={0}>{"Please Select Movie"}</option>
                      {movies.map(
                        (movie) => {
                          return (
                            <option key={movie.movieID} value={movie.movieID}>{movie.movieName}</option>
                          );
                        }
                      )}
                    </select>
                    { errors.movieId && <div className='invalid-feedback'> {errors.movieId} </div> }
                  </div>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Customer: </label>
                    <select
                      name="Customer"
                      label="Customer"
                      value={customerId}
                      onChange={(e) => { handleChangeCustomer(e) }}
                      className={`form-select ${errors.customerId ? 'is-invalid' : ''}`}
                    >
                      <option value={0}>{"Please Select Customer"}</option>
                      {customers.map(
                        (customer) => {
                          return (
                            <option key={customer.customerID} value={customer.customerID}>{customer.customerName}</option>
                          );
                        }
                      )}
                    </select>
                    { errors.customerId && <div className='invalid-feedback'> {errors.customerId} </div> }
                  </div>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Date Rented:</label>
                    <input
                      disabled={id}
                      type='date'
                      placeholder='Enter Date Rented'
                      name='dateRented'
                      value={dateRented}
                      className={`form-control ${errors.dateRented ? 'is-invalid' : ''}`}
                      onChange={(e) => { setDateRented(moment(e.target.value).format("YYYY-MM-DD")); validateForm(); }}
                    >
                    </input>
                    { errors.dateRented && <div className='invalid-feedback'> {errors.dateRented} </div> }
                  </div>
                  { id && 
                    <div className='form-group mb-2'>
                    <label className='form-label'>Date Returned:</label>
                    <input
                      type='date'
                      placeholder='Enter Returned Date'
                      name='dateReturned'
                      value={dateReturned}
                      className={`form-control ${errors.dateReturned ? 'is-invalid' : ''}`}
                      onChange={(e) => { setDateReturned(moment(e.target.value).format("YYYY-MM-DD")); validateForm(); }}
                    >
                    </input>
                    { errors.dateReturned && <div className='invalid-feedback'> {errors.dateReturned} </div> }
                    </div>
                  }
                  
                  <button className='btn btn-success mb-2 mt-2' onClick={saveOrUpdateMovie}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default MovieComponent