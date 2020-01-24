import {
    Switch,
    Route
} from 'react-router-dom';
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import Establecimiento from './sub/Establecimiento';
import Usuario from './sub/Usuario';
import Reservas from './sub/Reservas';
import Configuracion from './sub/Configuracion';
import {Navegacion} from '../../acciones/ActionsByView';
import ValidationHandler from '../../hocs/ValidationHandler';
import validation from './validation';
import {configuracionHandlers} from '../../handlers/sub/configuracionHandlers';

export default function ConfiguracionRouting (props) {
    const nav = Navegacion.agregar('configuracion');
    return (
        <>
            <Route  path={props.match.url}
                    exact
                    component={
                        (match) =>
                            <Configuracion  data={props.data}
                                            {...match} />
                    } />
            <Route  path={`${props.match.url}/usuario`}
                    exact
                    component={
                        (match) => {
                            const fields = {
                                id:props.data.id,
                                franquicia:props.data.franquicia.id||"",
                                username:props.data.username,
                                email:props.data.email,
                                password:""
                            }
                            return (
                                <ValidationHandler  form = {fields}
                                                    validation = {validation}
                                                    sendRequest={configuracionHandlers.form.usuario}>
                                    <Usuario    data={props.data}
                                                nav={nav}
                                                {...match}/>
                                </ValidationHandler>
                            );
                        }
                    } />
            <Route  path={`${props.match.url}/establecimiento`}
                    component={
                        (match) =>{
                            const fields = {
                                id:props.data.id,
                                franquicia:props.data.franquicia.id||"",
                                nombre_local:props.data.nombre,
                                correo_contacto:props.data.correoContacto,
                                telefono_contacto:props.data.telefonoContacto,
                                razon_social:props.data.razonSocial,
                                cuit_cuil:props.data.cuitCuil,
                                id_provincia:props.data.provincia.id,
                                direccion:props.data.direccionLocal,
                                nombre_encargado:props.data.admNombre,
                                correo_encargado:props.data.admEmail,
                                telefono_encargado:props.data.admTelefono
                            };
                            return (
                                <ValidationHandler  form = {fields}
                                                    validation = {validation}
                                                    sendRequest={configuracionHandlers.form.establecimiento}>
                                    <Establecimiento    data={props.data}
                                                        nav={nav}
                                                        {...match}/>
                                </ValidationHandler>
                            )
                        }
                    }/>
            <Route  path={`${props.match.url}/reservas`}
                    component={
                        (match) =>{
                            const fields = {
                                intervalo_reserva:props.data.intervalo.id,
                                caida_reserva:props.data.caida,
                                antelacion_reserva:props.data.antelacionReserva,
                                disponibilidad_reserva:"" //por hacer
                            };
                            return (
                                <ValidationHandler  form = {fields}
                                                    validation = {validation}
                                                    sendRequest={configuracionHandlers.form.reservas}>
                                    <Reservas   data={props.data}
                                                nav={nav}
                                                {...match}/>
                                </ValidationHandler>
                            )
                        }
                    } />
        </>
    );
}
