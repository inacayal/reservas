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
import ButtonList from '../../../componentes/basic/ButtonList';
import LoadBar from '../../../utils/LoadBar';
/**
 * input component and handlers
 */
import {Numeric} from '../../../componentes/input/Numeric';
import {Text} from '../../../componentes/input/Text';
/**
 * api
 */
import { GET } from '../../../utils/api';

export default class AgregarFormulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: null,
            loadFinished: false
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
        if (this.state.data && this.state.loadFinished)
            return (
                <form className="full-width">
                    <div className="container">
                        <div className="row c-title highlight-title bottom-padding">
                            {this.props.editar ? "Editando ubicación "+this.state.data.nombre : "Agregar ubicación"}
                        </div>
                        <div className="row box-padding">
                            <div className="col-md-4 bold">
                                foto de la ubicacion
                            </div>
                            <div className="col-md-8">
                                <div className="container">
                                    <div className="row">
                                        <Text rows={1} titulo="Nombre de la ubicación" name="nombre" value={this.props.editar ? this.state.data.nombre : ""} classes={"border-box input-text margin-box"} container="full-width" />
                                    </div>
                                    <div className="row v-padding">
                                        <Numeric titulo="Capacidad máxima" name="capacidad_maxima" value={this.props.editar ? this.state.data.capacidad : ""} classes={"border-box input-text margin-box"} container="full-width" />
                                        <span className="smaller-text">Máximo de personas en la ubicación</span>
                                    </div>
                                    <div className="row v-padding">
                                        <Numeric titulo="Máximo personas" name="maximo_personas" value={this.props.editar ? this.state.data.maximo : ""} classes={"border-box input-text margin-box"} container="full-width" />
                                        <span className="smaller-text">Máximo de personas en una reservación</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <Text rows={4} titulo="Descripcion" name="descripcion" value={this.props.editar ? this.state.data.descripcion : ""} classes={"border-box input-text margin-box"} container="full-width" />
                            </div>
                        </div>
                    </div>
                </form>
            );
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}