/**
 * react basic
 */
import React, { Component,useState } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elements
 */
import {HorarioFormulario} from './formularios/HorarioFormulario';
import {Horarios} from './sub/Horarios';
import {VerHorario} from './sub/VerHorario';
/**
 * react router
 */
import { Route, Switch } from 'react-router-dom';
import {Navegacion,FormActions} from '../../acciones/ActionsByView';
import {ConfirmarModal} from '../../componentes/modal/Modal';

export default function HorariosRouting (props) {
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
                title={"Eliminar Horario"}
                content={"¿estás seguro de eliminar este horario?"} />
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <Horarios
                            data={props.data}
                            toggleModal={openModal} {...match}/>
                } />
            <Switch>
                <Route
                    path={`${props.match.url}/agregar/:day`}
                    component={
                        (match) => (
                            <HorarioFormulario
                                editar={false}
                                data={props.data}
                                nav={Navegacion.agregar('/horarios')}
                                formActions={FormActions()} {...match} />
                        )
                    }/>
                <Route
                    path={`${props.match.url}/editar/:id`}
                    component={
                        (match) => (
                            <HorarioFormulario
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.formulario(()=>false,match.match.params.id,'/horarios')}
                                formActions={FormActions()}
                                editar={true} {...match} />
                        )
                    }/>
                <Route
                    path={`${props.match.url}/:id`}
                    component={
                        (match) =>(
                            <VerHorario
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'/horarios')}
                                formActions={FormActions()}
                                {...props} />
                        )
                    } />
            </Switch>
        </>
    )
}
