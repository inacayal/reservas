import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';

export const configuracionHandlers = {
    list: [
        {
            endpoint:'/configuracion',
            match:/\/configuracion$/,
            callback:(params) =>
                configuracionHandler(`usuario/local/${user.id}`,'/configuracion')
        },
        {
            endpoint:'/configuracion/usuario',
            match:/\/configuracion\/(usuario)$/,
            callback:(params) =>
                usuarioHandler(`usuario/local/${user.id}`,'/configuracion/usuario')
        },
        {
            endpoint:'/configuracion/establecimiento',
            match:/\/configuracion\/(establecimiento)$/,
            callback:(params) =>
                establecimientoHandler(`usuario/local/${user.id}`,'/configuracion/establecimiento')
        },
        {
            endpoint:'/configuracion/reservas',
            match: /\/configuracion\/(reservas)$/,
            callback: (params) =>
                reservaHandler(`usuario/local/${user.id}`,'/configuracion/reservas')
        }
    ],
    form: {
        establecimiento:sendEstablecimientoPutRequest,
        reservas:sendReservasPutRequest,
        usuario:sendUsuarioPutRequest
    }
};



const establecimientoHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return  request
                .then(
                    response => {
                        this.setState({
                            data: response.data.data,
                            loadFinished:true,
                            location: this.props.location
                        });
                    }
                );
    }
}

const configuracionHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return  request
                .then(
                    response => {
                        this.setState({
                            data: response.data.data,
                            loadFinished:true,
                            location: this.props.location
                        });
                    }
                )
    }
}

const reservaHandler = (endpoint) => {
    return function (){
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return  request
                .then(
                    response => {
                        this.setState({
                            data: response.data.data,
                            loadFinished:true,
                            location: this.props.location
                        });
                    }
                )
    }
}


const usuarioHandler = (endpoint) => {
    return function (){
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return  request
                .then(
                    response => {
                        this.setState({
                            data: response.data.data,
                            loadFinished:true,
                            location: this.props.location
                        });
                    }
                )
    }
}

export function sendEstablecimientoPutRequest (data) {
    return PUT({
        endpoint: 'usuario/update/establecimiento',
        data: JSON.stringify(data)
    });
}

export function  sendReservasPutRequest(data) {
    return PUT({
        endpoint: 'usuario/update/reservas',
        data: JSON.stringify(data)
    });
}

export function sendUsuarioPutRequest (data) {
    return PUT({
        endpoint: 'usuario/update/usuario',
        data: JSON.stringify(data)
    });
}
