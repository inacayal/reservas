import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {GET} from '../utils/api';
import { assignHorarios } from '../escritorio/eventos/sub/generateEventosCard';

export const handlers = [
    {
        endpoint:'/eventos',
        match:/\/eventos$/,
        callback:(params) =>
            listHandler(`/eventos/list/${user.id}`,`/eventos`)
    },
    {
        endpoint:'/eventos/agregar',
        match:/\/eventos\/(agregar)$/,
        callback:(params) =>
            addFormHandler(`/eventos/add/${user.id}`,`/eventos/agregar`)
    },
    {
        endpoint:'/eventos/editar/:id',
        match:/\/eventos\/(editar\/\d+)$/,
        callback:(params) =>
            editFormHandler(`eventos/single/${user.id}/${params.id}`,`/eventos/editar/${params.id}`)
    },
    {
        endpoint:'/eventos/:id',
        match: /\/eventos\/(\d+)$/,
        callback: (params) =>
            singleHandler(`/eventos/single/${user.id}/${params.id}`,`/eventos/${params.id}`)
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
                    let data =  {
                        selected: response.data.eventos[0],
                        all: {
                            feriados: response.data.feriados,
                            horarios: response.data.horarios,
                            promociones: response.data.promociones
                        }
                    };
                    data.selected.horarios.list = assignHorarios(data.selected.horarios.list)[0];
                    data.all.horarios.list = assignHorarios(data.all.horarios.list)[0];
                    this.setState({
                        data: {...data},
                        loadFinished:true,
                        redirect: <Redirect to={location}/>
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

const addFormHandler = (endpoint,location) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    let data = {};
                    data = response.data;
                    data.horarios.list = assignHorarios(data.horarios.list)[0];
                    this.setState({
                        data: {...data},
                        loadFinished:true,
                        redirect: <Redirect to={location}/>
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
                        data: response.data.eventos.data,
                        loadFinished:true,
                        redirect: <Redirect to={location}/>
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

const singleHandler = (endpoint,location) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({
                        data: response.data.eventos[0],
                        loadFinished:true,
                        redirect: <Redirect to={location}/>
                    });
                }
            )
        .catch(
            error => {
                console.log(error)
            }
        );
    }
}
