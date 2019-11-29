/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * basic
 */
import Titulo from '../../../componentes/basic/Titulo';

export function VerUbicacion (props) {
    props.nav.buttons[0].click = props.toggleModal;
    const data = props.data;
    return (
        <div className="container no-padding">
            < Titulo    title={data.nombre}
                        links={props.nav.links}
                        buttons ={props.nav.buttons}/>
            <div className="row full-width">
                <div className="col-md-4 bold">
                    imagen de ubicacion
                </div>
                <div className="col-md-8 container">
                    <div className="row mid-font highlight top-padding">
                        Descripcion:
                    </div>
                    <div className="row">
                        {data.descripcion}
                    </div>
                    <div className="row v-padding mid-font highlight top-padding">
                        Máximo por mesa
                    </div>
                    <div className="row">
                        {data.maximo+" personas"}
                    </div>
                    <div className="row mid-font highlight top-padding">
                        Capacidad máxima
                    </div>
                    <div className="row">
                        {data.capacidad+" personas"}
                    </div>
                </div>
            </div>
        </div>
    )
}
