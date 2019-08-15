/**
 * axios http
 */
import axios from 'axios';

export const GET = (
    options
) => axios({
        method:'get',
        url:options.endpoint,
        timeout: 1000,
        baseURL: 'http://localhost/api/',
        onDownloadProgress:options.download
    })

export const POST = (
    endpoint
) => axios.create({
        method: 'post',
        url: endpoint,
        timeout: 1000,
        baseURL: 'http://localhost/api/'
    });

export const DELETE = (
    endpoint
) => axios.create({
        method: 'delete',
        url: endpoint,
        timeout: 1000,
        baseURL: 'http://localhost/api/'
    });

export const PUT = (
    endpoint
) => axios.create({
        method: 'put',
        url: endpoint,
        timeout: 1000,
        baseURL: 'http://localhost/api/'
    });

let progress = {
    load:0,
    finish:true
};

axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (config) {
        return config;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);