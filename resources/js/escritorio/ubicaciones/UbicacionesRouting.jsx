/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import Formulario from './sub/Formulario';
import Ubicaciones from './sub/Ubicaciones';
import VerUbicacion from './sub/VerUbicacion';
import {Route,Switch} from 'react-router-dom';
import {Navegacion,FormActions} from '../../acciones/ActionsByView';

export default function UbicacionesRouting (props) {
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <Ubicaciones
                            nav={Navegacion.listado('/ubicaciones')}
                            {...match}/>
                } />
            <Switch>
                <Route
                    path={props.match.url + '/editar/:id'}
                    exact
                    component={
                        (match) =>
                            <Formulario
                                nav={Navegacion.formulario(()=>false,match.match.params.id,'/ubicaciones')}
                                formActions = {FormActions()}
                                editar={true}
                                {...match} />
                    } />
                <Route
                    path={props.match.url + '/agregar'}
                    component={
                        (match) =>
                            <Formulario
                                nav={Navegacion.agregar('/ubicaciones')}
                                formActions = {FormActions()}
                                editar={false}
                                {...match} />
                    } />
                <Route
                    path={props.match.url + '/:id'}
                    component={
                        (match) =>
                            <VerUbicacion
                                nav={Navegacion.singular(()=>false,match.match.params.id,'/ubicaciones')}
                                {...match} />
                    } />
            </Switch>
        </>
    );
}
