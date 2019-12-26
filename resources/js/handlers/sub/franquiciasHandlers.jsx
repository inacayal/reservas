import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';

export const franquiciasHandlers = {
    list:[
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
    ],
    form: {
        add:sendPostRequest,
        edit:sendPutRequest,
        update:updateScope
    }
};


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
    }
}

const addFormHandler = (endpoint,location) => {
    return function (params) {
        this.setState({
            data:true,
            loadFinished:true,
            location:this.props.location,
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
                        location:this.props.location,
                    });
                }
            )
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
                        location:this.props.location,
                    });
                }
            )
    }
}

export function sendPostRequest () { }

export function updateScope () { }

export function sendPutRequest () { }
