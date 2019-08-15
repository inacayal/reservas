/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import {Text, onTextChange} from '../../../componentes/input/Text';

export default class Contacto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correo_local:this.props.data.email,
            telefono_local:this.props.data.telefono
        };
        this.textChange = onTextChange.bind(this);
    }
    render(){
        return (
            <div className="row">
                <div className="sub-title h-padding full-width border-bottom">Datos de contacto del local</div>
                <div className="col-sm-6 box-padding">
                    <Text
                        container="full-width"
                        changeValue={this.textChange}
                        titulo="Correo electrónico"
                        name="correo_local"
                        rows={1}
                        value={this.state.correo_local}
                        classes="border-box input-text margin-box full-width" />
                </div>
                <div className="col-sm-6 box-padding">
                    <Text
                        container="full-width"
                        changeValue={this.textChange}
                        titulo="Número de teléfono"
                        name="telefono_local"
                        rows={1}
                        value={this.state.telefono_local}
                        classes="border-box input-text margin-box full-width" />
                </div>
            </div>
        );
    }
}