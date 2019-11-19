/**
 * react basic
 */
import React, { Component,useState } from 'react';
import ReactDOM from 'react-dom';
import Actions from '../../../componentes/basic/Actions';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
import LocalesTable from '../../../componentes/tables/LocalesTable';
import {ExpandableComponent} from '../../../hocs/ExpandableComponent';

function links(key) {
    return [
        {
            title: (
                <div className="smaller-text text bold">
                <i className="fas fa-eye" />
                Ver
                </div>
            ),
            to: '/locales/' + key,
            params:{id:key}
        },
        {
            title: (
                <div className="smaller-text text bold">
                <i className="fas fa-pen" />
                Editar
                </div>
            ),
            to: '/locales/editar/' + key,
            params:{id:key}
        }
    ];
}

export function VerFranquicia (props) {
    props.nav.buttons[0].click = props.toggleModal;
    const data = props.data,
        localesData = Object.values(data.locales.data).map(
            e => ({
                ...e,
                acciones: <Actions links={links(e.id)} buttons={[]}/>
            })
        ),
        agregar = [{
            title:(
                <div className="smaller-text text bold">
                    <i className="fas fa-plus-circle inline-box side-margin" /> Agregar Local
                </div>
            ),
            to:"/locales/agregar"
        }];
    return (
        <>
            < Titulo
                title={data.nombre}
                links={props.nav.links}
                buttons={props.nav.buttons} />
            <div className="container full-width no-padding">
                <div className="row top-padding">
                    <div className="col-md-6 sub-title bold">
                        Locales
                    </div>
                    <div className="col-md-6 text-right">
                        <Actions otherSection links={agregar}/>
                    </div>
                </div>
                <div className="row h-padding">
                    <LocalesTable data={localesData}/>
                </div>
            </div>
            <div className="container">
                <ExpandableComponent
                    title = {"Información"}
                    show={true}
                    component = {
                        <>
                            <div className="row justify-content-end v-padding">
                                <div className="col-md-4">
                                    foto perfil
                                </div>
                                <div className="col-md-8">
                                    <h6 className="full-width light-danger bold">
                                        Administrador
                                    </h6>
                                    <div>
                                        {data.administrador}
                                    </div>
                                </div>
                            </div>
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
                        </>
                    }/>
                <ExpandableComponent
                    title = {"Usuario"}
                    component = {
                        <div className="row v-padding">
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
                    }/>
            </div>
        </>
    )
}
