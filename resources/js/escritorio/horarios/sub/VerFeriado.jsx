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
/**
 * basic
 */
import Titulo from '../../../componentes/basic/Titulo';
import {Calendario} from '../Calendario';
import {DAYS, MONTHS} from '../../../constantes/DaysMonths';
import {CommaList} from '../../../componentes/basic/CommaList';
import {ConfirmarModal} from '../../../componentes/modal/Modal';
import EventosTable from '../../../componentes/tables/EventosTable';


export const singleHandler = (endpoint) => {
    return function (params){
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    console.log(response.data)
                    this.setState({
                        data: {
                            data:response.data.feriados[0],
                            eventos:response.data.eventos,
                            intervalo:response.data.intervalo
                        },
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

export class VerFeriado extends Component {
    constructor(props){
        super(props);
        this.props.nav.buttons[0].click = this.props.toggleModal;
    }

    fetchData() {
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    render() {
        const data = this.props.data,
            date= new Date(data.data.fecha),
            estado = data.data.estado.replace('_',' '),
            eventos = Object.values(data.eventos.data).map(
                e => ({
                    ...e,
                    nombre:<Link to={"/eventos/"+e.id}>{e.nombre}</Link>,
                    promociones:<CommaList list={e.promociones.list} endpoint={'/promociones'}/>
                })
            );

        return (
            <>
                <Titulo
                    title={data.data.nombre}
                    links={this.props.nav.links}
                    buttons ={this.props.nav.buttons}/>
                <div className="container full-width v-padding">
                    <div className="row justify-content-end v-padding">
                        <div className="col-md-6">
                            <div className="bold">
                                {
                                    DAYS[date.getDay()] +" "+
                                    date.getDate()+ " de "+
                                    MONTHS[date.getMonth()]+ " del " +
                                    date.getFullYear()
                                }
                            </div>
                            <Calendario
                                editar={true}
                                date={date}
                                data={data.data}/>
                        </div>
                        <div className="col-md-6 container">
                            <div className="h-padding row bold justify-content-end sub-title full-width">
                                {"feriado "+ estado}
                            </div>
                            <div className="bold row light-danger">Horario de atención:</div>
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="bold side-margin">Apertura:</span>
                                    <span className="side-margin">
                                    {
                                        data.data.apertura.atencion.hora + ":" +
                                        data.data.apertura.atencion.minuto +"hs"
                                    }
                                    </span>
                                </div>
                                <div className="col-md-6">
                                    <span className="side-margin">
                                    <span className="bold side-margin">Cierre:</span>
                                    {
                                        data.data.cierre.atencion.hora + ":" +
                                        data.data.cierre.atencion.minuto +"hs"
                                    }
                                    </span>
                                </div>
                            </div>
                            <div className="row bold light-danger top-padding">Horario de reservas:</div>
                            <div className="row ">
                                <div className="col-md-6">
                                    <span className="bold side-margin">Apertura:</span>
                                    <span className="side-margin">
                                    {
                                        data.data.apertura.reserva.hora + ":" +
                                        data.data.apertura.reserva.minuto +"hs"
                                    }
                                    </span>
                                </div>
                                <div className="col-md-6">
                                    <span className="bold side-margin">Cierre:</span>
                                    <span className="side-margin">
                                    {
                                        data.data.cierre.reserva.hora + ":" +
                                        data.data.cierre.reserva.minuto +"hs"
                                    }
                                    </span>
                                </div>
                            </div>
                            <div className="row top-padding">
                                <div className="bold light-danger">Descripción:</div>
                                <div>{data.data.descripcion}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h6 className="sub-title bold" >Eventos</h6>
                        {
                            eventos.length>0
                            ?
                                <EventosTable data={eventos} showPromociones ={true}/>
                            :
                                "No hay eventos asociados"
                        }
                    </div>
                </div>
            </>
        )
    }
}
