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
import {Navegacion,FormActions} from '../../acciones/ActionsByView';

export default function HorariosRouting (props) {
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component = {
                    (match) =>
                        <Horarios
                            {...match}/>
                } />
            <Switch>
                <Route
                    path={props.match.url + '/feriados'}
                    component={
                        (match) => <FeriadosRouting {...match} />
                    } />
                <Route
                    path={props.match.url + '/agregar/:day'}
                    component={
                        (match) =>
                            <HorarioFormulario
                                nav={Navegacion.agregar('/horarios')}
                                editar={false}
                                {...match} />
                    } />
                <Route
                    path={props.match.url + '/editar/:id'}
                    component={
                        (match) =>
                            <HorarioFormulario
                                nav={Navegacion.formulario(()=>false,match.match.params.id,'/horarios')}
                                formActions={FormActions()}
                                editar={true}
                                {...match} />
                    } />
                <Route
                    path={props.match.url + '/:id'}
                    component={
                        (match) =>
                            <VerHorario
                                nav={Navegacion.singular(()=>false,match.match.params.id,'/horarios')}
                                formActions={FormActions()}
                                {...match} />
                    } />
            </Switch>
        </>
    );
}
