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

export const singleHandler  = (endpoint) => {
    return function () {
        this.setState({
            data: null,
            isLoading: true,
            loadFinished: false
        });
        const request = GET({
            endpoint: endpoint,
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
}

export class VerUbicacion extends Component {
    constructor(props){
        super(props);
        this.props.nav.buttons[0].click = this.props.toggleModal;
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    render() {
        const data = this.props.data;
        return (
            <div className="container no-padding">
                < Titulo
                    title={data.nombre}
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
        )
    }
}
