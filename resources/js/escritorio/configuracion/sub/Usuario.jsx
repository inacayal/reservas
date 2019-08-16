/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import {onTextChange,Text} from '../../../componentes/input/Text';
import Actions from '../../../componentes/basic/Actions';

export default class Usuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:{
                email_local:this.props.data.email,
                razon_social:this.props.data.social,
                cuit:this.props.data.cuit
            }
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
        ];
    }
    render(){
        return (
            <div className="full-width">
                <div className="sub-title h-padding full-width border-bottom">
                    <span className="side-margin inline-block text-top" >
                        Datos del usuario
                    </span >
                    <Actions
                        links={this.nav} />
                </div>
                <form action="">
                    <div className="container">
                        <div className="row box-padding">
                            <div className="col-sm-6">
                                <Text
                                    container="full-width"
                                    changeValue={this.textChange}
                                    titulo="Email de usuario"
                                    name="email_local"
                                    rows={1}
                                    value={this.state.text.email}
                                    readOnly={true}
                                    classes="border-box input-text margin-box full-width" />
                            </div>
                            <div className="col-sm-6">
                                <Text
                                    container="full-width"
                                    changeValue={this.textChange}
                                    titulo="Contraseña de usuario"
                                    name="password_local"
                                    rows={1}
                                    value={''}
                                    classes="border-box input-text margin-box full-width" />
                            </div>
                        </div>
                        <div className="row box-padding">
                            <div className="col-sm-6">
                                <Text
                                    container="full-width"
                                    changeValue={this.textChange}
                                    titulo="Razón Social"
                                    name="razon_social"
                                    rows={1}
                                    value={this.state.text.razon_social}
                                    classes="border-box input-text margin-box full-width" />
                            </div>
                            <div className="col-sm-6">
                                <Text
                                    container="full-width"
                                    changeValue={this.textChange}
                                    titulo="CUIT / CUIL"
                                    name="cuit_cuil"
                                    rows={1}
                                    value={this.state.text.cuit_cuil}
                                    classes="border-box input-text margin-box full-width" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}