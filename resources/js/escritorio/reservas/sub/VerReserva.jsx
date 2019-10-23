/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
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
                date = new Date(data.fechaReserva+" 00:00"),
                ElemByState = {
                    Aprobada: ()=>(
                        <div className="bold">
                            <i className="fas fa-check-circle inline-box side-margin"/>
                            Aprobada
                        </div>
                    ),
                    Rechazada: ()=>(
                        <div className="bold">
                            <i className="fas fa-times-circle inline-box side-margin"/>
                            Rechazada
                        </div>
                    ),
                    Pendiente: ()=>(
                        <div className="bold">
                            <i className="fas fa-history inline-box side-margin"/>
                            Pendiente
                        </div>
                    )
                };
            return (
                <div className="container">
                    < Titulo
                        title={"Viendo Reserva"}
                        links={nav.links}
                        buttons ={actions.buttons}/>
                    <div className="row"> 
                        <div className="col-md-7">
                            <div className="bold">{MONTHS[date.getMonth()] + " de " + date.getFullYear()}</div>
                            <Calendario
                                editar={true}
                                date={date}
                                data={data}/>
                        </div>
                        <div className="col-md-5 container">
                            <div className="row v-padding">
                                <div className="col-md-6 c-title">
                                    {data.hora_reserva+"hs."}
                                </div>
                                <div className="col-md-6 text-right">
                                    {ElemByState[data.estado]()}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className=" bold light-danger">
                                        Nombre y apellido
                                    </div>
                                    <div>
                                        {data.nombre + " " + data.apellido}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="bold light-danger">
                                        Correo
                                    </div>
                                    <div>{data.email}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="bold light-danger">
                                        Telefono
                                    </div>
                                    <div>{data.telefono}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="bold light-danger">
                                        Cantidad de personas
                                    </div>
                                    <div>{data.personas + " personas"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row v-padding">
                        <div className="col-md-4">
                            <div>
                                <span className="bold light-danger side-margin">Evento:</span>
                                <Link to={"/eventos/"+ data.evento.id}>
                                    <span className="side-margin">{data.evento.nombre}</span>
                                </Link>
                            </div>
                            <div>{data.evento.descripcion||"sin definir"}</div>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <span className="bold light-danger side-margin">Promoción:</span>
                                <Link to={"/promociones/"+data.promocion.id}>
                                    <span className="side-margin">{data.promocion.nombre||"sin definir"}</span>
                                </Link>
                            </div>
                            <div>{data.promocion.descripcion||"sin definir"}</div>
                            <div className="small-v-padding">
                                <span className="bold side-margin">descuento:</span>
                                <span className="side-margin">{data.promocion.descuento+"%"||"sin definir"}</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <span className="bold light-danger side-margin">Ubicación:</span>
                                <Link to={"/ubicaciones/"+data.ubicacion.id}>
                                    <span className="side-margin">{data.ubicacion.nombre||"sin definir"}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row v-padding">
                        <div className="col-md-3 bold light-danger">
                            Observaciones
                        </div>
                        <div className="col-md-9">
                            {data.descripcion}
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

