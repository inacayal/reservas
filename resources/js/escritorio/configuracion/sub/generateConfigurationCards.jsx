/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
/**
 * react components
 */
import Actions from '../../../componentes/basic/Actions';
import {ExpandableComponent} from '../../../componentes/basic/ExpandableComponent';

const configurationCards = [
    {
        element: (data) => (
            <div className="container full-width ">
                <div className="row v-padding">
                    <div className="col-md-4">
                        <h6 className="full-width light-danger bold">
                            Nombre
                        </h6>
                        <div>
                            {data.nombre}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="full-width light-danger bold">
                            Correo
                        </h6>
                        <div>
                            {data.correoLocal}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="full-width light-danger bold">
                            Teléfono
                    </h6>
                        <div>
                            {data.telefonoLocal}
                        </div>
                    </div>
                </div>
                <div className="row v-padding">
                    <div className="col-md-6">
                        <h6 className="full-width light-danger bold">
                            Razón Social
                    </h6>
                        <div>
                            {data.razonSocial}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h6 className="full-width light-danger bold">
                            CUIT / CUIL
                        </h6>
                        <div>
                            {data.cuitCuil}
                        </div>
                    </div>
                </div>
                <div className="row bold top-padding margin-box">
                    Encargado
                </div>
                <div className="row v-padding margin-box">
                    <div className="col-md-4">
                        <h6 className="full-width light-danger bold">
                            Nombre
                        </h6>
                        <div>
                            {data.admNombre}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="full-width light-danger bold">
                            Teléfono
                        </h6>
                        <div>
                            {data.admTelefono}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="full-width light-danger bold">
                            Correo
                        </h6>
                        <div>
                            {data.admEmail}
                        </div>
                    </div>
                </div>
                <div className="row bold top-padding margin-box">
                    Ubicación
                </div>
                <div className="row v-padding margin-box">
                    <div className="col-md-6">
                        <h6 className="full-width light-danger bold">
                            Provincia
                        </h6>
                        <div>
                            {(data.provincia||{}).nombre||"Sin definir"}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h6 className="full-width light-danger bold">
                            Dirección del local
                        </h6>
                        <div>
                            {data.direccionLocal}
                        </div>
                    </div>
                </div>
            </div>
        ),
        route: '/configuracion/establecimiento',
        title: 'Mi establecimiento'
    },
    {
        element: (data) => (
            <div className="container full-width">
                <div className="row">
                    <div className="col-md-4">
                        <h6 className="full-width light-danger bold">
                            Username
                        </h6>
                        <div>
                            {data.username}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="full-width light-danger bold">
                            Correo
                        </h6>
                        <div>
                            {data.email}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="full-width light-danger bold">
                            Contraseña de usuario
                    </h6>
                        <div>
                            *******************
                    </div>
                    </div>
                </div>
            </div>
        ),
        route: '/configuracion/usuario',
        title: 'Mi usuario'
    },
    {
        element: (data) => (
            <div className="container full-width">
                <div className="row">
                    <div className="col-md-6">
                        <h6 className="full-width light-danger bold">
                            Intervalo de Reservas
                    </h6>
                        <div>
                            {data.intervalo.description}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h6 className="full-width light-danger bold">
                            Caída de la reserva
                    </h6>
                        <div>
                            {data.caida+ " minutos"}
                        </div>
                    </div>
                </div>
                <div className="row v-padding">
                    <div className="col-md-6">
                        <h6 className="full-width light-danger bold">
                            Antelacion de Reservas
                        </h6>
                        <div>
                            {
                                data.antelacionReserva
                                    ? data.antelacionReserva + " horas"
                                    :"Sin definir"
                            }
                        </div>
                    </div>
                </div>
            </div>
        ),
        route: '/configuracion/reservas',
        title: 'Reservas'
    }
];

export default function generateConfigurationCards (
    data
){
    return configurationCards.map(
        (e,i) => {
            const actions = <div className="normal-text"><i className="fas fa-pen" />Editar</div>,
                links = [
                    {
                        title: (
                            <div className="smaller-text text bold text-center">
                                <i className="fas fa-pen inline-box side-margin" />
                                Editar
                            </div>
                        ),
                        to: e.route
                    }
                ];
            return {
                content: () => {
                    return (
                        <>
                            <ExpandableComponent
                                title = {e.title}
                                show={i===0}
                                links = {links}
                                component = {e.element(data)}/>
                        </>
                    );
                },
                class: 'v-padding margin-box'
            }
        }
    );
}
