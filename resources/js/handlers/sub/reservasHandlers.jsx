import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';

export const reservasHandlers = {
    list: [
        {
            endpoint:'/reservas',
            match:/\/reservas$/,
            callback:(params) =>
                listHandler(`reservas/list/${user.id}/`,`/reservas`)
        },
        {
            endpoint:'/reservas/agregar',
            match:/\/reservas\/(agregar)$/,
            callback:(params) =>
                formHandler(`reservas/add/${user.id}/`,`/reservas/agregar`)
        },
        {
            endpoint:'/reservas/:id',
            match: /\/reservas\/(\d+)$/,
            callback: (params) =>
                singleHandler(`/reservas/single/${user.id}/${params.id}`,`/reservas/${params.id}`)
        }
    ],
    form: {
        add:sendPostRequest,
        edit:sendPutRequest,
        update:updateScope
    }
};

const listHandler = (endpoint,location) => {
    return function (params) {
        const date = params.date||new Date(),
            request = GET({
                endpoint: endpoint + parseInt(date.getMonth()+1) + '/' + date.getFullYear(),
                download: this.downloadHandler
            });
        request
            .then(
                response => {
                    this.setState({
                        data: {
                            data:response.data.reservas.data,
                            horarios: {
                                data:response.data.horarios.data,
                                intervalo:response.data.intervalo.id,
                                antelacion: response.data.antelacion
                            },
                            date:date,
                            show:params.show||"1"
                        },
                        location:this.props.location,
                        loadFinished:true
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
                    const data = response.data.reservas[0];
                    this.setState({
                        data: data,
                        nombre:`Reserva de ${data.nombre} ${data.apellido}`,
                        loadFinished:true,
                        location:this.props.location,
                    });
                }
            )
    }
}


const formHandler = (endpoint,location) => {
    return function (params) {
        const   date = params.date||new Date(),
                request = GET({
                    endpoint: `${endpoint}${parseInt(date.getMonth() + 1)}/${date.getFullYear()}`,
                    download: this.downloadHandler
                });
        request
            .then(
                response => {
                    const data = response.data;
                    this.setState({
                        data:{
                            data:data,
                            date:date
                        },
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
