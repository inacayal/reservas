import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch} from 'react-router-dom';
/**
 * sub elementos
 */
import {Formulario} from './sub/Formulario';
import {Calendario} from './sub/Calendario';
import {VerReserva} from './sub/VerReserva';
import{Navegacion,FormActions} from '../../acciones/ActionsByView';

export default function ReservasRouting (props) {
    return (
        <>
            <Route
                path={props.match.url}
                exact
                render={
                    (match) =>
                        <Calendario
                            data={props.data}
                            nav={Navegacion.listado('/reservas')} {...match}/>
                } />
            <Switch>
                <Route
                    path={`${props.match.url}/agregar`}
                    render={
                        (match) =>
                            <Formulario
                                editar={false}
                                data={props.data}
                                formActions = {FormActions()}
                                nav={Navegacion.agregar('/reservas')} {...match}/>
                    } />
                <Route
                    path={`${props.match.url}/:id`}
                    render={
                        (match) =>
                            <VerReserva
                                data={props.data}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'/reservas')} {...match}/>
                    } />
            </Switch>
        </>
    );
}
