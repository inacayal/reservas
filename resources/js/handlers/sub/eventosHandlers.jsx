import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';
import { assignHorarios } from '../../generators/generateEventosCard';

export const eventosHandlers = {
    list: [
        {
            endpoint:'/eventos',
            match:/\/eventos$/,
            callback:(params) =>
                listHandler(`/eventos/list/${user.id}`,`/eventos`,params)
        },
        {
            endpoint:'/eventos/agregar',
            match:/\/eventos\/(agregar)$/,
            callback:(params) =>
                addFormHandler(`/eventos/add/${user.id}`,`/eventos/agregar`,params)
        },
        {
            endpoint:'/eventos/editar/:id',
            match:/\/eventos\/(editar\/\d+)$/,
            callback:(params) =>
                editFormHandler(`eventos/single/${user.id}/${params.id}`,`/eventos/editar/${params.id}`,params)
        },
        {
            endpoint:'/eventos/:id',
            match: /\/eventos\/(\d+)$/,
            callback: (params) =>
                singleHandler(`/eventos/single/${user.id}/${params.id}`,`/eventos/${params.id}`,params)
        }
    ],
    form: {
        add:sendPostRequest,
        edit:sendPutRequest
    }
};

const editFormHandler = (endpoint,location,params) => {
    return function (component) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return  request
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
                            nombre:data.selected.nombre,
                            loadFinished:true,
                            location:this.props.location
                        });
                        return true;
                    }
                )
                .catch((err) => err);
    }
}

const addFormHandler = (endpoint,location) => {
    return function (component) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return  request
                .then(
                    response => {
                        let data = response.data;
                        data.horarios.list = assignHorarios(data.horarios.list)[0];
                        this.setState({
                            data: {...data},
                            nombre:null,
                            loadFinished:true,
                            location:this.props.location
                        });
                        return true;
                    }
                )
                .catch((err) => err);
    }
}

const listHandler = (endpoint,location) => {
    return function (component) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return  request
                .then(
                    response => {
                        this.setState({
                            data: response.data.eventos.data,
                            loadFinished:true,
                            nombre:null,
                            location:this.props.location
                        });
                        return true;
                    }
                )
                .catch((err) => err);
    }
}

const singleHandler = (endpoint,location) => {
    return function (component) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return  request
                .then(
                    response => {
                        const data = response.data.eventos[0];
                        this.setState({
                            data:data,
                            nombre:data.nombre,
                            loadFinished:true,
                            location:this.props.location
                        });
                        return true;
                    }
                )
                .catch((err) => err);
    }
}

export function sendPostRequest (data) {
    const request = POST({
        endpoint: 'eventos/create',
        data: JSON.stringify(data)
    });

    request
        .then(this.dataSuccess)
        .catch(this.displayBackendErrors)
}

export function sendPutRequest (
    data,
    displayErrors
) {
    const request = PUT({
        endpoint: 'eventos/update',
        data: JSON.stringify(data)
    });
    request
        .then(this.dataSuccess)
        .catch(this.displayBackendErrors)
}
