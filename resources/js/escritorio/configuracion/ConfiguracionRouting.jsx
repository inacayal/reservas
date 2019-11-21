/**
 * react basic
 */
 import {Switch,Route} from 'react-router-dom';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * form sub elements
 */
import {Establecimiento} from './sub/Establecimiento';
import {Usuario} from './sub/Usuario';
import {Reservas} from './sub/Reservas';
import {Configuracion} from './sub/Configuracion';
import {Navegacion,FormActions} from '../../acciones/ActionsByView';

 export default function ConfiguracionRouting (props) {
    const nav = Navegacion.agregar('configuracion');
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <Configuracion data={props.data} {...match} />
                } />
            <Route
                path={`${props.match.url}/usuario`}
                exact
                component={
                    (match) => (
                        <Usuario
                            data={props.data}
                            formActions={FormActions()}
                            nav={nav} {...match} />
                    )
                } />
            <Route
                path={`${props.match.url}/establecimiento`}
                component={
                    (match) =>(
                        <Establecimiento
                            data={props.data}
                            formActions={FormActions()}
                            nav={nav} {...match} />
                    )
                }/>
            <Route
                path={`${props.match.url}/reservas`}
                component={
                    (match) => (
                        <Reservas
                            data={props.data}
                            formActions={FormActions()}
                            nav={nav} {...match}/>
                    )
                } />
        </>
    );
}
