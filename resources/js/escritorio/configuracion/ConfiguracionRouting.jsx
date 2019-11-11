/**
 * react basic
 */
 import {Switch,Route} from 'react-router-dom';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * form sub elements
 */
import {
    establecimientoHandler,
    Establecimiento
} from './sub/Establecimiento';

import {
    usuarioHandler,
    Usuario
} from './sub/Usuario';

import {
    reservaHandler,
    Reservas
} from './sub/Reservas';

import {
    configuracionHandler,
    Configuracion
} from './sub/Configuracion';

import {
    Navegacion,
    FormActions
} from '../../acciones/ActionsByView';

import RequestHandler from '../../hocs/RequestHandler';

 export default function ConfiguracionRouting (props) {
    const nav = Navegacion.agregar('/configuracion'),
        modal = (props) => (
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
                                    <Configuracion {...props} />
                            }
                            modal={modal}
                            fetchHandler={configuracionHandler('usuario/local/27')}/>
                } />
            <Route
                path={props.match.url + '/usuario'}
                exact
                component={
                    (match) =>
                        <RequestHandler
                            component ={
                                (props) => (
                                    <Usuario
                                        formActions={FormActions()}
                                        nav={nav}
                                        {...props} />
                                )
                            }
                            modal={modal}
                            fetchHandler={usuarioHandler('usuario/local/27')}/>
                } />
            <Route
                path={props.match.url + '/establecimiento'}
                component={
                    (match) =>
                        <RequestHandler
                            component ={
                                (props) =>(
                                    <Establecimiento
                                        formActions={FormActions()}
                                        nav={nav}
                                        {...props} />
                                )
                            }
                            modal={modal}
                            fetchHandler={establecimientoHandler('usuario/local/27')}/>
                } />
            <Route
                path={props.match.url + '/reservas'}
                component={
                    (match) =>
                        <RequestHandler
                            component ={
                                (props) => (
                                    <Reservas
                                        formActions={FormActions()}
                                        nav={nav}
                                        {...props}/>
                                )
                            }
                            modal={modal}
                            fetchHandler={reservaHandler('usuario/local/27')}/>
                    } />
        </>
    );
}
