/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import { CardList } from '../../../componentes/basic/CardList';
import Titulo from '../../../componentes/basic/Titulo';
/**
 * funciones
 */
import generateConfigurationCards from './generateConfigurationCards';
/**
 * API
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';
/**
 * navegacion
 */
import { Navegacion } from '../Navegacion';
export default class Configuracion extends Component {
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
            const configuracion = generateConfigurationCards(
                    this.state.data
                ),
                nav = Navegacion.listado();
            return (
                <div className="full-width">
                    <Titulo
                        title="Configuración"
                        links={nav.links} />
                    <ul className="full-width nav-list no-padding">
                        {
                            configuracion.map(
                                (elem, index) =>
                                    <li key={index} className={elem.class}><elem.content /></li>
                            )
                        }
                    </ul>
                </div>
            );
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
