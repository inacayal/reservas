import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import Numeric from '../../../../componentes/input/Numeric';
import ButtonList from '../../../../componentes/complex/allUse/ButtonList';
import Text from '../../../../componentes/input/Text';


export default class AgregarFormulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input:{
                capacidad_maxima:0,
                descripcion: "", 
                nombre_ubicacion:""
            }
        }
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.editarUbicacion = this.editarUbicacion.bind(this);
        this.agregarUbicacion = this.agregarUbicacion.bind(this);
    }

    onNumberChange(e) {
        let input = e.currentTarget,
            name = input.getAttribute('name'),
            numberInput = this.state.input;

        numberInput[name] = input.value;
        this.setState({ numeric: numberInput });
    }

    onTextChange(e) {
        let input = e.currentTarget,
            name = input.getAttribute('name'),
            textInputs = this.state.input;

        textInputs[name] = input.value;
        this.setState({ text: textInputs });
    }


    editarUbicacion(id) {
        let ubicacion = this.props.data[id],
            input = this.state.input;

        input.descripcion = ubicacion.descripcion;
        input.capacidad_maxima = parseInt(ubicacion.capacidad);
        input.nombre_ubicacion = ubicacion.nombre;

        this.setState({input});
    }

    agregarUbicacion() {
        let input = this.state.input;
        
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
            <form className="full-width">
                <div className="container">
                    <div className="row sub-title h-padding">
                        {this.props.title}
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="container">
                                <div className="row">
                                    <Text
                                        container="full-width"
                                        changeValue={this.onTextChange}
                                        titulo="Nombre de ubicación"
                                        name="nombre_ubicacion"
                                        rows={1}
                                        value={this.state.input.nombre_ubicacion}
                                        classes="border-box input-text margin-box full-width" />
                                </div>
                                <div className="row">
                                    <Numeric
                                        container="full-width"
                                        changeValue={this.onNumberChange}
                                        titulo="Capacidad máxima"
                                        name="capacidad_maxima"
                                        value={this.state.input.capacidad_maxima}
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
                                value={this.state.input.descripcion}
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