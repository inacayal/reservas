/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elements
 */
import Feriados from './sub/Feriados';
import AgregarFormulario from './agregar/AgregarFormulario';
import EditarFormulario from './editar/EditarFormulario';
/**
 * react router
 */
import { Route } from 'react-router-dom';

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
            <Route
                path={match.url + '/agregar'}
                component={
                    (match) => 
                        <AgregarFormulario
                            showCalendar={true}
                            {...match} />
                } />
            <Route
                path={match.url + '/editar/:id'}
                component={
                    (match) => 
                        <EditarFormulario
                            showCalendar={true}
                            {...match} />
                } />
        </>
    );
}
