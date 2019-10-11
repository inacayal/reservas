/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import LoadBar from '../../../componentes/control/LoadBar';
import Titulo from '../../../componentes/basic/Titulo';
/**
 * API
 */
import { GET } from '../../../utils/api';
import { FormularioUsuario } from '../FormularioUsuario';
/**
 * navegacion
 */
import { Navegacion } from '../Navegacion';
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
            endpoint: 'usuario/local/27',
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
            const nav = Navegacion.usuario();
            return (
                <div className="container full-width ">
                    < Titulo
                        title="Configurar Usuario"
                        links={nav.links} />
                    <div className="container">
                        <FormularioUsuario data={this.state.data} />
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