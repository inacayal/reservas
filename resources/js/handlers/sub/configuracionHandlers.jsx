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



const establecimientoHandler = (endpoint,location) => {
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
                        redirect: <Redirect to={location}/>
                    });
                }
            )
            .catch(this.displayErrors);
    }
}

const configuracionHandler = (endpoint,location) => {
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
                        redirect: <Redirect to={location}/>
                    });
                }
            )
            .catch(this.displayErrors);
    }
}

const reservaHandler = (endpoint,location) => {
    return function (params){
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
                        redirect: <Redirect to={location}/>
                    });
                }
            )
            .catch(this.displayErrors);
    }
}


const usuarioHandler = (endpoint,location) => {
    return function (params){
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
                        redirect: <Redirect to={location}/>
                    });
                }
            )
            .catch(this.displayErrors);
    }
}

export function sendEstablecimientoPutRequest () { }

export function  sendReservasPutRequest() { }

export function sendUsuarioPutRequest () { }
