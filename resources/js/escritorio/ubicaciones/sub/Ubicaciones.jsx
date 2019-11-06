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
import ButtonList from '../../../componentes/basic/ButtonList';
import { ConfirmarModal, closeModal } from '../../../componentes/modal/Modal';
/**
 * funciones
 */
import generateUbicacionesCard from './generateUbicacionesCard';
/**
 * api
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';

export default class UbicacionesRouting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data:null,
            loadFinished:false
        };
        this.eliminarUbicacion = this.eliminarUbicacion.bind(this),
        this.closeModal = closeModal.bind(this);

        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);

        this.actions = {
            agregar: this.agregarUbicacion,
            editar: this.editarUbicacion,
            eliminar: this.eliminarUbicacion
        };
    }

    eliminarUbicacion(e) {
        e.preventDefault();
        this.setState({
            open: true
        })
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
            endpoint: 'ubicaciones/list/27',
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.ubicaciones.data });
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

    render() {
        if (this.state.data && this.state.loadFinished) {
            const ubicaciones = generateUbicacionesCard(
                    this.state.data,
                    this.actions
                );

            return (
                <>
                    <Titulo
                        title="Ubicaciones"
                        links={this.props.nav.links} />
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.closeModal}
                        title="Eliminar Ubicación"
                        content="¿estás seguro de eliminar este ubicación?" />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="bold top-padding">
                                {"Mostrando " + ubicaciones.length + " ubicaciones encontradas"}
                            </div>
                            <ul className="full-width nav-list no-padding limit-height-half">
                                {
                                    ubicaciones.map(
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
        return(
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
