/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elements
 */
import FeriadosRouting from './FeriadosRouting';
import HorarioFormulario from './formularios/HorarioFormulario';
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
                        <HorarioFormulario
                            showCalendar = {false}
                            {...match} />
                } />
            <Route
                path={match.url + '/editar/:id'}
                component={
                    (match) => 
                        <HorarioFormulario
                            showCalendar = {false}
                            {...match} />
                } />
        </>
    );
}
