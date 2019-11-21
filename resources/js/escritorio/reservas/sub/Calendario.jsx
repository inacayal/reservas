/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom'
/**
 * axios
 */
import {GET} from '../../../utils/api';
/**
 * componentes
 */
import Agenda from '../../../componentes/agenda/Agenda';
import LoadBar from '../../../componentes/control/LoadBar';
import Titulo from '../../../componentes/basic/Titulo';
/**
 * constantes
 */
import { NO_WEEK_CONTROLS } from '../../../constantes/CalendarControls';

export class Calendario extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: this.props.data.date,
            controls: NO_WEEK_CONTROLS,
            show:"1"
        };

        this.verReserva = this.verReserva.bind(this);
        this.aceptarReserva = this.aceptarReserva.bind(this);
        this.rechazarReserva = this.rechazarReserva.bind(this);
        this.revertirReserva = this.revertirReserva.bind(this);

        this.actions = {
            ver: this.verReserva,
            aceptar: this.aceptarReserva,
            rechazar: this.rechazarReserva,
            revertir: this.revertirReserva
        };
    }

    revertirReserva() {
        console.log('revertir');
    }

    aceptarReserva() {
        console.log('aceptarReserva');
    }

    rechazarReserva() {
        console.log('rechazarReserva');
    }

    verReserva(e) {
        e.preventDefault();
        const date = new Date(e.currentTarget.getAttribute('data')),
            show = this.state.show,
            controls=this.state.controls;
        this.setState({date:date,show:"3"})
    }

    componentWillUnmount() {
        console.log('reservasSubUnmount');
    }

    render(){
        const data = this.props.data;
        return (
            <>
                <Titulo
                    title={"Reservaciones"}
                    links={this.props.nav.links} />
                <div className="container">
                    <Agenda
                        show={this.state.show}
                        horariosReserva={data.horarios}
                        date={this.state.date}
                        weekRender={true}
                        dayRender={true}
                        actions={this.actions}
                        controls={this.state.controls}
                        data={data.data}
                        type="reservas"
                        endpoint="reservas"
                        fetchNewMonth={this.props.fetch}/>
                </div>
            </>
        );
    }
}
