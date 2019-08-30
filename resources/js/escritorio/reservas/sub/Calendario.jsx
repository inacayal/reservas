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
import { ALL_CONTROL } from '../../../constantes/CalendarControls';

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
            controls: ALL_CONTROL
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
        this.fetchData = this.fetchData.bind(this);

        this.nav = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar nueva
                    </div>
                ),
                to: 'reservas/agregar'
            }
        ];
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
        console.log('mes');
        let day = parseInt(e.currentTarget.getAttribute('data')),
            date = this.state.date.setDate(day),
            controls = this.state.controls.map(
                (e, i) => {
                    e.class = (i === 3) ?
                        "blue-background highlight-border h-padding small-v-padding"
                        : "box-transparent highlight-hover bordered h-padding small-v-padding transparent-border";
                    return e;
                }
            );
        this.setState({ show: "3", date: new Date(date), controls: controls });
    }
    
    fetchData( date ){
        this.setState({data:null});
        const request = GET({
            endpoint: 'reservas/' + 27 + '/' + parseInt(date.getMonth()+1) + '/' + date.getFullYear(),
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    this.setState({ 
                        data: response.data.reservas,
                        horarios: response.data.horarios,
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
        if (this.state.data&& this.state.loadFinished)
            return (
                <>
                    <Titulo
                        title={"Reservaciones"}
                        links={this.nav} />
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
        return (
            <LoadBar
                loaded = {this.state.loading}/>
        ); 
    }
}