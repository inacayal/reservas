import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch} from 'react-router-dom';
/**
 * sub elementos
 */
import {
    FeriadoFormulario,
    editFormHandler,
    addFormHandler
} from './formularios/FeriadoFormulario';

import {
    listHandler,
    Feriados
} from './sub/Feriados';

import {
    singleHandler,
    VerFeriado
} from './sub/VerFeriado';

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
            title={"Eliminar Feriado"}
            content={"¿estás seguro de eliminar este feriado?"} />
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
                                    <Feriados
                                        nav={Navegacion.listado('/horarios/feriados')}
                                        {...props} />
                            }
                            modal={modal}
                            fetchHandler={listHandler('/feriados/list/27/')}/>
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
                                            <FeriadoFormulario
                                                nav={Navegacion.formulario(()=>false,match.match.params.id,'/horarios/feriados')}
                                                formActions={FormActions()}
                                                editar={true}
                                                {...props} />
                                        )
                                    }
                                }
                                modal={modal}
                                fetchHandler={editFormHandler('/feriados/single/27/' + match.match.params.id)}/>
                    } />
                <Route
                    path={props.match.url + '/agregar'}
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) =>{
                                        return (
                                            <FeriadoFormulario
                                                editar={false}
                                                nav={Navegacion.agregar('/horarios/feriados')}
                                                formActions={FormActions()}
                                                {...props} />
                                        )
                                    }
                                }
                                modal={modal}
                                fetchHandler={addFormHandler('/feriados/add/27/')}/>

                    } />
                <Route
                    path={props.match.url + '/:id'}
                    component={
                        (match) =>
                        <RequestHandler
                            component ={
                                (props) => (
                                    <VerFeriado
                                        nav={Navegacion.singular(()=>false,match.match.params.id,'/horarios/feriados')}
                                        {...props} />
                                )
                            }
                            modal={modal}
                            fetchHandler={singleHandler('/feriados/single/27/' + match.match.params.id)}/>
                    } />
            </Switch>
        </>
    );
}
