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
import { Navegacion } from '../Navegacion';
export default class Calendario extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            weekRender: true,
            dayRender: true,
            show: "1",
            loading: 0,
            loadFinished: false,
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
        this.downloadHandler = this.downloadHandler.bind(this);
        this.fetchData = this.fetchData.bind(this);
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

    fetchData( date ){
        this.setState({data:null});
        const request = GET({
            endpoint: 'reservas/list/' + 27 + '/' + parseInt(date.getMonth()+1) + '/' + date.getFullYear(),
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    this.setState({
                        data: response.data.reservas.data,
                        horarios: {
                            data:response.data.horarios.data,
                            intervalo:response.data.intervalo.id,
                            antelacion: response.data.antelacion
                        },
                        date: date
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message);
                }
            );
    }

    componentDidMount() {
        this.fetchData(this.state.date);
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
        if (this.state.data && this.state.loadFinished){
            const nav = Navegacion.listado();
            return (
                <>
                    <Titulo
                        title={"Reservaciones"}
                        links={nav.links} />
                    <div className="container">
                        <Calendar
                            show={this.state.show}
                            horariosReserva={this.state.horarios}
                            date={this.state.date}
                            weekRender={this.state.weekRender}
                            dayRender={this.state.dayRender}
                            actions={this.actions}
                            controls={this.state.controls}
                            data={this.state.data}
                            type="reservas"
                            fetchNewMonth={this.fetchData}/>
                    </div>
                </>
            );
        }
        return (
            <LoadBar
                loaded = {this.state.loading}/>
        );
    }
}
