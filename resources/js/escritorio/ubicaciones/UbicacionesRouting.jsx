/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch} from 'react-router-dom';
/**
 * sub elementos
 */
import {
    Formulario,
    editFormHandler,
    addFormHandler
} from './sub/Formulario';

import {
    handler as listHandler,
    Ubicaciones
} from './sub/Ubicaciones';

import {
    singleHandler,
    VerUbicacion
} from './sub/VerUbicacion';

import {
    Navegacion,
    FormActions
} from '../../acciones/ActionsByView';

import RequestHandler from '../../hocs/RequestHandler';
import {ConfirmarModal} from '../../componentes/modal/Modal';

export default function UbicacionesRouting (props) {
    const modal = (props) => (
        <ConfirmarModal
            {...props}
            title={"Eliminar Ubicación"}
            content={"¿estás seguro de eliminar este ubicación?"} />
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
                                (match) =>
                                    <Ubicaciones
                                        nav={Navegacion.listado('/ubicaciones')} {...match}/>
                            }
                            modal={modal}
                            fetchHandler={listHandler('ubicaciones/list/27')}/>
                } />
            <Switch>
                <Route
                    path={props.match.url + '/editar/:id'}
                    exact
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) =>{
                                        return (
                                            <Formulario
                                                nav={Navegacion.formulario(()=>false,match.match.params.id,'/ubicaciones')}
                                                formActions = {FormActions()}
                                                editar={true}
                                                {...props} />
                                        )
                                    }
                                }
                                modal={modal}
                                fetchHandler={editFormHandler('ubicaciones/single/27/'+match.match.params.id)}/>
                    } />
                <Route
                    path={props.match.url + '/agregar'}
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) =>{
                                        return (
                                            <Formulario
                                                nav={Navegacion.agregar('/ubicaciones')}
                                                formActions = {FormActions()}
                                                editar={false}
                                                {...props} />
                                        )
                                    }
                                }
                                modal={modal}
                                fetchHandler={addFormHandler('ubicaciones/single/27/'+match.match.params.id)}/>

                    } />
                <Route
                    path={props.match.url + '/:id'}
                    component={
                        (match) =>
                        <RequestHandler
                            component ={
                                (props) => (
                                    <VerUbicacion
                                        nav={Navegacion.singular(()=>false,match.match.params.id,'/ubicaciones')}
                                        {...props} />
                                )
                            }
                            modal={modal}
                            fetchHandler={singleHandler('/ubicaciones/single/27/'+match.match.params.id)}/>
                    } />
            </Switch>
        </>
    );
}
