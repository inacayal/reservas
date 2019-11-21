import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {GET} from '../../utils/api';
import {generateHoursFromInterval} from '../../utils/Helper';
import {DAYS} from '../../constantes/DaysMonths';

export const horariosHandlers = [
    {
        endpoint:'/horarios',
        match:/\/horarios$/,
        callback:(params) =>
            listHandler(`/horarios/list/${user.id}`,`/horarios`)
    },
    {
        endpoint:'/horarios/agregar/:day',
        match:/\/horarios\/(agregar\/\d+)$/,
        callback:(params) =>
            addFormHandler(`/horarios/add/${user.id}`,`/horarios/agregar/${params.day}`)
    },
    {
        endpoint:'/horarios/editar/:id',
        match:/\/horarios\/(editar\/\d+)$/,
        callback:(params) =>
            editFormHandler(`/horarios/single/${user.id}/${params.id}`,`/horarios/editar/${params.id}`)
    },
    {
        endpoint:'/horarios/:id',
        match: /\/horarios\/(\d+)$/,
        callback: (params) =>
            singleHandler(`/horarios/single/${user.id}/${params.id}`,`/horarios/${params.id}`)
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
                    const data = response.data.horarios[0],
                        nombre = DAYS[parseInt(data.diaSemana)-1];
                    this.setState({
                        data:{
                            horarios:data,
                            eventos:response.data.eventos,
                            minutes: generateHoursFromInterval(response.data.intervalo),
                            side: response.data.horarios[0].estado === 'laboral'
                        },
                        nombre:`Horario del ${nombre}`,
                        redirect:<Redirect to={location}/>,
                        loadFinished: true
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

const addFormHandler = (endpoint,location) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    this.setState({
                        data:{
                            horarios: null,
                            eventos: response.data.eventos,
                            minutes: generateHoursFromInterval(response.data.intervalo)
                        },
                        redirect:<Redirect to={location}/>,
                        loadFinished: true
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
                        data: response.data.horarios.data,
                        redirect:<Redirect to={location}/>,
                        loadFinished:true
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
                    const data = response.data.horarios[0],
                        nombre = DAYS[parseInt(data.diaSemana)-1];
                    this.setState({
                        data: data,
                        nombre:`Horario del ${nombre}`,
                        redirect:<Redirect to={location}/>,
                        loadFinished:true
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