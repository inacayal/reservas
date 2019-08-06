/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import {Text} from '../../../componentes/input/Text';

export default function Encargado(props) {
    return (
        <div className={props.show ? "full-width" : "hidden"}>
            <div className="sub-title h-padding full-width border-bottom">Datos de contacto del encargado</div>
            <form action="">
                <div className="container v-padding">
                    <div className="row">
                        <div className="col-sm-4">
                            <Text
                                container="full-width"
                                changeValue={props.onTextChange}
                                titulo="Nombre"
                                name="adm_nombre"
                                rows={1}
                                value={props.text.adm_nombre}
                                classes="border-box input-text margin-box full-width" />
                        </div>
                        <div className="col-sm-4">
                            <Text
                                container="full-width"
                                changeValue={props.onTextChange}
                                titulo="Teléfono de contacto"
                                name="adm_telefono"
                                rows={1}
                                value={props.text.adm_telefono}
                                classes="border-box input-text margin-box full-width" />
                        </div>
                        <div className="col-sm-4">
                            <Text
                                container="full-width"
                                changeValue={props.onTextChange}
                                titulo="Correo de contacto"
                                name="adm_email"
                                rows={1}
                                value={props.text.adm_email}
                                classes="border-box input-text margin-box full-width" />
                        </div>
                    </div>
                </div>
            </form>
        </div>    
    );
}