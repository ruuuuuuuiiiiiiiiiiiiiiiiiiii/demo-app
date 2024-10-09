import APIService from "../services/APIService";

const BASE_URL = '/movies';

export const listMovies = () => {
    return APIService().get(BASE_URL);
}

export const createMovie = (movie) => {
    return APIService().post(BASE_URL, movie);
}

export const getMovieById = (movieId) => {
    return APIService().get(BASE_URL + "/" + movieId);
}

export const updateMovieById = (movieId, movie) => {
    return APIService().put(BASE_URL + "/" + movieId, movie);
}

export const deleteMovie = (movieId) => {
    return APIService().delete(BASE_URL + "/" + movieId);
}