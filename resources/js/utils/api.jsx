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
    options
) => axios({
        method: 'post',
        url: options.endpoint,
        timeout: 1000,
        data:options.data,
        onDownloadProgress:options.download,
        onUploadProgress:options.upload,
        baseURL: 'http://localhost/api/',
        headers:{
            'Content-type':'application/json'
        }
    });

export const DELETE = (
    options
) => axios({
        method: 'delete',
        url: options.endpoint,
        timeout: 1000,
        onDownloadProgress:options.download,
        onUploadProgress:options.upload,
        baseURL: 'http://localhost/api/',
    });

export const PUT = (
    options
) => axios({
        method: 'put',
        url: options.endpoint,
        data:options.data,
        timeout: 1000,
        onDownloadProgress:options.download,
        onUploadProgress:options.upload,
        baseURL: 'http://localhost/api/',
        headers:{
            'Content-type':'application/json'
        }
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
