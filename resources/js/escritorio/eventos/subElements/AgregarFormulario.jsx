import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
/**
 * elements
 */
import ButtonList from '../../../componentes/basic/ButtonList';
/**
 * handlers and elements
 */
import { Numeric,onNumberChange } from '../../../componentes/input/Numeric';
import { Text,onTextChange } from '../../../componentes/input/Text';
export default class AgregarFormulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:{
                descuento:0,
                promocion: "", 
                nombreEvento:""
            }
        }
        this.onNumberChange = onNumberChange.bind(this);
        this.onTextChange = onTextChange.bind(this);
        this.editarEvento = this.editarEvento.bind(this);
        this.agregarEvento = this.agregarEvento.bind(this);
    }

    editarEvento(id) {
        let evento = this.props.data[id],
            input = this.state.text;

        input.promocion = evento.promocion;
        input.descuento = parseInt(evento.descuento);
        input.nombreEvento = evento.nombre;

        this.setState({input});
    }

    agregarEvento() {
        let input = this.state.text;
        
        input.promocion ="";
        input.descuento = 0;
        input.nombreEvento ="";

        this.setState({ input });
    }

    componentDidUpdate(prevProps,prevState) {
        if (this.props.show) {
            if (this.props.editar && (this.props.editar !== prevProps.editar))
                return this.editarEvento(this.props.editar);
            if (this.props.agregar !== prevProps.agregar)
                return this.agregarEvento();
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
                                        titulo="Nombre de evento"
                                        name="nombreEvento"
                                        rows={1}
                                        value={this.state.text.nombreEvento}
                                        classes="border-box input-text margin-box full-width" />
                                </div>
                                <div className="row">
                                    <Numeric
                                        container="full-width"
                                        changeValue={this.onNumberChange}
                                        titulo="Descuento"
                                        name="descuento"
                                        value={this.state.text.descuento}
                                        classes="border-box input-text margin-box full-width" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Text
                                container="full-width"
                                changeValue={this.onTextChange}
                                titulo="Promoción del evento"
                                name="promocion"
                                rows={4}
                                value={this.state.text.promocion}
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