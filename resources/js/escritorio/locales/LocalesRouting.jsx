/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import Formulario from './sub/Formulario';
import Locales from './sub/Locales';
import VerLocal from './sub/VerLocal';
import {Route, Switch} from 'react-router-dom';
import {Navegacion,FormActions} from '../../acciones/ActionsByView';

export default function LocalesRouting (props) {
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <Locales
                            nav={Navegacion.listado('locales')}
                            load={props.load}
                            {...match} />
                } />
                <Switch>
                    <Route
                        path={props.match.url + '/editar/:id'}
                        exact
                        component={
                            (match) =>
                                <Formulario
                                    nav={Navegacion.formulario(()=>false,match.match.params.id,'/locales')}
                                    editar={true}
                                    formActions={FormActions()}
                                    {...match} />
                        } />
                    <Route
                        path={props.match.url + '/agregar'}
                        component={
                            (match) =>
                                <Formulario
                                    nav={Navegacion.agregar('/locales')}
                                    formActions={FormActions()}
                                    editar={false}
                                    {...match} />
                        } />
                    <Route
                        path={props.match.url + '/:id'}
                        component={
                            (match) =>
                                <VerLocal
                                    nav={Navegacion.singular(()=>false,match.match.params.id,'/locales')}
                                    {...match} />
                        } />
                </Switch>
        </>
    );

}
