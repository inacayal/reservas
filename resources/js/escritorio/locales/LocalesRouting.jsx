/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import {Route, Switch} from 'react-router-dom';
import {Navegacion,FormActions} from '../../acciones/ActionsByView';
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
    Locales
} from './sub/Locales';

import {
    singleHandler,
    VerLocal
} from './sub/VerLocal';

import RequestHandler from '../../hocs/RequestHandler';
import {ConfirmarModal} from '../../componentes/modal/Modal';

export default function LocalesRouting (props) {
    const modal = (props) => (
        <ConfirmarModal
            {...props}
            title={"Eliminar Local"}
            content={"¿estás seguro de eliminar este local?"} />
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
                                    <Locales
                                        nav={Navegacion.listado('/locales')}
                                        {...props} />
                            }
                            modal={modal}
                            fetchHandler={listHandler(`/usuario/locales/${user.id}`)}/>
                } />
            <Switch>
                <Route
                    path={`${props.match.url}/editar/:id`}
                    exact
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) => (
                                        <Formulario
                                            editar={true}
                                            nav={Navegacion.formulario(()=>false,match.match.params.id,'/locales')}
                                            formActions={FormActions()}
                                            {...props} />
                                    )
                                }
                                modal={modal}
                                fetchHandler={editFormHandler(`/usuario/local/${match.match.params.id}`)}/>
                    } />
                <Route
                    path={`${props.match.url}/agregar`}
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) =>(
                                        <Formulario
                                            nav={Navegacion.agregar('/locales')}
                                            formActions = {FormActions()}
                                            editar={false}
                                            {...props} />
                                    )
                                }
                                modal={modal}
                                fetchHandler={addFormHandler(`/usuario/add/${user.id}/1`)}/>
                    } />
                <Route
                    path={`${props.match.url}/:id`}
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) => (
                                        <VerLocal
                                            nav={Navegacion.singular(()=>false,match.match.params.id,'/locales')}
                                            {...props} />
                                    )
                                }
                                modal={modal}
                                fetchHandler={singleHandler(`/usuario/local/${match.match.params.id}`)}/>
                        } />
            </Switch>
        </>
    );
}
