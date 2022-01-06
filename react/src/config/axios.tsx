import axios from 'axios';

const clientAxios = axios.create({
    baseURL: window.location.hostname == 'www.crown19db.me' || window.location.hostname == 'dev.crown19db.me'
        ? 'https://crown19db.herokuapp.com' // return prod api if running in prod
        : 'http://localhost:5000' // return local api if running locally
});

export default clientAxios;
