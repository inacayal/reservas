/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input components
 */
import { onTextChange, Text } from '../../../componentes/input/Text'
import { showOptions, selectOption, Select } from '../../../componentes/input/Select'
/**
 * basic component
 */

export default class AgregarFormulario extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: {
                nombre: "",
                email: "",
                password: "",
                direccion: ""
            },
            select: {
                provincia: {
                    name: "provincia",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        0: "CABA",
                        1: "Buenos Aires",
                        2: "Cordoba",
                        3: "Santa fe"
                    }
                }
            }
        };
        this.onTextChange = onTextChange.bind(this);
        this.showOptions = showOptions.bind(this);
        this.selectOption = selectOption.bind(this);
    }
    render(){
        return (
            <form className="full-width box-padding">
                <div className="container">
                    <div className="row sub-title border-bottom">
                        Agregar un nuevo local
                    </div>
                    <div className="row box-padding">
                        <div className="col-md-4">
                            <Text
                                container="full-width"
                                changeValue={this.onTextChange}
                                titulo="Nombre del Local"
                                name="nombre"
                                rows={1}
                                value={this.state.text.nombre}
                                classes="border-box input-text margin-box full-width" />
                        </div>
                        <div className="col-md-4">
                            <Text
                                container="full-width"
                                changeValue={this.onTextChange}
                                titulo="Correo de usuario"
                                name="email"
                                rows={1}
                                value={this.state.text.email}
                                classes="border-box input-text margin-box full-width" />
                        </div>
                        <div className="col-md-4">
                            <Text
                                container="full-width"
                                changeValue={this.onTextChange}
                                titulo="Contraseña"
                                name="password"
                                rows={1}
                                value={this.state.text.password}
                                classes="border-box input-text margin-box full-width" />
                        </div>
                    </div>
                    <div className="row box-padding">
                        <div className="col-md-6">
                            <Text
                                container="full-width"
                                changeValue={this.onTextChange}
                                titulo="Dirección"
                                name="direccion"
                                rows={1}
                                value={this.state.text.direccion}
                                classes="border-box input-text margin-box full-width" />
                        </div>
                        <div className="col-md-6">
                            <div className="no-padding bold light-danger">
                                Provincia
                            </div>
                            <Select
                                {...this.state.select.provincia}
                                titulo="Selecciona la provincia"
                                change={this.selectOption}
                                toggle={this.showOptions} />
                        </div>
                    </div>
                    <div className="row text-right justify-content-end">
                    </div>
                </div>
            </form>
        )
    }
}
