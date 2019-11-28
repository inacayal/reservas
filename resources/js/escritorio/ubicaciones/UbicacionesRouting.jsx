/**
 * react basic
 */
import React, {Component,useState} from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch} from 'react-router-dom';
import {Formulario} from './sub/Formulario';
import {Ubicaciones} from './sub/Ubicaciones';
import {VerUbicacion} from './sub/VerUbicacion';
import {Navegacion} from '../../acciones/ActionsByView';
import Validator from '../../hocs/Validator';
import {ConfirmarModal} from '../../componentes/modal/Modal';
import validation from './validation';

export default function UbicacionesRouting (props) {
    const   [open,toggle] = useState(false),
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
            <ConfirmarModal open={open}
                            closeModal={closeModal}
                            title={"Eliminar Ubicación"}
                            content={"¿estás seguro de eliminar este ubicación?"} />
            <Route  path={props.match.url}
                    exact
                    render={
                        (match) =>(
                            <Ubicaciones    data={props.data}
                                            toggleModal={openModal}
                                            nav={Navegacion.listado('ubicaciones')} {...match}/>
                        )
                    }/>
            <Switch>
                <Route  path={`${props.match.url}/editar/:id`}
                        exact
                        render={
                            (match) =>{
                                const form ={
                                    id: props.data.id,
                                    nombre:props.data.nombre,
                                    descripcion:props.data.descripcion,
                                    capacidad_maxima:props.data.capacidad,
                                    maximo_personas:props.data.maximo
                                };
                                return (
                                    <Validator  form={form}
                                                validation={validation}>
                                        <Formulario editar={true}
                                                    data={props.data}
                                                    toggleModal={openModal}
                                                    nav={Navegacion.formulario(()=>false,match.match.params.id,'ubicaciones')}{...match} />
                                    </Validator>
                                )
                            }
                } />
                <Route  path={`${props.match.url}/agregar`}
                        component={
                            (match) => {
                                const form ={
                                    id: "",
                                    nombre:"",
                                    descripcion:"",
                                    capacidad_maxima:"",
                                    maximo_personas:""
                                };
                                return (
                                    <Validator  form={form} 
                                                validation={validation}>
                                        <Formulario editar={false}
                                                    data={props.data}
                                                    toggleModal={openModal}
                                                    nav={Navegacion.agregar('ubicaciones')} {...match} />
                                    </Validator>
                                )
                            }
                    } />
                <Route  path={`${props.match.url}/:id`}
                        component={
                            (match) =>
                                <VerUbicacion   data={props.data}
                                                toggleModal={openModal}
                                                nav={Navegacion.singular(()=>false,match.match.params.id,'ubicaciones')} {...match} />
                        } />
            </Switch>
        </>
    );
}
