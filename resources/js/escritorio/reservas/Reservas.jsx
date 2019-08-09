/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elements
 */
import AgregarFormulario from './subElements/AgregarFormulario';
import Calendario from './subElements/Calendario';
/**
 * componentes
 */
import Titulo from '../../componentes/basic/Titulo';
/**
 * funciones
 */
import { formActions, formNavigation, panelNavigation } from '../../funciones/dataActions';
/**
 * constantes
 */
import {ALL_CONTROL} from '../../constantes/CalendarControls';

export default class Reservas extends Component {
    constructor(props) {
        super(props);
        this.state = {agregar: false};
        this.guardarNuevaReserva = this.guardarNuevaReserva.bind(this);
        this.agregarReserva = this.agregarReserva.bind(this);
        this.verCalendario = this.verCalendario.bind(this);
        this.reservaFormControls = formActions(this.verCalendario, this.guardarNuevaReserva);
        this.panelNavigation = panelNavigation(this.verCalendario, this.agregarReserva);
    }

    agregarReserva() {
        this.setState({ agregar: true });
    }

    verCalendario(e) {
        e.preventDefault();
        this.setState({ agregar: !this.state.agregar });
    }

    guardarNuevaReserva(e){
        e.preventDefault();
        console.log('guardar');
    }

    shouldComponentUpdate(nextProps){
        return this.props.panel||nextProps.panel;
    }

    render() {
        const controls = this.state.agregar ?
            [this.panelNavigation[0]]
            : [this.panelNavigation[1]],
            componentRender = this.state.agregar ? (
                <>
                    <div className="full-width sub-title border-bottom">Agregar nueva reserva</div>
                    <AgregarFormulario
                        verCalendario={this.verCalendario}
                        formControls={this.reservaFormControls} />
                </>
            ) : (
                <Calendario
                    verCalendario={this.verCalendario}
                    agregarReserva={this.agregarReserva}/>
            );
        
        return (
            <div className={(this.props.panel) ? "container" : "hidden"}>
                <Titulo
                    title={"Reservaciones"}
                    navigation={controls}/>
                <div className='container'>
                    <div className="row">
                        {componentRender}
                    </div>
                </div>
            </div>
        );
    }
}