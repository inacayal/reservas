import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default function VerLocal(props){
    console.log(props);
    if (props.elem){
        return (
            <div className="container box-padding">
                <div className="sub-title row border-bottom">
                    Local
                </div>
                <div className="row v-padding">
                    <div className="col-md-4">
                        <div className="bold light-danger">Nombre</div>
                        {props.elem.nombre}
                    </div>
                    <div className="col-md-4">
                        <div className="bold light-danger">Correo Electrónico</div>
                        {props.elem.email}
                    </div>
                    <div className="col-md-4">
                        <div className="bold light-danger">Teléfono</div>
                        {props.elem.telefono}
                    </div>
                </div>
                <div className="row v-padding">
                    <div className="col-md-4">
                        <div className="bold light-danger">Razón Social</div>
                        {props.elem.razonSocial}
                    </div>
                    <div className="col-md-4">
                        <div className="bold light-danger">CUIT / CUIL</div>
                        {props.elem.cuitCuil}
                    </div>
                    <div className="col-md-4">
                        <div className="bold light-danger">Dirección</div>
                        {props.elem.direccion}
                    </div>
                </div>
                <div className="sub-title row border-bottom">
                    Administrador
                </div>
                <div className="row v-padding">
                    <div className="col-md-4">
                        <div className="bold light-danger">Nombre</div>
                        {props.elem.administrador}
                    </div>
                    <div className="col-md-4">
                        <div className="bold light-danger">Correo</div>
                        {props.elem.correoAdmin}
                    </div>
                    <div className="col-md-4">
                        <div className="bold light-danger">Teléfono</div>
                        {props.elem.telAdmin}
                    </div>
                </div>
            </div>
        )
    }
    return (<div></div>);
}