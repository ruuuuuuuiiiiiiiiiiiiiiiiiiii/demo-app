import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createMovie, getMovieById, updateMovieById } from '../../api/MovieApi';
import { listGenres } from '../../api/GenreApi';

import moment from 'moment';

const MovieComponent = () => {
    const [movieName, setMovieName] = useState("");
    const [genreID, setGenreID] = useState(0);
    const [genreList, setGenreList] = useState([]);
    const [dateAdded, setDateAdded] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [numberInStock, setNumberInStock] = useState(0);
    const [numberAvailable, setNumberAvailable] = useState(0);

    const [errors, setErrors] = useState({
        movieName: '',
        genreID: '',
        dateAdded: '',
        releaseDate: '',
        numberInStock: '',
        numberAvailable: ''
    });
    const {id} = useParams();
    const navigator = useNavigate();
  
    useEffect(() => {
      if (!genreList) {
        listGenres()
          .then((response) => {
            setGenreList(response.data);
          }).catch(error => {
            console.error(error);
          })
      }

      if (id) {
        getMovieById(id).then((response) => {
            setMovieName(response.data.movieName);
            setGenreID(response.data.genreID);
            setDateAdded(moment(response.data.dateAdded).format("YYYY-MM-DD"));
            setReleaseDate(moment(response.data.releaseDate).format("YYYY-MM-DD"));
            setNumberInStock(response.data.numberInStock);
            setNumberAvailable(response.data.numberAvailable);
        }).catch(error => {
          console.error(error);
        })
  
      }
    }, [id])

    useEffect(() => {
      if (genreList) {
        listGenres()
          .then((response) => {
            setGenreList(response.data);
          }).catch(error => {
            console.error(error);
          })
      }
    }, [])
  
    const saveOrUpdateMovie = (e) =>{
      e.preventDefault();
  
      if (validateForm()) {
        const movie = { 
          movieName, 
          genreID, 
          dateAdded, 
          releaseDate, 
          numberInStock, 
          numberAvailable 
        }
  
        if (id) {
          updateMovieById(id, movie)
            .then((response) => {
              console.log(response.data);
              navigator("/movies")
            }).catch(error => {
              console.error(error);
              alert("Something went wrong!");
              navigator("/movies")
            })
        } else {
          createMovie(movie)
            .then((response) => {
              console.log(response.data);
              navigator("/movies")
            }).catch(error => {
              console.error(error);
              alert("Something went wrong!");
              navigator("/movies")
            })
        }
      }
    }
  
    const validateForm = () => {
      let valid = true;
  
      const errorsCopy = {... errors}
  
      if (movieName.trim()){
        errorsCopy.movieName = '';
      } else {
        errorsCopy.movieName = "Name is required"
        valid = false;
      }

      if (genreID === 0){
        errorsCopy.genreID = "Genre is required"
        valid = false;
      } else {
        errorsCopy.genreID = '';
      }

      if (dateAdded){
        errorsCopy.dateAdded = '';
      } else {
        errorsCopy.dateAdded = "Date Added is required"
        valid = false;
      }

      if (releaseDate){
        errorsCopy.releaseDate = '';
      } else {
        errorsCopy.releaseDate = "Release Date is required"
        valid = false;
      }

      if (numberInStock){
        errorsCopy.numberInStock = '';
      } else {
        errorsCopy.numberInStock = "Number in Stock is required"
        valid = false;
      }

      if (numberAvailable){
        errorsCopy.numberAvailable = '';
      } else {
        errorsCopy.numberAvailable = "Number Available is required"
        valid = false;
      }
  
      setErrors(errorsCopy)
  
      return valid;
    }
  
    const pageTitle = () => {
      if (id){
        return <h2 className="card-title text-center">Update Movie</h2>
      } else {
        return <h2 className="card-title text-center">Add Movie</h2>
      }
    }

    const handleChange = (event) => {
      setGenreID(event.target.value);
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
                      type='text'
                      placeholder='Enter Movie Name'
                      name='movieName'
                      value={movieName}
                      className={`form-control ${errors.movieName ? 'is-invalid' : ''}`}
                      onChange={(e) => { setMovieName(e.target.value); validateForm(); }}
                    >
                    </input>
                    { errors.movieName && <div className='invalid-feedback'> {errors.movieName} </div> }
                  </div>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Genre: </label>
                    <select
                      name="Genre"
                      label="Genre"
                      value={genreID}
                      className={`form-select ${errors.genreID ? 'is-invalid' : ''}`}
                      onChange={(e) => { handleChange(e); validateForm(); }}
                    >
                      <option value={0}>Please Select Genre</option>
                      {genreList.map(
                        (genre) => {
                          return (
                            <option key={genre.genreID} value={genre.genreID}>{genre.genreName}</option>
                          );
                        }
                      )}
                    </select>
                    { errors.genreID && <div className='invalid-feedback'> {errors.genreID} </div> }
                  </div>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Date Added:</label>
                    <input
                      type='date'
                      placeholder='Enter Date Added'
                      name='dateAdded'
                      value={dateAdded}
                      className={`form-control ${errors.dateAdded ? 'is-invalid' : ''}`}
                      onChange={(e) => { setDateAdded(moment(e.target.value).format("YYYY-MM-DD")); validateForm(); }}
                    >
                    </input>
                    { errors.dateAdded && <div className='invalid-feedback'> {errors.dateAdded} </div> }
                  </div>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Release Date:</label>
                    <input
                      type='date'
                      placeholder='Enter Release Date'
                      name='releaseDate'
                      value={releaseDate}
                      className={`form-control ${errors.releaseDate ? 'is-invalid' : ''}`}
                      onChange={(e) => { setReleaseDate(moment(e.target.value).format("YYYY-MM-DD")); validateForm(); }}
                    >
                    </input>
                    { errors.releaseDate && <div className='invalid-feedback'> {errors.releaseDate} </div> }
                  </div>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Number in Stock:</label>
                    <input
                      type='number'
                      placeholder='Enter Number in Stock'
                      name='numberInStock'
                      value={numberInStock}
                      className={`form-control ${errors.numberInStock ? 'is-invalid' : ''}`}
                      onChange={(e) => { setNumberInStock(e.target.value); validateForm(); }}
                    >
                    </input>
                    { errors.numberInStock && <div className='invalid-feedback'> {errors.numberInStock} </div> }
                  </div>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Number Available:</label>
                    <input
                      type='number'
                      placeholder='Enter Number Available'
                      name='numberAvailable'
                      value={numberAvailable}
                      className={`form-control ${errors.numberAvailable ? 'is-invalid' : ''}`}
                      onChange={(e) => { setNumberAvailable(e.target.value); validateForm(); }}
                    >
                    </input>
                    { errors.numberAvailable && <div className='invalid-feedback'> {errors.numberAvailable} </div> }
                  </div>
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