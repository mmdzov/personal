import axios from 'axios';

const BASE_URL = 'https://mmdzov.com/api';

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const privateRequest = axios.create({
  baseURL: BASE_URL,
});

privateRequest.defaults.headers.common.Authorization = localStorage.getItem('token') || '';

export { publicRequest, privateRequest, BASE_URL };
