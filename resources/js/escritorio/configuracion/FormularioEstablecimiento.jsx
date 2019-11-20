/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import {Text} from '../../componentes/input/Text';
import {FormularioUbicacion} from './FormularioUbicacion';

export const FormularioEstablecimiento = (props) => {
    const data = props.data;
    return (
        <>
            <div className="row v-padding">
                <div className="col-md-4">
                    <Text
                        rows={1}
                        titulo="Nombre"
                        name="nombre"
                        value={data.nombre}
                        classes={"border-box input-text margin-box"}
                        container="full-width" />
                </div>
                <div className="col-md-4">
                    <Text
                        rows={1}
                        titulo="Correo"
                        name="correo_local"
                        value={data.correoLocal}
                        classes={"border-box input-text margin-box"}
                        container="full-width" />
                </div>
                <div className="col-md-4">
                    <Text
                        rows={1}
                        titulo="Teléfono"
                        name="telefono_local"
                        value={data.telefonoLocal}
                        classes={"border-box input-text margin-box"}
                        container="full-width" />
                </div>
            </div>
            <div className="row v-padding">
                <div className="col-md-6">
                    <Text
                        rows={1}
                        titulo="Razón Social"
                        name="razon_social"
                        value={data.razonSocial}
                        classes={"border-box input-text margin-box"}
                        container="full-width" />
                </div>
                <div className="col-md-6">
                    <Text
                        rows={1}
                        titulo="CUIT / CUIL"
                        name="cuit_cuil"
                        value={data.cuitCuil}
                        classes={"border-box input-text margin-box"}
                        container="full-width" />
                </div>
            </div>
            {
                props.isFranquicia
                ?
                    <></>
                :
                    <>
                        <div className="row sub-title top-padding bold">
                            Encargado
                        </div>
                        <div className="row v-padding ">
                            <div className="col-md-4">
                                <Text
                                    rows={1}
                                    titulo="Nombre"
                                    name="nombre_adm"
                                    value={data.admNombre}
                                    classes={"border-box input-text margin-box"}
                                    container="full-width" />
                            </div>
                            <div className="col-md-4">
                                <Text
                                    rows={1}
                                    titulo="Teléfono"
                                    name="telefono_adm"
                                    value={data.admTelefono}
                                    classes={"border-box input-text margin-box"}
                                    container="full-width" />
                            </div>
                            <div className="col-md-4">
                                <Text
                                    rows={1}
                                    titulo="Correo"
                                    name="correo_adm"
                                    value={data.admEmail}
                                    classes={"border-box input-text margin-box"}
                                    container="full-width" />
                            </div>
                        </div>
                        <div className="row sub-title top-padding bold">
                            Ubicación
                        </div>
                        <FormularioUbicacion data={data}/>
                    </>
            }

        </>
    );
}
