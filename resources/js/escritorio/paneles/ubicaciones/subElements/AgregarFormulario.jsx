/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * react calendar date picker
 */
import Calendar from 'react-calendar';
/**
 * componentes
 */
import ButtonList from '../../../../componentes/basic/ButtonList';
/**
 * input component and handlers
 */
import {Numeric,onNumberChange} from '../../../../componentes/input/Numeric';
import {Text,onTextChange} from '../../../../componentes/input/Text';


export default class AgregarFormulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:{
                capacidad_maxima:0,
                descripcion: "", 
                nombre_ubicacion:""
            }
        }
        this.onNumberChange = onNumberChange.bind(this);
        this.onTextChange = onTextChange.bind(this);

        this.editarUbicacion = this.editarUbicacion.bind(this);
        this.agregarUbicacion = this.agregarUbicacion.bind(this);
    }
    editarUbicacion(id) {
        let ubicacion = this.props.data[id],
            input = this.state.text;

        input.descripcion = ubicacion.descripcion;
        input.capacidad_maxima = parseInt(ubicacion.capacidad);
        input.nombre_ubicacion = ubicacion.nombre;

        this.setState({input});
    }

    agregarUbicacion() {
        let input = this.state.text;
        
        input.descripcion = "";
        input.capacidad_maxima = 0;
        input.nombre_ubicacion ="";

        this.setState({ input });
    }

    componentDidUpdate(prevProps,prevState) {
        if (this.props.show) {
            if (this.props.editar && (this.props.editar !== prevProps.editar))
                return this.editarUbicacion(this.props.editar);
            if (this.props.agregar !== prevProps.agregar)
                return this.agregarUbicacion();
        }
    }

    render() {
        return (
            <form className="full-width box-padding">
                <div className="container">
                    <div className="row sub-title border-bottom">
                        {this.props.title}
                    </div>
                    <div className="row box-padding">
                        <div className="col-md-6">
                            <div className="container">
                                <div className="row">
                                    <Text
                                        container="full-width"
                                        changeValue={this.onTextChange}
                                        titulo="Nombre de ubicación"
                                        name="nombre_ubicacion"
                                        rows={1}
                                        value={this.state.text.nombre_ubicacion}
                                        classes="border-box input-text margin-box full-width" />
                                </div>
                                <div className="row">
                                    <Numeric
                                        container="full-width"
                                        changeValue={this.onNumberChange}
                                        titulo="Capacidad máxima"
                                        name="capacidad_maxima"
                                        value={this.state.text.capacidad_maxima}
                                        classes="border-box input-text margin-box full-width" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Text
                                container="full-width"
                                changeValue={this.onTextChange}
                                titulo="Descripción"
                                name="descripcion"
                                rows={4}
                                value={this.state.text.descripcion}
                                classes="border-box input-text margin-box full-width" />
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <ButtonList
                            displayList="flex-row nav-list no-padding inline-block  align-center"
                            container="side-margin inline-block"
                            elems={this.props.formActions} />
                    </div>
                </div>
            </form>
        );
    }
}