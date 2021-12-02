import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const privateRequest = axios.create({
  baseURL: BASE_URL,
});

privateRequest.defaults.headers.common.Authorization =
  'eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MWEzOWRjMzA4MWE2MjVmZWRkY2VmNjYiLCJpc0FkbWluIjp0cnVlLCJhdmF0YXIiOiJodHRwOi8vbG9jYWxob3N0OjQwMDAvYXBpL3VwbG9hZHMvYXZhdGFyLWVzc2Zydm9nN3kuanBnIiwidXNlcm5hbWUiOiJtb2hhbW1hZCIsImVtYWlsIjoibXpvdjkzOUBnbWFpbC5jb20iLCJfX3YiOjB9.hkyABfU_Ba_zbuUjlABm1IvSOc6p17EJcm4kTK6rdvk';
// privateRequest.defaults.headers.common.Authorization = localStorage.getItem('token');

export { publicRequest, privateRequest, BASE_URL };
