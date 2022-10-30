import axios from 'axios';
import cookie from 'cookie';
import { identity, merge } from 'lodash';

export const baseUrl = 'http://localhost:8081/api';
export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

let csrfLoading;
async function provideCsrf(config) {
  if (config.url === 'csrfToken') {
    return config;
  }

  if (!csrfLoading) {
    csrfLoading = axiosInstance.get('csrfToken');
  }
  await csrfLoading;
  const cookies = cookie.parse(document.cookie);
  const csrfToken = cookies.csrf;
  const newHeaders = { 'x-csrf-token': csrfToken };

  return merge(config, { headers: newHeaders });
}

function handleError(error) {
//   console.log('handleError', error);
//   if (error.response.status === 401) {
//     window.location = '/login';
//   }
  return Promise.reject(error);
}

axiosInstance.interceptors.request.use(provideCsrf);
axiosInstance.interceptors.request.use(identity, handleError);
axiosInstance.interceptors.response.use(identity, handleError);
