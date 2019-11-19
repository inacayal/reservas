import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {GET} from '../utils/api';


export const handlers = [
    {
        endpoint:'/locales',
        match:/\/locales$/,
        callback:(params) =>
            listHandler(`/usuario/locales/${user.id}`,'/locales')
    },
    {
        endpoint:'/locales/agregar',
        match:/\/locales\/(agregar)$/,
        callback:(params) =>
            addFormHandler(`/usuario/add/${user.id}/1`,'/locales/agregar')
    },
    {
        endpoint:'/locales/editar/:id',
        match:/\/locales\/(editar\/\d+)$/,
        callback:(params) =>
            editFormHandler(`/usuario/local/${params.id}`,`/locales/editar/${params.id}`)
    },
    {
        endpoint:'/locales/:id',
        match: /\/locales\/(\d+)$/,
        callback: (params) =>
            singleHandler(`/usuario/local/${params.id}`,`/locales/${params.id}`)
    }
];

export const editFormHandler = (endpoint,location) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    const data = response.data.data
                    this.setState({
                        data:data,
                        loadFinished:true,
                        redirect:<Redirect to={location}/>
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}

export const addFormHandler = (endpoint,location) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.props.downloadHandler
        });
        request
            .then(
                response => {
                    const data = response.data.usuarios.list;
                    this.setState({
                        data:data,
                        loadFinished:true,
                        redirect:<Redirect to={location}/>
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}




export const listHandler = (endpoint,location) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({
                        data: response.data.locales.data,
                        loadFinished: true,
                        redirect:<Redirect to={location}/>
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}


export const singleHandler = (endpoint,location) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({
                        data: response.data.data,
                        loadFinished:true,
                        redirect:<Redirect to={location}/>
                    });

                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}
