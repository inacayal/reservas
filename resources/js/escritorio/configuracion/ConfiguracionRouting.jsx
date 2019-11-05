/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * form sub elements
 */
import Establecimiento from './sub/Establecimiento';
import Usuario from './sub/Usuario';
import Reservas from './sub/Reservas';
import Configuracion from './sub/Configuracion';

import {Route} from 'react-router-dom';
import {Navegacion,FormActions} from '../../acciones/ActionsByView';

export default function ConfiguracionRouting (props){
    const nav = Navegacion.agregar('/configuracion');
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <Configuracion
                            {...match} />
                } />
            <Route
                path={props.match.url+'/usuario'}
                component={
                    (match) =>
                        <Usuario
                        formActions={FormActions()}
                            nav={nav}
                            {...match} />
                } />
            <Route
                path={props.match.url + '/establecimiento'}
                component={
                    (match) =>
                        <Establecimiento
                            formActions={FormActions()}
                            nav={nav}
                            {...match} />
                } />
            <Route
                path={props.match.url + '/reservas'}
                component={
                    (match) =>
                        <Reservas
                            formActions={FormActions()}
                            nav={nav}
                            {...match}/>
                } />
        </>
    );
}
