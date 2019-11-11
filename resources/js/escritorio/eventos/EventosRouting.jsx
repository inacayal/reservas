/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import {
    editFormHandler,
    addFormHandler,
    Formulario
} from './sub/Formulario';

import {
    listHandler,
    Eventos
} from './sub/Eventos';

import {
    singleHandler,
    VerEvento
} from './sub/VerEvento';

import {Route, Switch} from 'react-router-dom';
import {Navegacion,FormActions} from '../../acciones/ActionsByView'
import {ConfirmarModal} from '../../componentes/modal/Modal';

export function EventosRouting (props) {
    const modal = (props) => (
        <ConfirmarModal
            {...props}
            title={"Eliminar Evento"}
            content={"¿estás seguro de eliminar este evento?"} />
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
                                    <Eventos
                                        nav={Navegacion.listado('/eventos')}
                                        {...props} />
                            }
                            modal={modal}
                            fetchHandler={listHandler('eventos/add/27')}/>
                } />
            <Switch>
                <Route
                    path={props.match.url + '/editar/:id'}
                    exact
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) => (
                                        <Formulario
                                            editar={true}
                                            nav={Navegacion.formulario(()=>false,match.match.params.id,'/eventos')}
                                            formActions={FormActions()}
                                            {...props} />
                                    )
                                }
                                modal={modal}
                                fetchHandler={editFormHandler('eventos/single/27/' + this.props.match.params.id)}/>
                    } />
                <Route
                    path={props.match.url + '/agregar'}
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) =>(
                                        <Formulario
                                            nav={Navegacion.agregar('/promociones')}
                                            formActions = {FormActions()}
                                            editar={false}
                                            {...props} />
                                    )
                                }
                                modal={modal}
                                fetchHandler={addFormHandler('promociones/add/27')}/>
                    } />
                <Route
                    path={props.match.url + '/:id'}
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) => (
                                        <VerEvento
                                            nav={Navegacion.singular(()=>false,match.match.params.id,'/promociones')}
                                            {...props} />
                                    )
                                }
                                modal={modal}
                                fetchHandler={singleHandler('/eventos/single/27/'+this.props.match.params.id)}/>
                        } />
            </Switch>
        </>
    );
}
