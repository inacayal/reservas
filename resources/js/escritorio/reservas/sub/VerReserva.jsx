/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';
import {Calendario} from '../../horarios/Calendario';
import {MONTHS} from '../../../constantes/DaysMonths';
/**
 * basic
 */
import { Navegacion } from '../Navegacion';
import Titulo from '../../../componentes/basic/Titulo';
import {ReservasActions} from '../../../acciones/ReservasActions';

export default class VerReserva extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadFinished: false,
            data: null,
            open: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
        this.aceptarReserva = this.aceptarReserva.bind(this);
        this.rechazarReserva = this.rechazarReserva.bind(this);
        this.revertirReserva = this.revertirReserva.bind(this);

        this.actions = {
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

    downloadHandler(pEvent) {
        let
            loading = Math.round((pEvent.loaded * 100) / pEvent.total),
            state = loading !== 100 ?
                { loading, loadFinished: false }
                : { loading, loadFinished: true };
        this.setState(state);
    }

    fetchData() {
        this.setState({
            data: null,
            isLoading: true,
            loadFinished: false
        });

        const request = GET({
            endpoint: '/reservas/single/27/'+this.props.match.params.id,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.reservas[0] });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    render() {
        if (this.state.data && this.state.loadFinished) {
            const data = this.state.data,
                nav = Navegacion.singular(data),
                actions = ReservasActions.day[data.estado](this.actions,data.estado),
                date = new Date(data.fechaReserva+" 00:00");
            
            return (
                <div className="container">
                    < Titulo
                        title={"Viendo Reserva"}
                        links={nav.links}
                        buttons ={actions.buttons}/>
                    <div className="row"> 
                        <div className="col-md-7">
                            <div className="bold">{"Viendo "+MONTHS[date.getMonth()] + " de " + date.getFullYear()}</div>
                            <Calendario
                                editar={true}
                                date={date}
                                data={data}/>
                        </div>
                        <div className="col-md-5">
                            
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}

