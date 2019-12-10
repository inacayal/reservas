import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {GET} from '../../utils/api';

export const escritorioHandlers = {
    list:[
        {
            endpoint:'/',
            match:/^\/$/,
            callback:(params) =>
                escritorioHandler(`usuario/local/${user.id}`,'/')
        }
    ],
    form:{}
};


const escritorioHandler = (endpoint,location) => {
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
