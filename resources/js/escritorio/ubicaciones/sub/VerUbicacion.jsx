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
/**
 * basic
 */
import Titulo from '../../../componentes/basic/Titulo';
import {ConfirmarModal} from '../../../componentes/modal/Modal';

export default class VerUbicacion extends Component {
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
            endpoint: '/ubicaciones/single/27/'+this.props.match.params.id,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.ubicaciones[0] });
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
            const data = this.state.data;
            return (
                <>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Eliminar Ubicación"
                        content="¿estás seguro de eliminar este ubicación?" />
                    <div className="container no-padding">
                        < Titulo
                            title={this.state.data.nombre}
                            links={this.props.nav.links}
                            buttons ={this.props.nav.buttons}/>
                        <div className="row full-width">
                            <div className="col-md-4 bold">
                                imagen de ubicacion
                            </div>
                            <div className="col-md-8 container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="bold highlight">
                                            Descripcion:
                                        </div>
                                        <div>{data.descripcion}</div>
                                    </div>
                                </div>
                                <div className="row v-padding">
                                    <div className="col-md-6">
                                        <div className="bold highlight">
                                            Máximo por mesa
                                        </div>
                                        <div>{data.maximo+" personas"}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="bold highlight">
                                            Capacidad máxima
                                        </div>
                                        <div>{data.capacidad+" personas"}</div>
                                    </div>
                                </div>
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
