/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import { Select, showOptions, selectOption } from '../../../../componentes/input/Select';
import { Text, onTextChange } from '../../../../componentes/input/Text';

export default class Ubicacion extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: {
                direccion_local:''
            },
            select:{
                id_provincia: {
                    name: "id_provincia",
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
        }
        this.guardarConfiguracion = this.guardarConfiguracion.bind(this);
        this.onTextChange = onTextChange.bind(this);
        this.showOptions = showOptions.bind(this);
        this.onTextChange = onTextChange.bind(this);
    }

    guardarConfiguracion(e) {
        e.preventDefault();
        console.log('guardado');
    }   

    componentDidMount() {
        console.log('configuracionUbicacionMount');
    }

    componentWillUnmount() {
        console.log('configuracionUbicacionUnmount');
    }

    render (){
        return (
            <div className={this.props.show ? "row" : "hidden"}>
                <div className="sub-title full-width h-padding border-bottom">Ubicación del local</div>
                <div className="col-sm-6 box-padding">
                    <h6 className="bold light-danger"> Provincia </h6>
                    <Select
                        {...this.state.select.id_provincia}
                        titulo="Selecciona la provincia"
                        change={this.selectOption}
                        toggle={this.showOptions} />
                </div>
                <div className="col-sm-6 box-padding">
                    <Text
                        container="full-width"
                        changeValue={this.onTextChange}
                        titulo="Dirección"
                        name="direccion_local"
                        rows={1}
                        value={this.state.text.direccion_local}
                        classes="border-box input-text margin-box full-width" />
                </div>
            </div>
        );
    }
}