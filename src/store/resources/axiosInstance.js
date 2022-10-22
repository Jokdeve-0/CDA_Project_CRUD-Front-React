import axios from 'axios';
const config={
    'x-csrf-toAccess-Control-Allow-Originken': '*'
}
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api/',
  withCredentials: false,
},config);

