/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elements
 */
import FeriadosRouting from './FeriadosRouting';
import AgregarFormulario from './agregar/AgregarFormulario';
import EditarFormulario from './editar/EditarFormulario';
import Horarios from './sub/Horarios';
/**
 * react router
 */
import { Route } from 'react-router-dom';

export default function HorariosRouting ({match}) {
    return (
        <>
            <Route 
                path={match.url}
                exact
                component = {
                    (match) => <Horarios {...match}/>
                } />
            <Route
                path={match.url + '/feriados'}
                component={
                    (match) => <FeriadosRouting {...match} />
                } />
            <Route
                path={match.url+'/agregar'}
                component={
                    (match) => 
                        <AgregarFormulario
                            showCalendar = {false}
                            {...match} />
                } />
            <Route
                path={match.url + '/editar/:id'}
                component={
                    (match) => 
                        <EditarFormulario
                            showCalendar = {false}
                            {...match} />
                } />
        </>
    );
}
