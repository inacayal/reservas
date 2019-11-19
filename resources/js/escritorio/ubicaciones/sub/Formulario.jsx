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
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';
/**
 * input component and handlers
 */
import {Numeric} from '../../../componentes/input/Numeric';
import {Text} from '../../../componentes/input/Text';

export class Formulario extends Component {
    constructor(props) {
        super(props);
        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);
        this.props.formActions.buttons.guardar.click = this.enviarFormulario;
        this.props.formActions.buttons.cancelar.click = this.cancelarFormulario;

        if (this.props.editar)
            this.props.nav.buttons[0].click = this.props.toggleModal;
    }

    enviarFormulario(e){
        e.preventDefault();
        console.log('guardar');
    }

    cancelarFormulario(e){
        e.preventDefault();
        console.log('guardar');
    }

    render() {
        const data = this.props.data;
        return (
            <>
                <Titulo
                    title={this.props.editar
                    ? data.nombre
                    : "Agregar ubicación"}
                    links={this.props.nav.links}
                    buttons={this.props.nav.buttons} />
                <form className="full-width">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 bold">
                                foto de la ubicacion
                            </div>
                            <div className="col-md-8 container">
                                <div className="row">
                                    <Text rows={1} titulo="Nombre de la ubicación" name="nombre" value={this.props.editar ? data.nombre : ""} classes={"border-box input-text margin-box"} container="full-width" />
                                </div>
                                <div className="row v-padding">
                                    <Text rows={4} titulo="Descripcion" name="descripcion" value={this.props.editar ? data.descripcion : ""} classes={"border-box input-text margin-box"} container="full-width" />
                                </div>
                            </div>
                        </div>
                        <div className="row v-padding">
                            <div className="col-md-6">
                                <Numeric titulo="Capacidad máxima" name="capacidad_maxima" value={this.props.editar ? data.capacidad : ""} classes={"border-box input-text margin-box"} container="full-width" />
                                <span className="smaller-text">Máximo de personas en la ubicación</span>
                            </div>
                            <div className="col-md-6">
                                <Numeric titulo="Máximo personas" name="maximo_personas" value={this.props.editar ? data.maximo : ""} classes={"border-box input-text margin-box"} container="full-width" />
                                <span className="smaller-text">Máximo de personas en una reservación</span>
                            </div>
                        </div>
                        <div className="row justify-content-end h-padding">
                            <Actions
                                buttons={Object.values(this.props.formActions.buttons)}/>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}
