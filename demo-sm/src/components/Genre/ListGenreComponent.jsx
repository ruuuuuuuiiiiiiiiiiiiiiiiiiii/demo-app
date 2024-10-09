import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteGenre, listGenres } from '../../api/GenreApi';
import moment from 'moment';

const ListGenreComponent = () => {

    const [Genres, setGenres] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllGenres();
    }, []);


    const getAllGenres = () => {
        listGenres()
            .then((response) => {
                setGenres(response.data);
            }).catch(error => {
                console.error(error);
        })
    }

    const updateGenre = (id) => {
        navigator(`/edit-genre/${id}`);
    }

    const removeGenre = (id) => {
        console.log(id);

        deleteGenre(id).then((response) => {
            console.log(response.data);
            getAllGenres();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='container'>

            <h2 className='text-center'>List of Genres</h2>
            <button 
                className="rounded-md bg-secondary-500 px-3 py-2 hover:bg-primary-500 hover:text-white" 
                onClick={() => {navigator('/add-genre');}}
            >
                Add Genre
            </button>
            <div className='mt-2'>
                <table className="table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className='pr-3'>Genre ID</th>
                            <th className='pr-3'>Genre Name</th>
                            <th className='pr-3'>Genre Created Date</th>
                            <th className='pr-3'>Genre Modified Date</th>
                            <th className='pr-3 pl-14'>Actions</th>
                        </tr>
                    </thead>
                    <thead>
                        {
                            Genres.map(Genre => 
                                <tr key={Genre.genreID}>
                                    <td>{Genre.genreID}</td>
                                    <td>{Genre.genreName}</td>
                                    <td>{moment(Genre.createdDate).format("YYYY-MM-DD")}</td>
                                    <td>{moment(Genre.modifiedDate).format("YYYY-MM-DD")}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateGenre(Genre.genreID)} >Update</button>
                                        <button className='btn btn-danger' onClick={() => removeGenre(Genre.genreID)} style={{marginLeft: '10px'}}>Delete</button>
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

export default ListGenreComponent