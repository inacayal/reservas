import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {GET} from '../utils/api';

export const handlers = [
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
];

export const listHandler = (endpoint,location) => {
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
                        redirect:<Redirect to={location}/>,
                        loadFinished:true
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message);
                }
            );
    }
}


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
                        data: response.data.reservas[0],
                        loadFinished:true,
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


export const formHandler = (endpoint,location) => {
    return function (params) {
        const date = this.state.date ? this.state.date : new Date(),
            request = GET({
                endpoint: endpoint + parseInt(date.getMonth() + 1) + '/' + date.getFullYear(),
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
                        redirect:<Redirect to={location}/>,
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
