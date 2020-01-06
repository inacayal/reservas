/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import Agenda from '../../../componentes/agenda/Agenda';
import Titulo from '../../../componentes/basic/Titulo';
import { NO_WEEK_CONTROLS } from '../../../constantes/CalendarControls';

export default class Calendario extends Component {
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
        const   date = new Date(e.currentTarget.getAttribute('data')),
                show = this.state.show,
                controls=this.state.controls;
        this.props.history.replace({
            state:{
                date:date,
                show:"3"
            }
        });
    }

    componentWillUnmount() {
        console.log('reservasSubUnmount');
    }

    componentDidUpdate(pp){
        const location = this.props.location || {};
        if ((location.state||{}).date !== (pp.location.state||{}).date)
            this.setState({
                date:new Date(this.props.location.state.date),
                show:this.props.location.state.show
            })
    }

    render(){
        const data = this.props.data;
        return (
            <>
                <Titulo title={"Reservaciones"}
                        links={this.props.nav.links} />
                <div className="container">
                    <Agenda show={this.state.show}
                            horariosReserva={data.horarios}
                            date={this.state.date}
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
