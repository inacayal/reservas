/**
 * react basic
 */
import React, {
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch} from 'react-router-dom';
import {Formulario} from './sub/Formulario';
import {Franquicias} from './sub/Franquicias';
import {VerFranquicia} from './sub/VerFranquicia';
import {Navegacion,FormActions} from '../../acciones/ActionsByView';
import {ConfirmarModal} from '../../componentes/modal/Modal';

export default function FranquiciasRouting (props) {
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
            <ConfirmarModal
                open={open}
                closeModal={closeModal}
                title={"Eliminar Franquicia"}
                content={"¿estás seguro de eliminar este franquicia?"} />
            <Route
                path={props.match.url}
                exact
                render={
                    (match) =>
                        <Franquicias
                            toggleModal={openModal}
                            data={props.data}
                            nav={Navegacion.listado('franquicias')} {...match}/>
                } />
            <Switch>
                <Route
                    path={`${props.match.url}/editar/:id`}
                    exact
                    render={
                        (match) =>
                            <Formulario
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.formulario(()=>false,match.match.params.id,'franquicias')}
                                formActions = {FormActions()}
                                editar={true} {...match} />
                    } />
                <Route
                    path={`${props.match.url}/agregar`}
                    render={
                        (match) =>
                            <Formulario
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.agregar('franquicias')}
                                formActions = {FormActions()}
                                editar={false}
                                {...match} />
                    } />
                <Route
                    path={`${props.match.url}/:id`}
                    render={
                        (match) =>
                            <VerFranquicia
                                data={props.data}
                                toggleModal={openModal}
                                nav={Navegacion.singular(()=>false,match.match.params.id,'franquicias')} {...match} />
                    } />
            </Switch>
        </>
    );
}
