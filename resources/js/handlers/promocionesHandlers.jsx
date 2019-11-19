import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {GET} from '../utils/api';

export const handlers = [
    {
        endpoint:'/promociones',
        match:/\/promociones$/,
        callback:(params) =>
            listHandler(`promociones/list/${user.id}`,`/promociones`)
    },
    {
        endpoint:'/promociones/agregar',
        match:/\/promociones\/(agregar)$/,
        callback:(params) =>
            addFormHandler(`promociones/add/${user.id}`,`/promociones/agregar`)
    },
    {
        endpoint:'/promociones/editar/:id',
        match:/\/promociones\/(editar\/\d+)$/,
        callback:(params) =>
            editFormHandler(`promociones/single/27/${params.id}`,`/promociones/editar/${params.id}`)
    },
    {
        endpoint:'/promociones/:id',
        match: /\/promociones\/(\d+)$/,
        callback: (params) =>
            singleHandler(`/promociones/single/${user.id}/${params.id}`,`/promociones/${params.id}`)
    }
];


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
                        data: response.data.promociones[0],
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
                        data: response.data.promociones.data,
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


export const editFormHandler = (endpoint,location) => {
    return function (params) {
        this.setState({
            data: null,
            isLoading: true,
        });

        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        request
        .then(
            response => {
                this.setState({
                    data: {
                        selected: response.data.promociones[0],
                        all: {
                            eventos: response.data.eventos
                        }
                    },
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

export const addFormHandler = (endpoint,location) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
        .then(
            response => {
                this.setState({
                    data: { ...response.data },
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
