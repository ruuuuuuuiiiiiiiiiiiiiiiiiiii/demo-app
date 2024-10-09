import APIService from "../services/APIService";

const BASE_URL = '/genres';

export const listGenres = () => {
    return APIService().get(BASE_URL);
}

export const createGenre = (genre) => {
    return APIService().post(BASE_URL, genre);
}

export const getGenreById = (genreId) => {
    return APIService().get(BASE_URL + "/" + genreId);
}

export const updateGenreById = (genreId, genre) => {
    return APIService().put(BASE_URL + "/" + genreId, genre);
}

export const deleteGenre = (genreId) => {
    return APIService().delete(BASE_URL + "/" + genreId);
}