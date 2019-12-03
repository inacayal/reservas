/**
 * react basic
 */
import React, {
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router-dom';
import {Navegacion} from '../../acciones/ActionsByView';
import {Formulario} from './sub/Formulario';
import {Locales} from './sub/Locales';
import {VerLocal} from './sub/VerLocal';
import {ConfirmarModal} from '../../componentes/modal/Modal';
import validation from './validation';
import Validator from '../../hocs/Validator';

export default function LocalesRouting (props) {
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
                            title={"Eliminar Local"}
                            content={"¿estás seguro de eliminar este local?"} />
            <Route  path={props.match.url}
                    exact
                    render={
                        (match) =>
                            <Locales    data={props.data}
                                        toggleModal={openModal}
                                        nav={Navegacion.listado('locales')}
                                        {...match}/>
                    }/>
            <Switch>
                <Route  path={`${props.match.url}/editar/:id`}
                        exact
                        render={
                            (match) => {
                                const fields = {
                                    id:props.data.id,
                                    franquicia:props.data.franquicia.id,
                                    nombre:props.data.nombre,
                                    correo:props.data.correoLocal,
                                    telefono:props.data.telefonoLocal,
                                    username: props.data.username,
                                    email: props.data.email,
                                    razon_social:props.data.razonSocial,
                                    cuit_cuil:props.data.cuitCuil,
                                    id_provincia:props.data.provincia.id,
                                    direccion:props.data.direccionLocal,
                                    nombre_encargado:props.data.admNombre,
                                    correo_encargado:props.data.admEmail,
                                    telefono_encargado:props.data.admTelefono
                                };
                                return (
                                    <Validator  form={fields}
                                                validation={validation}>
                                        <Formulario editar={true}
                                                    data={props.data}
                                                    toggleModal={openModal}
                                                    nav={Navegacion.formulario(()=>false,match.match.params.id,'locales')}
                                                    {...match}/>
                                    </Validator>

                                )
                            }
                        }/>
                <Route  path={`${props.match.url}/agregar`}
                        render={
                            (match) =>{
                                const fields = {
                                    id:"",
                                    franquicia:"",
                                    nombre:"",
                                    correo:"",
                                    telefono:"",
                                    username: "",
                                    email: "",
                                    razon_social:"",
                                    cuit_cuil:"",
                                    id_provincia:"",
                                    direccion:"",
                                    nombre_encargado:"",
                                    correo_encargado:"",
                                    telefono_encargado:""
                                };
                                return (
                                    <Validator  form={fields}
                                                validation={validation}>
                                        <Formulario editar={false}
                                                    data={props.data}
                                                    toggleModal={openModal}
                                                    nav={Navegacion.agregar('locales')}
                                                    {...match} />
                                    </Validator>
                                )
                            }
                        }/>
                <Route  path={`${props.match.url}/:id`}
                        render={
                            (match) =>
                                <VerLocal   data={props.data}
                                            toggleModal={openModal}
                                            nav={Navegacion.singular(()=>false,match.match.params.id,'locales')}
                                            {...match} />
                        }/>
            </Switch>
        </>
    );
}
