/**
 * react basic
 */
import React, {
    Component,
    useState,
    useEffect,
    useContext
} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {Navegacion} from '../../acciones/ActionsByView'
import ReactDOM from 'react-dom';
import {Formulario} from './sub/Formulario';
import {Eventos} from './sub/Eventos';
import {VerEvento} from './sub/VerEvento';
import {ConfirmarModal} from '../../componentes/modal/Modal';
import Validator from '../../hocs/Validator';
import {
    validation,
    addFormFields,
    editFormFields
} from './validation';
import {WaitsLoading} from '../../hocs/DataHandler';
import TransitionHandler from '../../hocs/TransitionHandler';

function EventosRouting (props){
    const   [open,toggle] = useState(false),
        openModal = (e) => {
            e.preventDefault();
            toggle(true);
        },
        closeModal = (e) => {
            e.preventDefault();
            toggle(false);
        },
        wait = () => false;
    return (
        <>
            <ConfirmarModal open={open}
                            closeModal={closeModal}
                            title="Eliminar Franquicia"
                            content="¿estás seguro de eliminar este franquicia?" />
            <Route  path={props.match.url}
                    exact
                    render={
                        (match) => (
                            <TransitionHandler  dataRendered ={props.location === match.location.pathname}
                                                {...match}>
                                <Eventos    data={props.data}
                                            toggleModal={openModal}
                                            nav={Navegacion.listado('eventos')}/>
                            </TransitionHandler>
                        )
                    } />
            <Switch>
                <Route  path={`${props.match.url}/editar/:id`}
                        exact
                        render={
                            (match) => (
                                <TransitionHandler  dataRendered ={props.location === match.location.pathname}
                                                    {...match}>
                                    <Validator  validation={validation}
                                                formMaker = {editFormFields}
                                                data={props.data}
                                                sendRequest={props.handlers.edit}
                                                wait={wait}>
                                        <Formulario editar={true}
                                                    toggleModal={openModal}
                                                    nav={
                                                        Navegacion.formulario(
                                                            ()=>false,
                                                            match.match.params.id,
                                                            'eventos'
                                                        )
                                                    }
                                                    {...match} />
                                    </Validator>
                                </TransitionHandler>
                            )
                        } />
                <Route  path={`${props.match.url}/agregar`}
                        render={
                            (match) => (
                                <TransitionHandler  dataRendered ={props.location === match.location.pathname}
                                                    {...match}>
                                    <Validator  validation={validation}
                                                sendRequest={props.handlers.add}
                                                formMaker = {addFormFields}
                                                data={{all:props.data}}
                                                wait={wait}>
                                        <Formulario toggleModal={openModal}
                                                    nav={
                                                        Navegacion.agregar('eventos')
                                                    }
                                                    editar={false}/>
                                    </Validator>
                                </TransitionHandler>
                            )
                    } />
                <Route  path={`${props.match.url}/:id`}
                        render={
                            (match) => (
                                <TransitionHandler  dataRendered ={props.location === match.location.pathname}
                                                    {...match}>
                                    <VerEvento  data={props.data}
                                                toggleModal={openModal}
                                                nav={
                                                    Navegacion.singular(
                                                        ()=>false,
                                                        match.match.params.id,
                                                        'eventos'
                                                    )
                                                }
                                                {...match} />
                                </TransitionHandler>
                            )
                        }/>
            </Switch>
        </>
    );
}
export default React.memo(EventosRouting);
