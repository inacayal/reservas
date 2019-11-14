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
import Titulo from '../../../componentes/basic/Titulo';
import {ReservasActions} from '../../../acciones/ReservasActions';

export const singleHandler = (endpoint) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    this.setState({
                        data: response.data.reservas[0],
                        loadFinished:true
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}

export class VerReserva extends Component {
    constructor(props){
        super(props);

        this.actions = {
            aceptar: this.aceptarReserva.bind(this),
            rechazar: this.rechazarReserva.bind(this),
            revertir: this.revertirReserva.bind(this)
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

    componentDidMount() {
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    render() {
        const data = this.props.data,
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
            <>
                <Titulo
                    title={"Reserva de "+data.nombre+ " " + data.apellido}
                    links={this.props.nav.links}
                    buttons ={actions.buttons}/>
                <div className="container v-padding">
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
                                        DNI
                                    </div>
                                    <div>
                                        {data.dni||"sin DNI"}
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
                            Observaciones:
                        </div>
                        <div className="col-md-9">
                            {data.descripcion}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
