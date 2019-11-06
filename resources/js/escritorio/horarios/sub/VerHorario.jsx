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
/**
 * constantes
 */
import {DAYS} from '../../../constantes/DaysMonths';
import {CommaList} from '../../../componentes/basic/CommaList';
import {ConfirmarModal} from '../../../componentes/modal/Modal';
import EventosTable from '../../../componentes/tables/EventosTable';


export default class VerHorario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadFinished: false,
            data: null,
            open: false
        };
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.props.nav.buttons[0].click = this.toggleModal;
    }

    toggleModal(e) {
        e.preventDefault();
        this.setState({
            open: !this.state.open
        });
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
            endpoint: '/horarios/single/27/' + this.props.match.params.id,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.horarios[0] });
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
                estado = data.estado.replace('_',' '),
                eventos = Object.values(data.eventos.data).map(
                    e => ({
                        ...e,
                        nombre:<Link to={"/eventos/"+e.id}>{e.nombre}</Link>,
                        promociones:<CommaList list={e.promociones.list} endpoint={'/promociones'}/>
                    })
                );

            return (
                <>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Eliminar Horario"
                        content="¿estás seguro de eliminar este horario?" />
                    <div className="container">
                        < Titulo
                            title={DAYS[this.state.data.diaSemana-1]}
                            links={this.props.nav.links}
                            buttons={this.props.nav.buttons} />
                        <div className="container v-padding">
                            <div className="row bold sub-title justify-content-end">{"día " +estado}</div>
                            <div className="row ">
                                <div className="col-md-6 container-fluid">
                                    <div className="bold row light-danger side-margin">Horario de atención:</div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <span className="bold side-margin">Apertura:</span>
                                            <span className="side-margin">
                                            {
                                                data.apertura.atencion.hora + ":" +
                                                data.apertura.atencion.minuto +"hs"
                                            }
                                            </span>
                                        </div>
                                        <div className="col-md-6">
                                            <span className="bold side-margin">Cierre:</span>
                                            <span className="side-margin">
                                            {
                                                data.cierre.atencion.hora + ":" +
                                                data.cierre.atencion.minuto +"hs"
                                            }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 container-fluid">
                                    <div className="row bold light-danger side-margin top-padding">Horario de reservas:</div>
                                    <div className="row medium-left-padding">
                                        <div className="col-md-6">
                                            <span className="bold side-margin">Apertura:</span>
                                            <span className="side-margin">
                                            {
                                                data.apertura.reserva.hora + ":" +
                                                data.apertura.reserva.minuto +"hs"
                                            }
                                            </span>
                                        </div>
                                        <div className="col-md-6">
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
                            </div>
                            <div className="row v-padding">
                                <h6 className="sub-title bold">Eventos</h6>
                                {
                                    eventos.length>0
                                    ?
                                        <EventosTable data={eventos} showPromociones ={true}/>
                                    :
                                        "No hay eventos asociados"
                                }
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
