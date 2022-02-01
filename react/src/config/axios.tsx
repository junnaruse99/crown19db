import axios from 'axios';

const clientAxios = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://crown19db.herokuapp.com' // return prod api if running in prod
        : 'http://localhost:5000' // return local api if running locally
});

export default clientAxios;
