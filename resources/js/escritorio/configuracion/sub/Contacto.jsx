/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import {Text, onTextChange} from '../../../componentes/input/Text';
import Actions from '../../../componentes/basic/Actions';
export default class Contacto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correo_local:this.props.data.email,
            telefono_local:this.props.data.telefono
        };
        this.textChange = onTextChange.bind(this);
        this.nav = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-arrow-left inline-box side-margin" />
                        Volver a configuración
                    </div>
                ),
                to: '/configuracion'
            }
        ]
    }
    render(){
        return (
            <div className="row">
                <div className="sub-title h-padding full-width border-bottom">
                    <span className="side-margin inline-block text-top">
                        Datos de contacto del local
                    </span>
                    <Actions
                        links={this.nav} />
                </div>
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