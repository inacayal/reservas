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
import { FeriadoNavegacion as Navegacion } from '../FeriadoNavegacion';
import Titulo from '../../../componentes/basic/Titulo';
import {Calendario} from '../Calendario';
import {DAYS, MONTHS} from '../../../constantes/DaysMonths';
import {CommaList} from '../../../componentes/basic/CommaList';

const generateList = (list,endpoint) => {
    const eventos = Object.values(list).map(
        (e,i) => {
            return (
                <li
                    key={i}
                    className="small-v-margin smaller-text">
                    <Link to={endpoint+'/'+e.id}>
                        {e.nombre}
                    </Link>
                    <div>{e.descripcion}</div>
                    <div>
                        <span className="side-margin bold">Promociones:</span>
                        <span className="side-margin">
                            <ul className="nav-list side-margin inline-block no-padding">
                                <CommaList endpoint={e.promociones.list} list={'/promociones'}/>
                            </ul>
                        </span>
                    </div>
                </li>
            )
        }
    );
    return eventos;
};

export default class VerFeriado extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadFinished: false,
            data: null,
            open: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);

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
            endpoint: '/feriados/single/27/'+this.props.match.params.id,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.feriados[0] });
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
                date= new Date(data.fecha),
                estado = data.estado.replace('_',' '),
                eventos = generateList(data.eventos.data,'/eventos');

            return (
                <div className="container">
                    <Titulo
                        title={data.nombre}
                        links={nav.links}
                        buttons ={nav.buttons}/>
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
                                    data={data}/>
                            </div>
                            <div className="col-md-6 container">
                                <div className="h-padding row bold justify-content-end sub-title full-width">
                                    {"feriado "+ estado}
                                </div>
                                <div className="bold row light-danger side-margin">Horario de atención:</div>
                                <div className="row medium-left-padding">
                                    <span className="bold side-margin">Apertura:</span>
                                    <span className="side-margin">
                                        {
                                            data.apertura.atencion.hora + ":" +
                                            data.apertura.atencion.minuto +"hs"
                                        }
                                    </span>
                                </div>
                                <div className="row medium-left-padding">
                                    <span className="bold side-margin">Cierre:</span>
                                    <span className="side-margin">
                                        {
                                            data.cierre.atencion.hora + ":" +
                                            data.cierre.atencion.minuto +"hs"
                                        }
                                    </span>
                                </div>
                                <div className="row bold light-danger side-margin top-padding">Horario de reservas:</div>
                                <div className="row medium-left-padding">
                                    <span className="bold side-margin">Apertura:</span>
                                    <span className="side-margin">
                                        {
                                            data.apertura.reserva.hora + ":" +
                                            data.apertura.reserva.minuto +"hs"
                                        }
                                    </span>
                                </div>
                                <div className="row medium-left-padding">
                                    <span className="bold side-margin">Cierre:</span>
                                    <span className="side-margin">
                                        {
                                            data.cierre.reserva.hora + ":" +
                                            data.cierre.reserva.minuto +"hs"
                                        }
                                    </span>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 container">
                                <div className="row">
                                    <div className="bold light-danger">Descripción:</div>
                                    <div>{data.descripcion}</div>
                                </div>
                            </div>
                            <div className="col-md-6" >
                                <h6 className="highlight no-margin bold" >Eventos</h6>
                                {
                                    eventos.length>0
                                    ?
                                        <ul className="nav-list h-padding" style={{maxHeight:"30vh",overflow:'auto'}}>
                                            {eventos}
                                        </ul>
                                    :
                                        "No hay eventos asociados"
                                }
                            </div>
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
