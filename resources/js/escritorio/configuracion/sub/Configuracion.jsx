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

export const configuracionHandler = (endpoint) => {
    return function (params) {
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
                    this.setState({ data: response.data.data });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}

export class Configuracion extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        console.log('configuracionUnmount');
    }

    render() {
        const configuracion = generateConfigurationCards(
            this.props.data
        );
        return (
            <>
                <Titulo
                    title="Configuración"/>
                <ul className="full-width nav-list no-padding">
                    {
                        configuracion.map(
                            (elem, index) =>
                                <li key={index} className={elem.class}><elem.content /></li>
                        )
                    }
                </ul>
            </>
        );
    }
}
