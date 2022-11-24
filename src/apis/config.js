import axios from 'axios';
import envs from '../config/envs';

const BASE_URL = `${envs().baseUrl}/api`;

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const privateRequest = axios.create({
  baseURL: BASE_URL,
});

privateRequest.defaults.headers.common.Authorization = localStorage.getItem('token') || '';

export { publicRequest, privateRequest, BASE_URL };
