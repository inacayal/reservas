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
                descuento:0,
                promocion: "", 
                nombre_evento:""
            }
        }
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.editarEvento = this.editarEvento.bind(this);
        this.agregarEvento = this.agregarEvento.bind(this);
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


    editarEvento(id) {
        let evento = this.props.data[id],
            input = this.state.input;

        input.promocion = evento.promocion;
        input.descuento = parseInt(evento.descuento);
        input.nombre_evento = evento.nombre;

        this.setState({input});
    }

    agregarEvento() {
        let input = this.state.input;
        
        input.promocion ="";
        input.descuento = 0;
        input.nombre_evento ="";

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
                                        titulo="Nombre de evento"
                                        name="nombre_Evento"
                                        rows={1}
                                        value={this.state.input.nombre_evento}
                                        classes="border-box input-text margin-box full-width" />
                                </div>
                                <div className="row">
                                    <Numeric
                                        container="full-width"
                                        changeValue={this.onNumberChange}
                                        titulo="Descuento"
                                        name="descuento"
                                        value={this.state.input.descuento}
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
                                value={this.state.input.promocion}
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