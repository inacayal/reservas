/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import Actions from '../../../componentes/basic/Actions';
import LoadBar from '../../../componentes/control/LoadBar';
/**
 * api
 */
import { GET } from '../../../utils/api';
import { Text } from '../../../componentes/input/Text';
import { ConfigurarUbicacion } from './ConfigurarUbicacion';

export default class Establecimiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: null,
            data: null,
            loadFinished: false
        };
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
            endpoint: 'usuario/single/u/27',
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.data });
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
            const data = this.state.data;
            return (
                <div className="container full-width ">
                    <div className="row c-title highlight-title">
                        Configurar Usuario
                    </div>
                    <div className="row v-padding">
                        <div className="col-md-4">
                            <Text
                                rows={1}
                                titulo="Nombre de usuario"
                                name="username"
                                value={data.username}
                                classes={"border-box input-text margin-box"}
                                container="full-width" />
                        </div>
                        <div className="col-md-4">
                            <Text
                                rows={1}
                                titulo="Email"
                                name="email"
                                value={data.email}
                                classes={"border-box input-text margin-box"}
                                container="full-width" />
                        </div>
                        <div className="col-md-4">
                            <Text
                                rows={1}
                                titulo="Contraseña"
                                name="password"
                                value=""
                                classes={"border-box input-text margin-box"}
                                container="full-width" />
                            <span className="smaller-text">Ingresa un nuevo valor para cambiarla</span>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}