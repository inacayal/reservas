/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import {Route, Switch} from 'react-router-dom';
import {Navegacion,FormActions} from '../../acciones/ActionsByView';
/**
 * sub elementos
 */
import {
    editFormHandler,
    addFormHandler,
    Formulario
} from './sub/Formulario';

import {
    listHandler,
    Locales
} from './sub/Locales';

import {
    singleHandler,
    VerLocal
} from './sub/VerLocal';

import RequestHandler from '../../hocs/RequestHandler';
import {ConfirmarModal} from '../../componentes/modal/Modal';


export const handlers = [
    {
        endpoint:'/locales',
        match:/\/locales$/,
        callback:(params) =>
            listHandler(`/usuario/locales/${user.id}`)
    },
    {
        endpoint:'/locales/agregar',
        match:/\/locales\/(agregar)$/,
        callback:(params) =>
            addFormHandler(`/usuario/add/${user.id}/1`)
    },
    {
        endpoint:'/locales/editar/:id',
        match:/\/locales\/(editar\/\d+)$/,
        callback:(params) =>
            editFormHandler(`/usuario/local/${match.match.params.id}`)
    },
    {
        endpoint:'/locales/:id',
        match: /\/locales\/(\d+)$/,
        callback: (params) =>
            singleHandler(`/usuario/local/${match.match.params.id}`)

    }
];


export default function LocalesRouting (props) {
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
                title={"Eliminar Local"}
                content={"¿estás seguro de eliminar este local?"} />
            <Route
                path={props.match.url}
                exact
                render={
                    (match) =>
                        <Locales
                            data={props.data}
                            toggleModal={openModal}
                            nav={Navegacion.listado('/locales')} {...match} />
                } />
            <Switch>
                <Route
                    path={`${props.match.url}/editar/:id`}
                    exact
                    component={
                        (match) =>
                            <Formulario
                                editar={true}
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.formulario(()=>false,match.match.params.id,'/locales')}
                                formActions={FormActions()} {...match} />
                    } />
                <Route
                    path={`${props.match.url}/agregar`}
                    component={
                        (match) =>
                            <Formulario
                                editar={false}
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.agregar('/locales')}
                                formActions = {FormActions()} {...match} />
                    } />
                <Route
                    path={`${props.match.url}/:id`}
                    component={
                        (match) =>
                            <VerLocal
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'/locales')} {...match} />
                    }/>
            </Switch>
        </>
    );
}
