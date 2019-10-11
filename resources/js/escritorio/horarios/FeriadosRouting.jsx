/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elements
 */
import Feriados from './sub/Feriados';
import FeriadoFormulario from './formularios/FeriadoFormulario';
import VerFeriado from './sub/VerFeriado';
/**
 * react router
 */
import { Route, Switch } from 'react-router-dom';

export default function FeriadosRouting({ match }) {
    return (
        <>
            <Route
                path={match.url}
                exact
                component={
                    (match) => 
                        <Feriados {...match} />
                } />
            <Switch>
                <Route
                    path={match.url + '/agregar'}
                    component={
                        (match) =>
                            <FeriadoFormulario
                                editar={false}
                                {...match} />
                    } />
                <Route
                    path={match.url + '/editar/:id'}
                    component={
                        (match) =>
                            <FeriadoFormulario
                                editar={true}
                                {...match} />
                    } />
                <Route
                    path={match.url + '/:id'}
                    component={
                        (match) =>
                            <VerFeriado
                                {...match} />
                    } />
            </Switch>
        </>
    );
}
