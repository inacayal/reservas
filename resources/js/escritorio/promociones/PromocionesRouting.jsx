/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import Formulario from './sub/Formulario';
import Promociones from './sub/Promociones';
import VerPromocion from './sub/VerPromocion';
import { Route, Switch } from 'react-router-dom';

import {Navegacion,FormActions} from '../../acciones/ActionsByView';

export default function PromocionesRouting (props) {
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <Promociones
                            nav={Navegacion.listado('/promociones')}
                            {...match} />
                } />
            <Switch>
                <Route
                    path={props.match.url + '/editar/:id'}
                    exact
                    component={
                        (match) =>
                            <Formulario
                                editar={true}
                                nav={Navegacion.formulario(()=>false,match.match.params.id,'/promociones')}
                                formActions={FormActions()}
                                {...match} />
                    } />
                <Route
                    path={props.match.url + '/agregar'}
                    component={
                        (match) =>
                            <Formulario
                                editar={false}
                                nav={Navegacion.agregar('/promociones')}
                                formActions={FormActions()}
                                {...match} />
                    } />
                <Route
                    path={props.match.url + '/:id'}
                    component={
                        (match) =>
                            <VerPromocion
                                editar={false}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'/promociones')}
                                {...match} />
                    } />
            </Switch>
        </>
    );
}
