import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch} from 'react-router-dom';
/**
 * sub elementos
 */
import {FeriadoFormulario} from './formularios/FeriadoFormulario';
import {Feriados} from './sub/Feriados';
import {VerFeriado} from './sub/VerFeriado';
import {Navegacion,FormActions} from '../../acciones/ActionsByView';
import {ConfirmarModal} from '../../componentes/modal/Modal';

export default function FeriadosRouting (props) {
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
                title={"Eliminar Feriado"}
                content={"¿estás seguro de eliminar este feriado?"} />
            <Route
                path={props.match.url}
                exact
                render={
                    (match) =>
                        <Feriados
                            data={props.data}
                            toggleModal={openModal}
                            nav={Navegacion.listado('/horarios/feriados')} {...match} />
                } />
            <Switch>
                <Route
                    path={`${props.match.url}/editar/:id`}
                    exact
                    render={
                        (match) =>
                            <FeriadoFormulario
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.formulario(()=>false,match.match.params.id,'/horarios/feriados')}
                                formActions={FormActions()}
                                editar={true} {...match} />
                    } />
                <Route
                    path={`${props.match.url}/agregar`}
                    component={
                        (match) =>
                            <FeriadoFormulario
                                data={props.data}
                                editar={false}
                                nav={Navegacion.agregar('/horarios/feriados')}
                                formActions={FormActions()} {...match} />

                    } />
                <Route
                    path={`${props.match.url}/:id`}
                    component={
                        (match) =>
                            <VerFeriado
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'/horarios/feriados')}
                                {...props} />
                    } />
            </Switch>
        </>
    );
}
