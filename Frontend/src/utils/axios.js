//centeralized API setup

// this is a common API configuration that can be used for making any http request

import axios from 'axios';
import qs from 'qs';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    withCredentials: true, // allows browser to send cookies and other credentials with the API request
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
})

