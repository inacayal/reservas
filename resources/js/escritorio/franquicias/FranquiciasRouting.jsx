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
    listHandler,
    Franquicias
} from './sub/Franquicias';

import {
    singleHandler,
    VerFranquicia
} from './sub/VerFranquicia';

import {
    Navegacion,
    FormActions
} from '../../acciones/ActionsByView';

import RequestHandler from '../../hocs/RequestHandler';
import {ConfirmarModal} from '../../componentes/modal/Modal';

export default function FranquiciasRouting (props) {
    const modal = (props) => (
        <ConfirmarModal
            {...props}
            title={"Eliminar Franquicia"}
            content={"¿estás seguro de eliminar este franquicia?"} />
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
                                    <Franquicias
                                        nav={Navegacion.listado('/franquicias')} {...props}/>
                            }
                            modal={modal}
                            fetchHandler={listHandler(`/usuario/franquicias/${user.id}`)}/>
                } />
            <Switch>
                <Route
                    path={`${props.match.url}/editar/:id`}
                    exact
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) =>{
                                        return (
                                            <Formulario
                                                nav={Navegacion.formulario(()=>false,match.match.params.id,'/franquicias')}
                                                formActions = {FormActions()}
                                                editar={true}
                                                {...props} />
                                        )
                                    }
                                }
                                modal={modal}
                                fetchHandler={editFormHandler(`/usuario/franquicia/${match.match.params.id}`)}/>
                    } />
                <Route
                    path={`${props.match.url}/agregar`}
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) =>{
                                        return (
                                            <Formulario
                                                nav={Navegacion.agregar('/franquicias')}
                                                formActions = {FormActions()}
                                                editar={false}
                                                {...props} />
                                        )
                                    }
                                }
                                modal={modal}
                                fetchHandler={addFormHandler()}/>

                    } />
                <Route
                    path={`${props.match.url}/:id`}
                    component={
                        (match) =>
                        <RequestHandler
                            component ={
                                (props) => (
                                    <VerFranquicia
                                        nav={Navegacion.singular(()=>false,match.match.params.id,'/franquicias')}
                                        {...props} />
                                )
                            }
                            modal={modal}
                            fetchHandler={singleHandler(`/usuario/franquicia/${match.match.params.id}`)}/>
                    } />
            </Switch>
        </>
    );
}
