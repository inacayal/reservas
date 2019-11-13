/**
 * react basic
 */
import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elements
 */
import FeriadosRouting from './FeriadosRouting';

import {
    editFormHandler,
    addFormHandler,
    HorarioFormulario
} from './formularios/HorarioFormulario';

import {
    listHandler,
    Horarios
} from './sub/Horarios';

import {
    singleHandler,
    VerHorario
} from './sub/VerHorario';
/**
 * react router
 */
import { Route, Switch } from 'react-router-dom';
import {Navegacion,FormActions} from '../../acciones/ActionsByView';
import RequestHandler from '../../hocs/RequestHandler';
import {ConfirmarModal} from '../../componentes/modal/Modal';

export default function HorariosRouting (props) {
    const modal = (props) => (
        <ConfirmarModal
            {...props}
            title={"Eliminar Horario"}
            content={"¿estás seguro de eliminar este horario?"} />
    );
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <RequestHandler
                            component={
                                (props) =>
                                    <Horarios
                                        {...props}/>
                            }
                            modal={modal}
                            fetchHandler={listHandler(`/horarios/list/${user.id}`)}/>
                } />
            <Route
                path={`${props.match.url}/feriados`}
                component={
                    (match) => <FeriadosRouting {...match} />
                } />
            <Switch>
                <Route
                    path={`${props.match.url}/agregar/:day`}
                    component={
                        (match) => (
                            <RequestHandler
                                component ={
                                    (props) =>(
                                        <HorarioFormulario
                                            nav={Navegacion.agregar('/horarios')}
                                            editar={false}
                                            formActions={FormActions()}
                                            {...props} />
                                    )
                                }
                                modal={modal}
                                fetchHandler={addFormHandler(`/horarios/add/${user.id}`)}/>
                        )
                    }/>
                <Route
                    path={`${props.match.url}/editar/:id`}
                    component={
                        (match) => (
                            <RequestHandler
                                component ={
                                    (props) =>{
                                        return (
                                            <HorarioFormulario
                                                nav={Navegacion.formulario(()=>false,match.match.params.id,'/horarios')}
                                                formActions={FormActions()}
                                                editar={true}
                                                {...props} />
                                        )
                                    }
                                }
                                modal={modal}
                                fetchHandler={editFormHandler(`/horarios/single/${user.id}/${match.match.params.id}`)}/>
                        )
                    }/>
                <Route
                    path={`${props.match.url}/:id`}
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) => (
                                        <VerHorario
                                            nav={Navegacion.singular(()=>false,match.match.params.id,'/horarios')}
                                            formActions={FormActions()}
                                            {...props} />
                                    )
                                }
                                modal={modal}
                                fetchHandler={singleHandler(`/horarios/single/${user.id}/${match.match.params.id}`)}/>
                    } />
            </Switch>
        </>
    )
}
