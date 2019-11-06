/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * react calendar date picker
 */
import Calendar from 'react-calendar';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';
/**
 * input component and handlers
 */
import {Numeric} from '../../../componentes/input/Numeric';
import {Text} from '../../../componentes/input/Text';
/**
 * API
 */
import LoadBar from '../../../utils/LoadBar';
import { GET } from '../../../utils/api';
import {ConfirmarModal} from '../../../componentes/modal/Modal';

export default class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: null,
            loadFinished: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);

        if (this.props.editar)
            this.props.nav.buttons[0].click = this.toggleModal;

        this.props.formActions.buttons.guardar.click = this.enviarFormulario;
        this.props.formActions.buttons.cancelar.click = this.cancelarFormulario;
    }

    enviarFormulario(e){
        e.preventDefault();
        console.log('guardar');
    }

    cancelarFormulario(e){
        e.preventDefault();
        console.log('guardar');
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
        if (this.props.editar) {
            this.setState({
                data: null,
                isLoading: true,
                loadFinished: false
            });
            const request = GET({
                endpoint: 'ubicaciones/single/27/'+this.props.match.params.id,
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
        }else
            this.setState({
                data: true,
                isLoading: false,
                loadFinished: true
            })
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (this.state.data && this.state.loadFinished){
            return (
                <>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Eliminar Ubicación"
                        content="¿estás seguro de eliminar este ubicación?" />
                    <form className="full-width">
                        <div className="container">
                            <Titulo
                                title={this.props.editar
                                    ? this.state.data.nombre
                                    : "Agregar ubicación"}
                                links={this.props.nav.links}
                                buttons={this.props.nav.buttons} />
                            <div className="row">
                                <div className="col-md-4 bold no-padding">
                                    foto de la ubicacion
                                </div>
                                <div className="col-md-8">
                                    <div className="container">
                                        <div className="row">
                                            <Text rows={1} titulo="Nombre de la ubicación" name="nombre" value={this.props.editar ? this.state.data.nombre : ""} classes={"border-box input-text margin-box"} container="full-width" />
                                        </div>
                                        <div className="row v-padding">
                                            <Text rows={4} titulo="Descripcion" name="descripcion" value={this.props.editar ? this.state.data.descripcion : ""} classes={"border-box input-text margin-box"} container="full-width" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row v-padding">
                                <div className="col-md-6 no-padding">
                                    <Numeric titulo="Capacidad máxima" name="capacidad_maxima" value={this.props.editar ? this.state.data.capacidad : ""} classes={"border-box input-text margin-box"} container="full-width" />
                                    <span className="smaller-text">Máximo de personas en la ubicación</span>
                                </div>
                                <div className="col-md-6">
                                    <Numeric titulo="Máximo personas" name="maximo_personas" value={this.props.editar ? this.state.data.maximo : ""} classes={"border-box input-text margin-box"} container="full-width" />
                                    <span className="smaller-text">Máximo de personas en una reservación</span>
                                </div>
                            </div>
                            <div className="row justify-content-end">
                                <Actions
                                    buttons={Object.values(this.props.formActions.buttons)}/>
                            </div>
                        </div>
                    </form>
                </>
            );
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
