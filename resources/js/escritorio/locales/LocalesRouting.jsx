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
import {Formulario} from './sub/Formulario';
import {Locales} from './sub/Locales';
import {VerLocal} from './sub/VerLocal';
import {ConfirmarModal} from '../../componentes/modal/Modal';

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
                            nav={Navegacion.listado('locales')} {...match}/>
                } />
            <Switch>
                <Route
                    path={`${props.match.url}/editar/:id`}
                    exact
                    render={
                        (match) =>
                            <Formulario
                                editar={true}
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.formulario(()=>false,match.match.params.id,'locales')}
                                formActions={FormActions()} {...match}/>
                    } />
                <Route
                    path={`${props.match.url}/agregar`}
                    render={
                        (match) =>
                            <Formulario
                                editar={false}
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.agregar('locales')}
                                formActions = {FormActions()} {...match} />
                    } />
                <Route
                    path={`${props.match.url}/:id`}
                    render={
                        (match) =>
                            <VerLocal
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'locales')} {...match} />
                    }/>
            </Switch>
        </>
    );
}
