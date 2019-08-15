/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * react components
 */
import ButtonList from '../../../componentes/basic/ButtonList';


const configurationCards = {
    Encargado: (data,show) => (
        <div className="container full-width">
            <div className="row">
                <div className="col-md-4">
                    <h6 className="full-width light-danger bold">
                        Nombre
                    </h6>
                    <div>
                        {data.adm_nombre}
                    </div>
                </div>
                <div className="col-md-4">
                    <h6 className="full-width light-danger bold">
                        Teléfono de contacto
                    </h6>
                    <div>
                        {data.adm_email}
                    </div>
                </div>
                <div className="col-md-4">
                    <h6 className="full-width light-danger bold">
                        Correo de contacto
                    </h6>
                    <div>
                        {data.adm_telefono}
                    </div>
                </div>
            </div>
        </div>
    ),
    Ubicacion: (data,show) => (
        <div className="container full-width" >
            <div className="row">
                <div className="col-md-6">
                    <h6 className="full-width light-danger bold">
                        Provincia
                    </h6>
                    <div>
                        {data.provincia}
                    </div>
                </div>
                <div className="col-md-6">
                    <h6 className="full-width light-danger bold">
                        Dirección del local
                    </h6>
                    <div>
                        {data.direccion_local}
                    </div>
                </div>
            </div>
        </div>
    ),
    Contacto_del_local: (data,show) => (
        <div className="container full-width">
            <div className="row">
                <div className="col-md-6">
                    <h6 className="full-width light-danger bold">
                        Correo del local
                    </h6>
                    <div>
                        {data.correo_local}
                    </div>
                </div>
                <div className="col-md-6">
                    <h6 className="full-width light-danger bold">
                        Teléfono de contacto
                    </h6>
                    <div>
                        {data.telefono_local}
                    </div>
                </div>
            </div>
        </div>
    ),
    Usuario: (data,show) => (
        <div className="container full-width">
            <div className="row">
                <div className="col-md-6">
                    <h6 className="full-width light-danger bold">
                        Correo de usuario
                    </h6>
                    <div>
                        {data.email_local}
                    </div>
                </div>
                <div className="col-md-6">
                        <h6 className="full-width light-danger bold">
                        Contraseña de usuario
                    </h6>
                    <div>
                        *******************
                    </div>
                </div>
            </div>
            <div className="row v-padding">
                <div className="col-md-6">
                    <h6 className="full-width light-danger bold">
                        Razón Social
                    </h6>
                    <div>
                        {data.razon_social}
                    </div>
                </div>
                <div className="col-md-6">
                    <h6 className="full-width light-danger bold">
                        CUIT / CUIL
                    </h6>
                    <div>
                        {data.cuit_cuil}
                    </div>
                </div>
            </div>
                
        </div>
    ),
    Reservas: (data,show) => (
        <div className="container full-width">
            <div className="row">
                <div className="col-md-6">
                    <h6 className="full-width light-danger bold">
                        Intervalo de Reservas
                    </h6>
                    <div>
                        {data.intervalo}
                    </div>
                </div>
                <div className="col-md-6">
                    <h6 className="full-width light-danger bold">
                        Caída de la reserva
                    </h6>
                    <div>
                        {data.caida}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default function generateConfigurationCards (
    action,
    expand,
    subElements,
    data,
    show
){
    return subElements.map(
        (e,i) => {
            const name = e.title.replace(/\s/gi,'_'),
                actions = <div className="normal-text"><i className="fas fa-pen" />Editar</div>,
                actionList = [
                {
                    title: (
                        <div className="smaller-text text bold text-center">
                            <i className="fas fa-pen inline-box side-margin" />
                            Editar
                        </div>
                    ),
                    click: action,
                    data: (i).toString()
                }
            ];
            return {
                title:{
                    data:(
                        <div className="full-width highlight-danger side-margin sub-title">
                            {e.title}
                        </div>
                    )
                },
                content:{
                    data:configurationCards[name](data),
                    class:show == i ? "v-padding" : ""
                },
                container:{
                    class:i !== subElements.length-1 ? 'border-bottom margin-box box-padding' : 'box-padding margin-box'
                }
            }
        }
    );
}
