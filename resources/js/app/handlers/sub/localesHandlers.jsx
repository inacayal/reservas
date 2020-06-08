import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';


export const localesHandlers = {
    list:[
        {
            endpoint:'/locales',
            match:/\/locales$/,
            callback:({params,user}) =>
                listHandler(`/usuario/locales/${user.id}`,'/locales')
        },
        {
            endpoint:'/locales/agregar',
            match:/\/locales\/(agregar)$/,
            callback:({params,user}) =>
                addFormHandler(`/usuario/add/${user.id}/1`,'/locales/agregar')
        },
        {
            endpoint:'/locales/editar/:id',
            match:/\/locales\/(editar\/\d+)$/,
            callback:({params,user}) =>
                editFormHandler(`/usuario/local/${params.id}`,`/locales/editar/${params.id}`)
        },
        {
            endpoint:'/locales/:id',
            match: /\/locales\/(\d+)$/,
            callback: ({params,user}) =>
                singleHandler(`/usuario/local/${params.id}`,`/locales/${params.id}`)
        }
    ],
    form: {
        add:sendPostRequest,
        edit:sendPutRequest
    }
};

const editFormHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return  request
                .then(
                    response => {
                        const data = response.data.data
                        this.setState({
                            data:data,
                            nombre:data.nombre,
                            loadFinished:true,
                            location:this.props.location,
                        });
                    }
                )
    }
}

const addFormHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return  request
                .then(
                    response => {
                        const data = response.data.usuarios.list;
                        this.setState({
                            data:data,
                            loadFinished:true,
                            location:this.props.location,
                        });
                    }
                )
    }
}




const listHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return  request
                .then(
                    response => {
                        this.setState({
                            data: response.data.locales.data,
                            loadFinished: true,
                            location:this.props.location,
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

        return  request
                .then(
                    response => {
                        const data = response.data.data;
                        this.setState({
                            data: response.data.data,
                            loadFinished:true,
                            nombre:data.nombre,
                            location:this.props.location,
                        });

                    }
                )
    }
}

export function sendPostRequest (data) {
    return POST({
        endpoint: 'locales/create',
        data: JSON.stringify(data)
    });
}

export function sendPutRequest (data) {
    return PUT({
        endpoint: 'locales/update',
        data: JSON.stringify(data)
    });
}
