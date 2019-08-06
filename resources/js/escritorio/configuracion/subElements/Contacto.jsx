/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import {Text} from '../../../componentes/input/Text';
import {Select} from '../../../componentes/input/Select';

export default function Contacto(props) {
    return (
        <div className={props.show ? "row" : "hidden"}>
            <div className="sub-title h-padding full-width border-bottom">Datos de contacto del local</div>
            <div className="col-sm-6 box-padding">
                <Text
                    container="full-width"
                    changeValue={props.onTextChange}
                    titulo="Correo electrónico"
                    name="correo_local"
                    rows={1}
                    value={props.text.correo_local}
                    classes="border-box input-text margin-box full-width" />
            </div>
            <div className="col-sm-6 box-padding">
                <Text
                    container="full-width"
                    changeValue={props.onTextChange}
                    titulo="Número de teléfono"
                    name="telefono_local"
                    rows={1}
                    value={props.text.telefono_local}
                    classes="border-box input-text margin-box full-width" />
            </div>
        </div>
    );
}