import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';
import {processData} from '../../utils/Helper';

export const reservasHandlers = {
    list: [
        {
            endpoint:'/reservas',
            match:/\/reservas$/,
            callback:(params) =>
                listHandler(`reservas/list/${user.id}`)
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

const listType = {
    agenda:{
        request:(
            endpoint,
            date,
            download
        ) => ({
            endpoint: `${endpoint}/${parseInt(date.getMonth()+1)}/${date.getFullYear()}`,
            download
        }),
        resolve:({
            date,
            location,
            response
        }) => ({
            data: {
                data:response.data.reservas.data,
                horarios: {
                    data:response.data.horarios.data,
                    intervalo:response.data.intervalo.id,
                    antelacion: response.data.antelacion,
                },
                date,
                type:'agenda'
            },
            location,
            loadFinished:true
        })
    },
    tabla:{
        request:(
            endpoint,
            date,
            download
        ) => ({
            endpoint: `${endpoint}/all`,
            download
        }),
        resolve:({
            location,
            response
        }) => ({
            data:{
                data:processData(response.data.reservas.data),
                type:'tabla'
            },
            location,
            loadFinished:true,
        })
    }
};

const listHandler = (endpoint) => {
    return function (params) {
        const date = (params||{}).date||new Date(),
            loc = (this.props.location||{}).state||{},
            type = params.type||loc.type||'agenda',
            conf = listType[type],
            request = GET(
                conf.request(
                    endpoint,
                    date,
                    this.downloadHandler
                )
            );
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
                                this.setState(
                                    conf.resolve({
                                        date: new Date(date),
                                        location:this.props.location,
                                        response
                                    }),
                                    () => {
                                        this.props.history.replace({
                                            state:{
                                                ...loc,
                                                first:true,
                                                date,
                                                type
                                            }
                                        });
                                    }
                                );
                            }
                        )
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
                    ...this.props.location.state||{},
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

export function sendPostRequest (data) {
    return POST({
        endpoint: 'reservas/create',
        data: JSON.stringify(data)
    });
}

export function sendPutRequest (data) {
    return PUT({
        endpoint: 'reservas/update',
        data: JSON.stringify(data)
    });
}

export function updateScope () { }
