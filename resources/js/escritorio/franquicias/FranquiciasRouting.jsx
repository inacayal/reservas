/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import Formulario from './sub/Formulario';
import Franquicias from './sub/Franquicias';
import VerFranquicia from './sub/VerFranquicia';
import { Route, Switch } from 'react-router-dom';
import {Navegacion} from '../../acciones/ActionsByView';

export default function FranquiciasRouting (props) {
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <Franquicias
                            nav ={Navegacion.listado('/franquicias')}
                            {...match} />
                } />
            <Switch>
                <Route
                    path={props.match.url + '/editar/:id'}
                    exact
                    component={
                        (match) =>
                            <Formulario
                                nav ={Navegacion.formulario(()=>false,match.match.params.id,'/franquicias')}
                                editar={true}
                                {...match} />
                    } />
                <Route
                    path={props.match.url + '/agregar'}
                    component={
                        (match) =>
                            <Formulario
                                nav ={Navegacion.agregar('/franquicias')}
                                editar={false}
                                {...match} />
                    } />
                <Route
                    path={props.match.url + '/:id'}
                    component={
                        (match) =>
                            <VerFranquicia
                                nav ={Navegacion.singular(()=>false,match.match.params.id,'/franquicias')}
                                {...match} />
                    } />
            </Switch>

        </>
    );
}
