/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch} from 'react-router-dom';
/**
 * sub elementos
 */
import {
    Formulario,
    editFormHandler,
    addFormHandler
} from './sub/Formulario';
import {
    handler as listHandler,
    Ubicaciones
} from './sub/Ubicaciones';
import {
    singleHandler,
    VerUbicacion
} from './sub/VerUbicacion';
import {
    Navegacion,
    FormActions
} from '../../acciones/ActionsByView';
import RequestHandler from '../../hocs/RequestHandler';
import {ConfirmarModal} from '../../componentes/modal/Modal';

const modal = ({message,title}) =>
    function () {
        return <ConfirmarModal
            open={this.state.open}
            closeModal={this.toggleModal}
            title={title}
            content={message} />
    };


export default function UbicacionesRouting (props) {
    return (
        <>
            <Route
                path={props.match.url}
                exact
                component={
                    (match) =>
                        <RequestHandler
                            component ={
                                (match) =>
                                    <Ubicaciones
                                        nav={Navegacion.listado('/ubicaciones')} {...match}/>
                            }
                            fetchHandler={listHandler('ubicaciones/list/27')}
                            modal = {
                                modal({
                                    message:"¿estás seguro de eliminar este ubicación?",
                                    title:"Eliminar Ubicación"
                                })
                            }/>
                } />
            <Switch>
                <Route
                    path={props.match.url + '/editar/:id'}
                    exact
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) =>{
                                        return (
                                            <Formulario
                                                nav={Navegacion.formulario(()=>false,match.match.params.id,'/ubicaciones')}
                                                formActions = {FormActions()}
                                                editar={true}
                                                {...props} />
                                        )
                                    }

                                }
                                fetchHandler={editFormHandler('ubicaciones/single/27/'+match.match.params.id)}
                                modal = {
                                    modal({
                                        message:"¿estás seguro de eliminar este ubicación?",
                                        title:"Eliminar Ubicación"
                                    })
                                }/>
                    } />
                <Route
                    path={props.match.url + '/agregar'}
                    component={
                        (match) =>
                            <RequestHandler
                                component ={
                                    (props) =>{
                                        return (
                                            <Formulario
                                                nav={Navegacion.agregar('/ubicaciones')}
                                                formActions = {FormActions()}
                                                editar={false}
                                                {...props} />
                                        )
                                    }

                                }
                                fetchHandler={addFormHandler('ubicaciones/single/27/'+match.match.params.id)}
                                modal = {
                                    modal({
                                        message:"¿estás seguro de eliminar este ubicación?",
                                        title:"Eliminar Ubicación"
                                    })
                                }/>

                    } />
                <Route
                    path={props.match.url + '/:id'}
                    component={
                        (match) =>
                        <RequestHandler
                            component ={
                                (props) =>{
                                    return (
                                        <VerUbicacion
                                            nav={Navegacion.singular(()=>false,match.match.params.id,'/ubicaciones')}
                                            {...props} />
                                    )
                                }

                            }
                            fetchHandler={singleHandler('/ubicaciones/single/27/'+match.match.params.id)}
                            modal = {
                                modal({
                                    message:"¿estás seguro de eliminar este ubicación?",
                                    title:"Eliminar Ubicación"
                                })
                            }/>
                    } />
            </Switch>
        </>
    );
}
