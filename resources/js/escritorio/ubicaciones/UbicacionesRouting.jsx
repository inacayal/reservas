/**
 * react basic
 */
import React, {Component,useState} from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch} from 'react-router-dom';
/**
 * sub elementos
 */
import {Formulario} from './sub/Formulario';
import {Ubicaciones} from './sub/Ubicaciones';
import {VerUbicacion} from './sub/VerUbicacion';
import {Navegacion,FormActions} from '../../acciones/ActionsByView';

import {ConfirmarModal} from '../../componentes/modal/Modal';

export function UbicacionesRouting (props) {
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
                title={"Eliminar Ubicación"}
                content={"¿estás seguro de eliminar este ubicación?"} />
            <Route
                path={props.match.url}
                exact
                render={
                    (match) =>(
                        <Ubicaciones
                            data={props.data}
                            toggleModal={openModal}
                            nav={Navegacion.listado('/ubicaciones')} {...match}/>
                    )
                }/>
            <Switch>
                <Route
                    path={`${props.match.url}/editar/:id`}
                    exact
                    render={
                        (match) =>{
                            return (
                                <Formulario
                                    editar={true}
                                    data={props.data}
                                    toggleModal={openModal}
                                    formActions = {FormActions()}
                                    nav={Navegacion.formulario(()=>false,match.match.params.id,'/ubicaciones')}
                                    {...match} />

                            )
                        }
                } />
                <Route
                    path={`${props.match.url}/agregar`}
                    component={
                        (match) =>
                            <Formulario
                                editar={false}
                                data={props.data}
                                toggleModal={openModal}
                                formActions = {FormActions()}
                                nav={Navegacion.agregar('/ubicaciones')}
                                {...match} />
                    } />
                <Route
                    path={`${props.match.url}/:id`}
                    component={
                        (match) =>
                            <VerUbicacion
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'/ubicaciones')}
                                {...match} />
                    } />
            </Switch>
        </>
    );
}
