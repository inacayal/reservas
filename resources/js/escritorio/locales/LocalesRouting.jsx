/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import AgregarFormulario from './sub/AgregarFormulario';
import Locales from './sub/Locales';
import VerLocal from './sub/VerLocal';
import {Route, Switch} from 'react-router-dom';

export default function LocalesRouting (props) {
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <Locales
                            load={props.load}
                            {...match} />
                } />
                <Switch>
                    <Route
                        path={props.match.url + '/editar/:id'}
                        exact
                        component={
                            (match) =>
                                <AgregarFormulario
                                    editar={true}
                                    {...match} />
                        } />
                    <Route
                        path={props.match.url + '/agregar'}
                        component={
                            (match) =>
                                <AgregarFormulario
                                    editar={false}
                                    {...match} />
                        } />
                    <Route
                        path={props.match.url + '/:id'}
                        component={
                            (match) =>
                                <VerLocal
                                    {...match} />
                        } />                        
                </Switch>
        </>
    );
    
}
