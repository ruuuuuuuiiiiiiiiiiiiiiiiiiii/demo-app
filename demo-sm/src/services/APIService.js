import axios from "axios";

import React from 'react'

import { properties } from "../config/properties";




const APIService = () => {

    const ENDPOINT = `${properties.endpoint}${properties.api}`;

    return axios.create({
        baseURL: ENDPOINT,
        headers: {
            'Content-Type': 'application/json' 
        },
    })
}

export default APIService