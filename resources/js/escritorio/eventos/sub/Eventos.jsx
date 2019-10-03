/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
import {CardList} from '../../../componentes/basic/CardList';
import { closeModal, ConfirmarModal } from '../../../componentes/modal/Modal';
/**
 * funciones
 */
import generateEventosCard from './generateEventosCard';
import LoadBar from '../../../componentes/control/LoadBar';
/**
 * api
 */
import { GET } from '../../../utils/api';

export default class EventosRouting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:null,
            isLoading:false,
            loadFinished:false
        };

        this.eliminarEvento = this.eliminarEvento.bind(this);
        this.closeModal = closeModal.bind(this);

        this.actions = {
            agregar: this.agregarEvento,
            editar: this.editarEvento,
            eliminar: this.eliminarEvento
        };
        this.nav = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar nuevo
                    </div>
                ),
                to: '/eventos/agregar'
            }
        ];
        
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
            endpoint: 'eventos/list/27',
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.eventos.data });
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

    eliminarEvento(e) {
        e.preventDefault();
        this.setState({
            open: true
        })
    }

    componentWillUnmount() {
        console.log('eventosUnmount');
    }

    render() {
        if (this.state.data && this.state.loadFinished) {
            const eventos = generateEventosCard(
                this.state.data,
                this.actions
            );
            return (
                <>
                    <Titulo
                        title="Eventos"
                        links={this.nav} />
                    <div className="container">
                        <ConfirmarModal
                            open={this.state.open}
                            closeModal={this.closeModal}
                            title="Eliminar Evento"
                            content="¿estás seguro de eliminar este evento?" />
                        <div className="row limit-height-half">
                            <ul className="full-width nav-list no-padding">
                                {
                                    eventos.map(
                                        (elem, index) =>
                                            <li key={index} className={elem.class}><elem.content /></li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </>
            );
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
