/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';

/**
 * API
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';

export default class Escritorio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: null,
            loading: null,
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

    componentWillUnmount() {
        console.log('configuracionUnmount');
    }

    render() {
        if (this.state.data && this.state.loadFinished) {
            return (
                <>
                    <Titulo
                        title={"Bienvenido, "+this.state.data.username} />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 bold">
                                foto de local
                            </div>
                            <div className="col-md-8 container">
                                <div className="row">
                                    <div className="col-md-6">
                                        {this.state.data.nombre}
                                    </div>
                                </div>
                            </div>
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
