import axios from 'axios';

const clientAxios = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://crown19db.herokuapp.com' // return prod api if running in prod
        : 'https://crown19db.herokuapp.com' // return local api if running locally
});

export default clientAxios;
