import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteMovie, listMovies } from '../../api/MovieApi';
import { listGenres } from '../../api/GenreApi';
import moment from 'moment';

const ListMovieComponent = () => {

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllGenres();
        getAllMovies();
    }, []);

    const getAllMovies = () => {
        listMovies()
            .then((response) => {
                setMovies(response.data);
            }).catch(error => {
                console.error(error);
        })
    }

    const getAllGenres = async () => {
        await listGenres()
            .then((response) => {
                setGenres(response.data);
            }).catch(error => {
                console.error(error);
            })
    }

    const getGenreName = (id) => {
        return genres.find((genre) => genre.genreID === id).genreName;
    }

    const updateMovie = (id) => {
        navigator(`/edit-movie/${id}`);
    }

    const removeMovie = (id) => {
        console.log(id);

        deleteMovie(id).then((response) => {
            console.log(response.data);
            getAllMovies();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='container'>

            <h2 className='text-center'>List of Movies</h2>
            <button 
                className="rounded-md bg-secondary-500 px-3 py-2 hover:bg-primary-500 hover:text-white" 
                onClick={() => {navigator('/add-movie');}}
            >
                Add Movie
            </button>
            <div className='mt-2'>
                <table className="table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className='pr-3'>Movie ID</th>
                            <th className='pr-3'>Movie Name</th>
                            <th className='pr-3'>Movie Genre</th>
                            <th className='pr-3'>Date Added</th>
                            <th className='pr-3'>Release Date</th>
                            <th className='pr-3'>Number in Stock</th>
                            <th className='pr-3'>Number Available</th>
                            <th className='pr-3'>Movie Created Date</th>
                            <th className='pr-3'>Movie Modified Date</th>
                            <th className='pr-3 pl-14'>Actions</th>
                        </tr>
                    </thead>
                    <thead>
                        {
                            
                            movies.map(movie => 
                                <tr key={movie.movieID}>
                                    <td>{movie.movieID}</td>
                                    <td>{movie.movieName}</td>
                                    <td>{getGenreName(movie.genreID) || movie.genreID}</td>
                                    <td>{moment(movie.dateAdded).format("YYYY-MM-DD")}</td>
                                    <td>{moment(movie.releaseDate).format("YYYY-MM-DD")}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.numberAvailable}</td>
                                    <td>{moment(movie.createdDate).format("YYYY-MM-DD")}</td>
                                    <td>{moment(movie.modifiedDate).format("YYYY-MM-DD")}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateMovie(movie.movieID)} >Update</button>
                                        <button className='btn btn-danger' onClick={() => removeMovie(movie.movieID)} style={{marginLeft: '10px'}}>Delete</button>
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

export default ListMovieComponent