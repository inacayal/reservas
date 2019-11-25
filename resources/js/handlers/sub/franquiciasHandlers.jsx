import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {GET} from '../../utils/api';

export const franquiciasHandlers = [
    {
        endpoint:'/franquicias',
        match:/\/franquicias$/,
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
            editFormHandler(`/usuario/franquicia/${params.id}`,`/franquicias/editar/${params.id}`)
    },
    {
        endpoint:'/franquicias/:id',
        match: /\/franquicias\/(\d+)$/,
        callback: (params) =>
            singleHandler(`/usuario/franquicia/${params.id}`,`/franquicias/${params.id}`)
    }
];


const editFormHandler = (endpoint,location) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    const data = response.data.data;
                    this.setState({
                        data: data,
                        loadFinished:true,
                        nombre:data.nombre,
                        redirect: <Redirect to={location}/>
                    });
                }
            )
            .catch(this.displayErrors);
    }
}

const addFormHandler = (endpoint,location) => {
    return function (params) {
        this.setState({
            data:true,
            loadFinished:true,
            redirect: <Redirect to={location}/>
        })
    }
}


const listHandler = (endpoint,location) => {
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
                        loadFinished:true,
                        redirect: <Redirect to={location}/>
                    });
                }
            )
            .catch(this.displayErrors);
    }
}

const singleHandler = (endpoint,location) => {
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
                        data: data,
                        nombre:data.nombre,
                        loadFinished:true,
                        redirect: <Redirect to={location}/>
                    });
                }
            )
            .catch(this.displayErrors);
    }
}
