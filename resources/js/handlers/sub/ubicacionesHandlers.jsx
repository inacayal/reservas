import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';

export const ubicacionesHandlers = {
    list: [
        {
            endpoint:'/ubicaciones',
            match:/\/ubicaciones$/,
            callback:(params) =>
                listHandler(`ubicaciones/list/${user.id}`,`/ubicaciones`)
        },
        {
            endpoint:'/ubicaciones/agregar',
            match:/\/ubicaciones\/(agregar)$/,
            callback:(params) =>
                addFormHandler(`ubicaciones/single/${user.id}/${params.id}`,`/ubicaciones/agregar`)
        },
        {
            endpoint:'/ubicaciones/editar/:id',
            match:/\/ubicaciones\/(editar\/\d+)$/,
            callback:(params) =>
                editFormHandler(`ubicaciones/single/${user.id}/${params.id}`,`/ubicaciones/editar/${params.id}`)
        },
        {
            endpoint:'/ubicaciones/:id',
            match: /\/ubicaciones\/(\d+)$/,
            callback: (params) =>
                singleHandler(`/ubicaciones/single/${user.id}/${params.id}`,`/ubicaciones/${params.id}`)

        }
    ],
    form:[]
};

const singleHandler  = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return  request
                .then(
                    response => {
                        const data = response.data.ubicaciones[0];
                        this.setState({
                            data: data,
                            nombre:data.nombre,
                            loadFinished:true,
                            location:this.props.location
                        });
                    }
                )
    }
}

const listHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return  request
                .then(
                    response => {
                        this.setState({
                            data: response.data.ubicaciones.data,
                            loadFinished:true,
                            location:this.props.location
                        });
                    }
                )
    }
}

const editFormHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return  request
                .then(
                    response => {
                        const data = response.data.ubicaciones[0];
                        this.setState({
                            data: data,
                            nombre:data.nombre,
                            loadFinished: true,
                            location:this.props.location
                        });
                    }
                )
    }
}

const addFormHandler = (endpoint) => {
    return function () {
        this.setState({
            data: true,
            loadFinished:true,
            location:this.props.location
        });
    }
}

export function sendPostRequest () { }

export function updateScope () { }

export function sendPutRequest () { }
