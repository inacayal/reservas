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
import Calendar from '../../../componentes/calendario/Calendar';
import LoadBar from '../../../componentes/control/LoadBar';
/**
 * constantes
 */
import { ALL_CONTROL } from '../../../constantes/CalendarControls';

var horariosReserva = {
    intervalo: "10",
    caida: "20",
    horarios: {
        0: {
            apertura: "15:00:00",
            cierre: "17:30:00",
            estado: "1"
        },
        1: {
            apertura: "14:30:00",
            cierre: "18:00:00",
            estado: "1"
        },
        2: {
            apertura: "16:30:00",
            cierre: "20:30:00",
            estado: "0"
        },
        3: {
            apertura: "15:30:00",
            cierre: "21:00:00",
            estado: "1"
        },
        4: {
            apertura: "16:00:00",
            cierre: "19:30:00",
            estado: "1"
        },
        5: {
            apertura: "17:00:00",
            cierre: "22:30:00",
            estado: "1"
        },
        6: {
            apertura: "21:30:00",
            cierre: "23:00:00",
            estado: "1"
        }
    }
};
export default class Calendario extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            weekRender: true,
            dayRender: true,
            show: "2",
            loading: 0,
            loadFinished: false,
            controls: ALL_CONTROL,
            horarios: horariosReserva,
        };
        this.actions = {
            outer: {
                ver: this.verDia.bind(this),
                expandir: this.expandirReservaSemanal.bind(this)
            },
            inner: {
                ver: this.verReserva,
                aceptar: this.aceptarReserva,
                rechazar: this.rechazarReserva,
                revertir: this.revertirReserva
            }
        };
        this.verDia = this.verDia.bind(this);
        this.verReserva = this.verReserva.bind(this);
        this.aceptarReserva = this.aceptarReserva.bind(this);
        this.rechazarReserva = this.rechazarReserva.bind(this);
        this.revertirReserva = this.revertirReserva.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
    }

    revertirReserva() {
        console.log('revertir');
    }

    expandirReservaSemanal(e) {
        let show = e.currentTarget.getAttribute('data'),
            data = this.state.data,
            reserve = data[show];
        reserve.show = !reserve.show;
        data[show] = reserve;
        this.setState({ data: data, weekRender: !this.state.weekRender });
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

    verDia(e) {
        let dt = parseInt(e.currentTarget.getAttribute('data')),
            date = new Date(dt),
            controls = this.state.controls.map(
                (e, i) => {
                    e.class = (i === 3) ?
                        "blue-background highlight-border h-padding small-v-padding"
                        : "box-transparent highlight-hover bordered h-padding small-v-padding transparent-border";
                    return e;
                }
            );
        date.setHours(0, 0, 0, 0);
        this.setState({ show: "3", date: date, controls: controls });
    } 

    componentDidMount() {
        const request = GET({
            endpoint: 'reservas/27/08',
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    this.setState({data:response.data});
                }
            )
            .catch(
                error => {
                    console.log('error')
                }
            );
    }

    downloadHandler(pEvent) {
        let
            loading = Math.round((pEvent.loaded * 100) / pEvent.total),
            state = loading !== 100 ?
                { loading, loadFinished: false }
                : { loading, loadFinished: true };
        this.setState(state);
    }

    componentWillUnmount() {
        console.log('reservasSubUnmount');
    }

    render(){
        if (this.state.data)
            return (
                <Calendar
                    show={this.state.show}
                    horariosReserva={this.state.horarios}
                    date={this.state.date}
                    weekRender={this.state.weekRender}
                    dayRender={this.state.dayRender}
                    actions={this.actions}
                    controls={this.state.controls}
                    data={this.state.data}
                    type="reservas"/>
                );
        return (
            <LoadBar
                loaded = {this.state.loading}/>
        ); 
    }
}