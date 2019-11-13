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
    return function (params) {
        const date = params.date||new Date(),
            request = GET({
                endpoint: endpoint + parseInt(date.getMonth()+1) + '/' + date.getFullYear(),
                download: this.downloadHandler
            });
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
                            date:date,
                            show:params.show||"1",
                            loadFinished:true
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
            controls: NO_WEEK_CONTROLS
        };

        this.verReserva = this.verReserva.bind(this);
        this.aceptarReserva = this.aceptarReserva.bind(this);
        this.rechazarReserva = this.rechazarReserva.bind(this);
        this.revertirReserva = this.revertirReserva.bind(this);

        this.actions = {
            outer: null,
            inner: {
                ver: this.verReserva,
                aceptar: this.aceptarReserva,
                rechazar: this.rechazarReserva,
                revertir: this.revertirReserva
            }
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
                        show={data.show}
                        horariosReserva={data.horarios}
                        date={data.date}
                        weekRender={true}
                        dayRender={true}
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
