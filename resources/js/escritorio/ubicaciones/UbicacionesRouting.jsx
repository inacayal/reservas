/**
 * react basic
 */
import
    React,
    {
        Component,
        useState
    } from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    Switch
} from 'react-router-dom';
/**
 * sub elementos
 */
import {
    Formulario,
    editFormHandler,
    addFormHandler
} from './sub/Formulario';

import {
    listHandler,
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

export const handlers = [
    {
        endpoint:'/ubicaciones',
        match:/\/ubicaciones$/,
        handler:(params) =>
            listHandler(`ubicaciones/list/${user.id}`),
        component:
            (props) =>
                <Ubicaciones
                    data={props.data}
                    toggleModal={props.openModal}
                    nav={Navegacion.listado('/ubicaciones')}/>
    },
    {
        endpoint:'/ubicaciones/agregar',
        match:/\/ubicaciones\/(agregar)$/,
        handler:(params) =>
            addFormHandler(`ubicaciones/single/${user.id}/${params.id}`),
        component:
            (props) =>
                <Formulario
                    editar={false}
                    data={props.data}
                    toggleModal={props.openModal}
                    formActions = {FormActions()}
                    nav={Navegacion.agregar('/ubicaciones')}/>
    },
    {
        endpoint:'/ubicaciones/editar/:id',
        match:/\/ubicaciones\/(editar\/\d+)$/,
        handler:(params) =>
            editFormHandler(`ubicaciones/single/${user.id}/${params.id}`),
        component:
        (props) =>
            <Formulario
                editar={true}
                data={props.data}
                toggleModal={props.openModal}
                formActions = {FormActions()}
                nav={Navegacion.formulario(()=>false,props.match.params.id,'/ubicaciones')} />
    },
    {
        endpoint:'/ubicaciones/:id',
        match: /\/ubicaciones\/(\d+)$/,
        handler: (params) =>
            singleHandler(`/ubicaciones/single/${user.id}/${params.id}`),
        component:
            (props) =>
                <VerUbicacion
                    data={props.data}
                    toggleModal={props.openModal}
                    nav={Navegacion.singular(()=>false,props.match.params.id,'/ubicaciones')}/>

    }
];

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
    if (!props.loaded){
        return (
            <props.oldComponent.component
                {...props}
                openModal={openModal}/>
        )
    }
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
                component={
                    (match) =>
                        <Ubicaciones
                            data={props.data}
                            toggleModal={openModal}
                            nav={Navegacion.listado('/ubicaciones')} {...match}/>
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
                                formActions = {FormActions()}
                                nav={Navegacion.formulario(()=>false,match.match.params.id,'/ubicaciones')}
                                {...match} />
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
