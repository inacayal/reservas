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
import Titulo from '../../../componentes/basic/Titulo';
import {Link} from 'react-router-dom';
import { assignHorarios } from '../../eventos/sub/generateEventosCard';
import {generateLinks} from '../../eventos/sub/VerEvento';
import { ConfirmarModal } from '../../../componentes/modal/Modal';
import EventosTable from '../../../componentes/tables/EventosTable'

const generateList = (list,endpoint) => {
    const eventos = Object.values(list).map(
        (e,i) => {
            const horarios = assignHorarios(e.horarios.list)[0];
            return {
                ...e,
                nombre:(
                    <Link to={"/eventos/"+e.id}>
                        {e.nombre}
                    </Link>
                ),
                horarios:generateLinks(horarios,'/horarios')
            };
        }
    );
    return eventos;
};

export default class VerLocal extends Component {
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

    toggleModal(e) {
        e.preventDefault();
        this.setState({
            open: !this.state.open
        });
    }
    fetchData() {
        this.setState({
            data: null,
            isLoading: true,
            loadFinished: false
        });
        const request = GET({
            endpoint: '/promociones/single/27/'+this.props.match.params.id,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.promociones[0] });
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
            const eventos = generateList(this.state.data.eventos.data,'/eventos'),
                data = {...this.state.data,eventos};
            return (
                <>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Eliminar Promocion"
                        content="¿estás seguro de eliminar esta promo?" />
                    <div className="container">
                        < Titulo
                            title={data.nombre}
                            links={this.props.nav.links}
                            buttons ={this.props.nav.buttons}/>
                        <div className="container full-width no-padding">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="light-danger bold">Descripción: </div>
                                    <div>{data.descripcion}</div>
                                </div>
                                <div className="col-md-6">
                                    <h6 className="highlight no-margin bold top-padding">Descuento:</h6>
                                    <div>{data.descuento ? <>{data.descuento}<span className="bold side-margin">%</span></> : "Sin descuento"}</div>
                                </div>
                            </div>
                            <div className="row sub-title top-padding bold">
                                Eventos
                            </div>
                            <div className="row">
                                <EventosTable data={data.eventos}/>
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
