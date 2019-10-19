/**
 * react basic
 */
import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elements
 */
import FeriadosRouting from './FeriadosRouting';
import HorarioFormulario from './formularios/HorarioFormulario';
import Horarios from './sub/Horarios';
import VerHorario from './sub/VerHorario';
/**
 * react router
 */
import { Route, Switch } from 'react-router-dom';

export default function HorariosRouting (props) {
    const match = props.match;
    //useEffect(() => props.changeNav(['2']),[]);
    return (
        <>
            <Route 
                path={match.url}
                exact
                component = {
                    (match) => <Horarios current={['2']} {...match}/>
                } />
            <Switch>
                <Route
                    path={match.url + '/feriados'}
                    component={
                        (match) => <FeriadosRouting current={['2','0']} {...match} />
                    } />
                <Route
                    path={match.url + '/agregar/:day'}
                    component={
                        (match) =>
                            <HorarioFormulario
                                editar={false}
                                {...match} />
                    } />
                <Route
                    path={match.url + '/editar/:id'}
                    component={
                        (match) =>
                            <HorarioFormulario
                                editar={true}
                                {...match} />
                    } />
                <Route
                    path={match.url + '/:id'}
                    component={
                        (match) =>
                            <VerHorario
                                {...match} />
                    } />
            </Switch>
        </>
    );
}
