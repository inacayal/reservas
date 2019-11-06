/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elements
 */
import Formulario from './sub/Formulario';
import Calendario from './sub/Calendario';
/**
 * componentes
 */
import VerReserva from'./sub/VerReserva';
/**
 * constantes
 */
import {ALL_CONTROL} from '../../constantes/CalendarControls';
import { Route, Switch } from 'react-router-dom';
import {FormActions, Navegacion} from '../../acciones/ActionsByView';

export default function ReservasRouting (props) {
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <Calendario
                            nav={Navegacion.listado('/reservas')}
                            {...match}/>
                } />
            <Switch>
                <Route
                    path={props.match.url + '/agregar'}
                    component={
                        (match) =>
                            <Formulario
                                nav={Navegacion.agregar('/reservas')}
                                formActions = {FormActions()}
                                {...match} />
                    } />
                <Route
                    path={props.match.url + '/:id'}
                    component={
                        (match) =>
                            <VerReserva
                                nav={Navegacion.agregar('/reservas')}
                                formActions = {FormActions()}
                                {...match} />
                    } />
            </Switch>
        </>
    );
}
