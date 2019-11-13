/**
 * react basic
 */
import React, { Component } from 'react';
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
    Promociones
} from './sub/Promociones';

import {
    singleHandler,
    VerPromocion
} from './sub/VerPromocion';

import RequestHandler from '../../hocs/RequestHandler';
import {ConfirmarModal} from '../../componentes/modal/Modal';
import { Route, Switch } from 'react-router-dom';
import {Navegacion,FormActions} from '../../acciones/ActionsByView';

export default function PromocionesRouting (props) {
    const modal = (props) => (
        <ConfirmarModal
            {...props}
            title={"Eliminar Promoción"}
            content={"¿estás seguro de eliminar este promoción?"} />
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
                                    <Promociones
                                        nav={Navegacion.listado('/promociones')}
                                        {...props} />
                            }
                            modal={modal}
                            fetchHandler={listHandler(`promociones/list/${user.id}`)}/>
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
                                            nav={Navegacion.formulario(()=>false,match.match.params.id,'/promociones')}
                                            formActions={FormActions()}
                                            {...props} />
                                    )
                                }
                                modal={modal}
                                fetchHandler={editFormHandler(`promociones/single/27/${match.match.params.id}`)}/>
                    } />
                <Route
                    path={`${props.match.url}/agregar`}
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
                                fetchHandler={addFormHandler(`promociones/add/${user.id}`)}/>
                    } />
                <Route
                    path={`${props.match.url}/:id`}
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) => (
                                        <VerPromocion
                                            nav={Navegacion.singular(()=>false,match.match.params.id,'/promociones')}
                                            {...props} />
                                    )
                                }
                                modal={modal}
                                fetchHandler={singleHandler(`/promociones/single/${user.id}/${match.match.params.id}`)}/>
                        } />
            </Switch>
        </>
    );
}
