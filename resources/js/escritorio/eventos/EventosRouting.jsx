/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import Formulario from './sub/Formulario';
import Eventos from './sub/Eventos';
import VerEvento from './sub/VerEvento';
import {Route, Switch} from 'react-router-dom';
import {Navegacion,FormActions} from '../../acciones/ActionsByView'


export default function EventosRouting (props) {

    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <Eventos
                            nav ={Navegacion.listado('/eventos')}
                            {...match} />
                } />
            <Switch>
                <Route
                    path={props.match.url + '/editar/:id'}
                    exact
                    component={
                        (match) =>
                            <Formulario
                                nav ={Navegacion.formulario(()=>false,match.match.params.id,'/eventos')}
                                actions={FormActions(match.match.params.id)}
                                editar={true}
                                {...match} />
                    } />
                <Route
                    path={props.match.url + '/agregar'}
                    component={
                        (match) =>
                            <Formulario
                                nav ={Navegacion.agregar('/eventos')}
                                editar={false}
                                actions={FormActions(null)}
                                {...match} />
                    } />
                <Route
                    path={props.match.url + '/:id'}
                    component={
                        (match) =>
                            <VerEvento
                                nav ={Navegacion.singular(()=>false,match.match.params.id,'/eventos')}
                                {...match} />
                    } />
            </Switch>
        </>
    );
}
