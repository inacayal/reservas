/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * axios
 */
import {GET} from '../../../utils/api';
/**
 * componentes
 */
import Calendar from '../../../componentes/agenda/Agenda';
import LoadBar from '../../../componentes/control/LoadBar';
import Titulo from '../../../componentes/basic/Titulo';
/**
 * constantes
 */
import { NO_WEEK_CONTROLS } from '../../../constantes/CalendarControls';

export const listHandler = (endpoint) => {
    return function () {
        const date = this.state.date ? this.state.date : new Date(),
            request = GET({
                endpoint: endpoint + parseInt(date.getMonth()+1) + '/' + date.getFullYear(),
                download: this.downloadHandler
            });
        this.setState({data:null});
        request
            .then(
                response => {
                    this.setState({
                        data: {
                            data:response.data.reservas.data,
                            horarios: {
                                data:response.data.horarios.data,
                                intervalo:response.data.intervalo.id,
                                antelacion: response.data.antelacion
                            },
                            date:date
                        }
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message);
                }
            );
    }
}

export class Calendario extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            weekRender: true,
            dayRender: true,
            show: "1",
            controls: NO_WEEK_CONTROLS
        };
        this.actions = {
            outer: null,
            inner: {
                ver: this.verReserva,
                aceptar: this.aceptarReserva,
                rechazar: this.rechazarReserva,
                revertir: this.revertirReserva
            }
        };

        this.verReserva = this.verReserva.bind(this);
        this.aceptarReserva = this.aceptarReserva.bind(this);
        this.rechazarReserva = this.rechazarReserva.bind(this);
        this.revertirReserva = this.revertirReserva.bind(this);
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

    verReserva() {
        console.log('verReserva');
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
                    <Calendar
                        show={this.state.show}
                        horariosReserva={data.horarios}
                        date={data.date}
                        weekRender={this.state.weekRender}
                        dayRender={this.state.dayRender}
                        actions={this.actions}
                        controls={this.state.controls}
                        data={data.data}
                        type="reservas"
                        fetchNewMonth={this.props.fetch}/>
                </div>
            </>
        );
    }
}
