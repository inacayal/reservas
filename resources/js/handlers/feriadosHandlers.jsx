import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {GET} from '../utils/api';
import {generateHoursFromInterval} from '../utils/Helper';

export const handlers = [
    {
        endpoint:`/horarios/feriados`,
        match:/(\/horarios\/feriados)$/,
        callback:(params) =>
            listHandler(`/feriados/list/${user.id}/`,`/horarios/feriados`)
    },
    {
        endpoint:`/horarios/feriados/agregar`,
        match:/\/(horarios\/feriados\/agregar)$/,
        callback:(params) =>
            addFormHandler(`/feriados/add/${user.id}/`,`/horarios/feriados/agregar`)
    },
    {
        endpoint:`/horarios/feriados/editar/:id`,
        match:/\/horarios\/(feriados\/editar\/\d+)$/,
        callback:(params) =>
            editFormHandler(`/feriados/single/${user.id}/${params.id}`,`/horarios/feriados/editar/${params.id}`)
    },
    {
        endpoint:`/horarios/feriados/:id`,
        match: /\/horarios\/feriados\/(\d+)$/,
        callback: (params) =>
            singleHandler(`/feriados/single/${user.id}/${params.id}`,`/horarios/feriados/${params.id}`)
    }
];

export const editFormHandler = (endpoint,location) => {
    return function (params){
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    this.setState({
                        data: {
                            date: new Date(response.data.feriados[0].fecha),
                            feriados: response.data.feriados[0],
                            eventos: response.data.eventos,
                            minutes: generateHoursFromInterval(response.data.intervalo),
                            side: response.data.feriados[0].estado === 'laboral'
                        },
                        loadFinished: true,
                        redirect:<Redirect to={location}/>,
                        refresh:true
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

export const addFormHandler = (endpoint,location) => {
    return function (params){
        const date = params.date ? params.date : new Date();
        const request = GET({
            endpoint: endpoint + (date.getMonth() + 1) + '/' + date.getFullYear(),
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    this.setState({
                        data: {
                            date: date,
                            feriados: response.data.feriados.list,
                            eventos: response.data.eventos,
                            minutes: generateHoursFromInterval(response.data.intervalo),
                        },
                        loadFinished: true,
                        redirect:<Redirect to={location}/>,
                        refresh:true
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

export const listHandler = (endpoint,location) => {
    return function (params){
        const date = params.date||new Date(),
            request = GET({
                endpoint: endpoint + (date.getMonth() + 1) + '/' + date.getFullYear(),
                download: this.downloadHandler
            });
        request
            .then(
                response => {
                    this.setState({
                        data:{
                            date:date,
                            data: response.data.feriados.data||{},
                            intervalo: response.data.intervalo,
                            show: params.show||"2"
                        },
                        loadFinished:true,
                        redirect:<Redirect to={location}/>,
                        refresh:true

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


export const singleHandler = (endpoint,location) => {
    return function (params){
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({
                        data: {
                            data:response.data.feriados[0],
                            eventos:response.data.eventos,
                            intervalo:response.data.intervalo
                        },
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
