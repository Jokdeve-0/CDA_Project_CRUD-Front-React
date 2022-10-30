import axios from 'axios';
const config={
    'x-csrf-toAccess-Control-Allow-Originken': '*',
    'Access-Control-Allow-Origin':'http://localhost:8081',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api/',
  withCredentials: false,
},config);

