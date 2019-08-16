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
export default class Encargado extends Component{
    constructor(props){
        super(props);
        this.state={
            text:{
                adm_nombre: this.props.data.nombre,
                adm_telefono: this.props.data.telefono,
                adm_email: this.props.data.email
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
                    < span className = "side-margin inline-block text-top" >
                        Datos de contacto del encargado
                    </span >
                    <Actions
                        links={this.nav} />
                </div>
                <form action="">
                    <div className="container v-padding">
                        <div className="row">
                            <div className="col-sm-4">
                                <Text
                                    container="full-width"
                                    changeValue={ this.textChange}
                                    titulo="Nombre"
                                    name="adm_nombre"
                                    rows={1}
                                    value={this.state.text.adm_nombre}
                                    classes="border-box input-text margin-box full-width" />
                            </div>
                            <div className="col-sm-4">
                                <Text
                                    container="full-width"
                                    changeValue={this.textChange}
                                    titulo="Teléfono de contacto"
                                    name="adm_telefono"
                                    rows={1}
                                    value={this.state.text.adm_telefono}
                                    classes="border-box input-text margin-box full-width" />
                            </div>
                            <div className="col-sm-4">
                                <Text
                                    container="full-width"
                                    changeValue={this.textChange}
                                    titulo="Correo de contacto"
                                    name="adm_email"
                                    rows={1}
                                    value={this.state.text.adm_email}
                                    classes="border-box input-text margin-box full-width" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>    
        );
    }
}