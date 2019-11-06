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
import {Navegacion,FormActions} from '../../acciones/ActionsByView';

export default function FeriadosRouting(props) {
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <Feriados
                            nav={Navegacion.listado('/horarios/feriados')}
                            {...match} />
                } />
            <Switch>
                <Route
                    path={props.match.url + '/agregar'}
                    component={
                        (match) =>
                            <FeriadoFormulario
                                editar={false}
                                nav={Navegacion.agregar('/horarios/feriados')}
                                formActions={FormActions()}
                                {...match} />
                    } />
                <Route
                    path={props.match.url + '/editar/:id'}
                    component={
                        (match) =>
                            <FeriadoFormulario
                                nav={Navegacion.formulario(()=>false,match.match.params.id,'/horarios/feriados')}
                                formActions={FormActions()}
                                editar={true}
                                {...match} />
                    } />
                <Route
                    path={props.match.url + '/:id'}
                    component={
                        (match) =>
                            <VerFeriado
                                nav={Navegacion.singular(()=>false,match.match.params.id,'/horarios/feriados')}
                                {...match} />
                    } />
            </Switch>
        </>
    );
}
