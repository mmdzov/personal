import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const privateRequest = axios.create({
  baseURL: BASE_URL,
});

privateRequest.defaults.headers.common.Authorization = localStorage.getItem('token') || '';

export { publicRequest, privateRequest, BASE_URL };
