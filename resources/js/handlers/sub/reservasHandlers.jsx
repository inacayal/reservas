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
                listHandler(`reservas/list/${user.id}/`)
        },
        {
            endpoint:'/reservas/agregar',
            match:/\/reservas\/(agregar)$/,
            callback:(params) =>
                formHandler(`reservas/add/${user.id}/`)
        },
        {
            endpoint:'/reservas/:id',
            match: /\/reservas\/(\d+)$/,
            callback: (params) =>
                singleHandler(`/reservas/single/${user.id}/${params.id}`)
        }
    ],
    form: {
        add:sendPostRequest,
        edit:sendPutRequest,
        update:updateScope
    }
};

const listHandler = (endpoint) => {
    return function (params) {
        const date = (params||{}).date||new Date(),
            request = GET({
                endpoint: `${endpoint}${parseInt(date.getMonth()+1)}/${date.getFullYear()}`,
                download: this.downloadHandler
            });
        if (params) {
            this.props.history.replace({
                state:{
                    ...(this.props.location||{}).state,
                    date:date
                }
            });
            return  new Promise(
                        (resolve,reject) => {
                            this.setState({
                                    loadFinished:false,
                                    loading:0
                                },
                                () => resolve()
                            )
                        }
                    )
                    .then (
                        request
                        .then(
                            response => {
                                this.setState({
                                    data: {
                                        data:response.data.reservas.data,
                                        first:false,
                                        horarios: {
                                            data:response.data.horarios.data,
                                            intervalo:response.data.intervalo.id,
                                            antelacion: response.data.antelacion,
                                        },
                                        date:new Date(date)
                                    },
                                    location:this.props.location,
                                    loadFinished:true
                                });
                            }
                        )
                    );
        }
        return  request
                .then(
                    response => {
                        this.setState({
                            data: {
                                data:response.data.reservas.data,
                                first:true,
                                date:new Date(),
                                horarios: {
                                    data:response.data.horarios.data,
                                    intervalo:response.data.intervalo.id,
                                    antelacion: response.data.antelacion,
                                }
                            },
                            location:this.props.location,
                            loadFinished:true
                        });
                    }
                )

    }
}


const singleHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return  request
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


const formHandler = (endpoint) => {
    return function (params) {
        const   date = (params||{}).date||new Date(),
                request = GET({
                    endpoint: `${endpoint}${parseInt(date.getMonth() + 1)}/${date.getFullYear()}`,
                    download: this.downloadHandler
                });
        if (params) {
            this.props.history.replace({
                state:{
                    date:date
                }
            })
            return  new Promise(
                        (resolve,reject) => {
                            this.setState({
                                    loadFinished:false,
                                    loading:0
                                },
                                () => resolve()
                            )
                        }
                    )
                    .then (
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
                    );
        }
        return  request
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
