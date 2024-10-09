import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createGenre, getGenreById, updateGenreById } from '../../api/GenreApi';

const GenreComponent = () => {
    const [genreName, setGenreName] = useState("");
    const [errors, setErrors] = useState({
        genreName: ''
    });
    const {id} = useParams();
    const navigator = useNavigate();
  
    useEffect(() => {
      if (id) {
        getGenreById(id).then((response) => {
            setGenreName(response.data.genreName);
        }).catch(error => {
          console.error(error);
        })
  
      }
    }, [id])
  
    const saveOrUpdateGenre = (e) =>{
      e.preventDefault();
  
      if (validateForm()) {
        const genre = { genreName }
        console.log(genre);
  
        if (id) {
          updateGenreById(id, genre)
            .then((response) => {
              console.log(response.data);
              navigator("/genres")
            }).catch(error => {
              console.error(error);
              alert("Something went wrong!");
              navigator("/genres")
            })
        } else {
          createGenre(genre)
            .then((response) => {
              console.log(response.data);
              navigator("/genres")
            }).catch(error => {
              console.error(error);
              alert("Something went wrong!");
              navigator("/genres")
            })
        }
      }
    }
  
    const validateForm = () => {
      let valid = true;
  
      const errorsCopy = {... errors}
  
      if (genreName.trim()){
        errorsCopy.genreName = '';
      } else {
        errorsCopy.genreName = "Name is required"
        valid = false;
      }
  
      setErrors(errorsCopy)
  
      return valid;
    }
  
    const pageTitle = () => {
      if (id){
        return <h2 className="card-title text-center">Update Genre</h2>
      } else {
        return <h2 className="card-title text-center">Add Genre</h2>
      }
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
                      placeholder='Enter Genre Name'
                      name='genreName'
                      value={genreName}
                      className={`form-control ${errors.genreName ? 'is-invalid' : ''}`}
                      onChange={(e) => { setGenreName(e.target.value); validateForm(); }}
                    >
                    </input>
                    { errors.genreName && <div className='invalid-feedback'> {errors.genreName} </div> }
                  </div>
                  <button className='btn btn-success mb-2 mt-2' onClick={saveOrUpdateGenre}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default GenreComponent