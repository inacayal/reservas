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
import { assignHorarios } from './generateEventosCard';
import {ConfirmarModal} from '../../../componentes/modal/Modal';
import {CommaList} from '../../../componentes/basic/CommaList';
import PromocionesTable from '../../../componentes/tables/PromocionesTable';

export default class VerEvento extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadFinished: false,
            data: null,
            open: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.props.nav.buttons[0].click = this.toggleModal;
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
            endpoint: '/eventos/single/27/'+this.props.match.params.id,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.eventos[0] });
                }
            )
            .catch(
                error => {
                    console.log(error)
                }
            );
    }

    toggleModal(e) {
        e.preventDefault();
        this.setState({
            open: !this.state.open
        })
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
                promociones = Object.values(data.promociones.data),
                horarios = Object.values(data.horarios.list),
                feriados = Object.values(data.feriados.list);
            return (
                <>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Eliminar Evento"
                        content="¿estás seguro de eliminar este evento?" />
                    <Titulo
                        title={data.nombre}
                        links={this.props.nav.links}
                        buttons ={this.props.nav.buttons}/>
                    <div className="row">
                        <div className="col-md-3 light-danger bold">Descripción: </div>
                        <div className="col-md-9">{data.descripcion}</div>
                    </div>
                    <div className="row v-padding">
                        <div className="col-md-6">
                            <h6 className="highlight no-margin bold v-padding">Horarios</h6>
                            {
                                horarios.length>0
                                ?
                                    <ul className="nav-list no-padding">
                                        <CommaList list={assignHorarios(data.horarios.list)[0]} endpoint='/horarios'/>
                                    </ul>
                                :
                                    "No hay horarios asociados"
                            }
                        </div>
                        <div className="col-md-6">
                            <h6 className="highlight bold">Feriados</h6>
                            {
                                feriados.length>0
                                ?
                                    <ul className="nav-list no-padding">
                                        <CommaList list={data.feriados.list} endpoint='/feriados'/>
                                    </ul>
                                :
                                    <div className="bold">No hay feriados asociados</div>
                            }
                        </div>
                    </div>
                    <div className="row v-padding">
                        <div className="sub-title bold">Promociones</div>
                        {
                            promociones.length>0
                            ?
                                <PromocionesTable data={promociones}/>
                            :
                                <div className="bold h-padding">No hay promociones asociadas</div>
                        }
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
