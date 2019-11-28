import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {Text} from '../../componentes/input/Text';
import {FormularioUbicacion} from './FormularioUbicacion';

export const FormularioEstablecimiento = (props) => {
    const data = props.data;
    return (
        <>
            <div className="row v-padding">
                <div className="col-md-4">
                    <Text   rows={1}
                            titulo="Nombre del local"
                            name="nombre_local"
                            holder="Nombre del local hasta 100 caracteres"
                            errors={props.errors.nombre_local}
                            value={props.fields.nombre_local}
                            changeHandler={props.change}/>
                </div>
                <div className="col-md-4">
                    <Text   rows={1}
                            titulo="Correo del local"
                            name="correo_local"
                            holder="Correo de contacto del local hasta 100 caracteres"
                            errors={props.errors.correo_local}
                            value={props.fields.correo_local}
                            changeHandler={props.change}/>
                </div>
                <div className="col-md-4">
                    <Text   rows={1}
                            titulo="Teléfono de contacto del local"
                            name="telefono_local"
                            holder="Teléfono de contacto del local hasta 100 caracteres"
                            errors={props.errors.telefono_local}
                            value={props.fields.telefono_local}
                            changeHandler={props.change}/>
                </div>
            </div>
            <div className="row v-padding">
                <div className="col-md-6">
                    <Text   rows={1}
                            titulo="Razón Social"
                            name="razon_social"
                            holder="Razón social hasta 100 caracteres"
                            errors={props.errors.razon_social}
                            value={props.fields.razon_social}
                            changeHandler={props.change}/>
                </div>
                <div className="col-md-6">
                    <Text   rows={1}
                            titulo="CUIT / CUIL"
                            name="cuit_cuil"
                            holder="CUIT / CUIL hasta 11 caracteres"
                            errors={props.errors.cuit_cuil}
                            value={props.fields.cuit_cuil}
                            changeHandler={props.change}/>
                </div>
            </div>
            {
                props.isFranquicia
                ?
                    <></>
                :
                    <>
                        <div className="row sub-title v-padding bold">
                            Información del encargado
                        </div>
                        <div className="row v-padding ">
                            <div className="col-md-4">
                                <Text   rows={1}
                                        titulo="Nombre del encargado"
                                        name="nombre_encargado"
                                        holder="Nombre del encargado hasta 100 caracteres"
                                        errors={props.errors.nombre_encargado}
                                        value={props.fields.nombre_encargado}
                                        changeHandler={props.change}/>
                            </div>
                            <div className="col-md-4">
                                <Text   rows={1}
                                        titulo="Teléfono del encargado"
                                        name="telefono_encargado"
                                        holder="Teléfono del encargado hasta 20 caracteres"
                                        errors={props.errors.telefono_encargado}
                                        value={props.fields.telefono_encargado}
                                        changeHandler={props.change}/>
                            </div>
                            <div className="col-md-4">
                                <Text   rows={1}
                                        titulo="Correo del encargado"
                                        name="correo_encargado"
                                        holder="Correo del encargado hasta 100 caracteres"
                                        errors={props.errors.correo_encargado}
                                        value={props.fields.correo_encargado}
                                        changeHandler={props.change}/>
                            </div>
                        </div>
                        <div className="row sub-title top-padding bold">
                            Ubicación del local
                        </div>
                        <FormularioUbicacion    data={data}
                                                errors={props.errors}
                                                fields={props.fields}
                                                change={props.change}/>
                    </>
            }

        </>
    );
}
