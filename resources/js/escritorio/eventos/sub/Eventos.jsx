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
import {ConfirmarModal } from '../../../componentes/modal/Modal';
/**
 * funciones
 */
import generateEventosCard from './generateEventosCard';
/**
 * api
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';
/**
 * navegacion
 */
export default class Eventos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:null,
            open:false,
            isLoading:false,
            loadFinished:false
        };
        this.toggleModal = this.toggleModal.bind(this);
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

    toggleModal(e) {
        e.preventDefault();
        this.setState({
            open: !this.state.open
        })
    }

    componentWillUnmount() {
        console.log('eventosUnmount');
    }

    render() {
        if (this.state.data && this.state.loadFinished) {
            const eventos = generateEventosCard(
                    this.state.data,
                    {
                        agregar: this.agregarEvento,
                        editar: this.editarEvento,
                        eliminar: this.toggleModal
                    }
                );
            return (
                <>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Eliminar Evento"
                        content="¿estás seguro de eliminar este evento?" />
                    <Titulo
                        title="Eventos"
                        links={this.props.nav.links} />
                    <div className="container">
                        <div className="bold top-padding row">
                            {"Mostrando " + eventos.length + " eventos encontrados"}
                        </div>
                        <div className="row limit-height-half">
                            <ul className="nav-list no-padding">
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
