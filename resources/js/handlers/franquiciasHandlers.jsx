import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {GET} from '../utils/api';

export const handlers = [
    {
        endpoint:'/franquicias',
        match:/\/franquicias/,
        callback:(params) =>
            listHandler(`/usuario/franquicias/${user.id}`,`/franquicias`)
    },
    {
        endpoint:'/franquicias/agregar',
        match:/\/franquicias\/(agregar)$/,
        callback:(params) =>
            addFormHandler(``,`/franquicias/agregar`)
    },
    {
        endpoint:'/franquicias/editar/:id',
        match:/\/franquicias\/(editar\/\d+)$/,
        callback:(params) =>
            editFormHandler(`/usuario/franquicia/${match.match.params.id}`)
    },
    {
        endpoint:'/franquicias/:id',
        match: /\/franquicias\/(\d+)$/,
        callback: (params) =>
            singleHandler(`/usuario/franquicia/${match.match.params.id}`)
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
                    this.setState({
                        data: response.data.data,
                        redirect: <Redirect to={location}/>
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
        this.setState({
            data:{},
            loadFinished:true,
            redirect: <Redirect to={location}/>
        })
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
                        data: response.data.usuarios.data,
                        redirect: <Redirect to={location}/>
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
        this.setState({
            data: null,
            isLoading: true,
            loadFinished: false
        });
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({
                        data: response.data.data,
                        redirect: <Redirect to={location}/>
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
