/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import {Formulario} from './sub/Formulario';
import {Promociones} from './sub/Promociones';
import {VerPromocion} from './sub/VerPromocion';
import {ConfirmarModal} from '../../componentes/modal/Modal';

import { Route, Switch } from 'react-router-dom';
import {Navegacion,FormActions} from '../../acciones/ActionsByView';

export default function PromocionesRouting (props) {
    const [open,toggle] = useState(false),
        openModal = (e) => {
            e.preventDefault();
            toggle(true);
        },
        closeModal = (e) => {
            e.preventDefault();
            toggle(false);
        };
    return (
        <>
            <ConfirmarModal
                open={open}
                closeModal={closeModal}
                title={"Eliminar Promoción"}
                content={"¿estás seguro de eliminar este promoción?"} />
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <Promociones
                            data={props.data}
                            toggleModal={openModal}
                            nav={Navegacion.listado('/promociones')} {...match} />
                } />
            <Switch>
                <Route
                    path={`${props.match.url}/editar/:id`}
                    exact
                    component={
                        (match) =>
                            <Formulario
                                data={props.data}
                                editar={true}
                                toggleModal={openModal}
                                nav={Navegacion.formulario(()=>false,match.match.params.id,'promociones')}
                                formActions={FormActions()} {...match} />
                    }/>
                <Route
                    path={`${props.match.url}/agregar`}
                    component={
                        (match) =>
                            <Formulario
                                data={props.data}
                                editar={false}
                                toggleModal={openModal}
                                formActions = {FormActions()}
                                nav={Navegacion.agregar('promociones')} {...match} />
                    } />
                <Route
                    path={`${props.match.url}/:id`}
                    component={
                        (match) =>
                            <VerPromocion
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'promociones')} {...match} />
                        } />
            </Switch>
        </>
    );
}
