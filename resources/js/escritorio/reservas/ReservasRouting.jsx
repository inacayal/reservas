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

export default function ReservasRouting (props) {
    const modal = (props) => (
        <></>
    );
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <RequestHandler
                            component={
                                (props) =>
                                    <Calendario
                                        nav={Navegacion.listado('/reservas')} {...props}/>
                            }
                            modal={modal}
                            fetchHandler={listHandler('reservas/list/'+27 +'/')}/>
                } />
            <Switch>
                <Route
                    path={props.match.url + '/agregar'}
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) =>{
                                        return (
                                            <Formulario
                                                nav={Navegacion.agregar('/reservas')}
                                                formActions = {FormActions()}
                                                editar={false}
                                                {...props} />
                                        )
                                    }
                                }
                                modal={modal}
                                fetchHandler={formHandler('reservas/add/' + 27 + '/')}/>

                    } />
                <Route
                    path={props.match.url + '/:id'}
                    component={
                        (match) =>
                        <RequestHandler
                            component ={
                                (props) => (
                                    <VerReserva
                                        nav={Navegacion.singular(()=>false,match.match.params.id,'/reservas')}
                                        {...props} />
                                )
                            }
                            modal={modal}
                            fetchHandler={singleHandler('/reservas/single/27/'+match.match.params.id)}/>
                    } />
            </Switch>
        </>
    );
}
