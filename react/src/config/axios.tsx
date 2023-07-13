import axios from 'axios';

const clientAxios = axios.create({
    baseURL: process.env.NODE_ENV !== 'production'
        ? 'http://app.junnaruse.com/crown19db/' // return prod api if running in prod
        : 'http://localhost:5000' // return local api if running locally
});

export default clientAxios;
