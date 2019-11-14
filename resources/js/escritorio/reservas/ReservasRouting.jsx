import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch} from 'react-router-dom';
/**
 * sub elementos
 */
import {
    Formulario,
    formHandler
} from './sub/Formulario';

import {
    listHandler,
    Calendario
} from './sub/Calendario';

import {
    singleHandler,
    VerReserva
} from './sub/VerReserva';

import {
    Navegacion,
    FormActions
} from '../../acciones/ActionsByView';

import RequestHandler from '../../hocs/RequestHandler';


export const handlers = [
    {
        endpoint:'/reservas',
        match:/\/reservas$/,
        handler:(params) =>
            listHandler(`reservas/list/${user.id}/`),
        component:
            (props) =>
                <Calendario
                    data={props.data}
                    nav={Navegacion.listado('/reservas')}/>
    },
    {
        endpoint:'/reservas/agregar',
        match:/\/reservas\/(agregar)$/,
        handler:(params) =>
            formHandler(`reservas/add/${user.id}/`),
        component:
            (props) =>
                <Formulario
                    editar={false}
                    data={props.data}
                    formActions = {FormActions()}
                    nav={Navegacion.agregar('/reservas')}/>
    },
    {
        endpoint:'/reservas/:id',
        match: /\/reservas\/(\d+)$/,
        handler: (params) =>
            singleHandler(`/reservas/single/${user.id}/${params.id}`),
        component:
            (props) =>
                <VerReserva
                    data={props.data}
                    nav={Navegacion.singular(()=>false,props.match.params.id,'/reservas')}/>

    }
];

export function ReservasRouting (props) {
    if (!props.loaded){
        return (
            <props.oldComponent.component
                {...props}/>
        )
    }
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <Calendario
                            data={props.data}
                            nav={Navegacion.listado('/reservas')} {...match}/>
                } />
            <Switch>
                <Route
                    path={`${props.match.url}/agregar`}
                    component={
                        (match) =>
                            <Formulario
                                editar={false}
                                data={props.data}
                                formActions = {FormActions()}
                                nav={Navegacion.agregar('/reservas')} {...match}/>
                    } />
                <Route
                    path={`${props.match.url}/:id`}
                    component={
                        (match) =>
                            <VerReserva
                                data={props.data}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'/reservas')} {...match}/>
                    } />
            </Switch>
        </>
    );
}
