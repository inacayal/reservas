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
 * funciones
 */
import generateEventosCard from './generateEventosCard';
import {GET} from '../../../utils/api';

export const listHandler = (endpoint) => {
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
                    this.setState({ data: response.data.eventos.data });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}

export class Eventos extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        const eventos = generateEventosCard(
                this.props.data,
                {
                    eliminar: this.props.toggleModal
                }
            );
        return (
            <>
                <Titulo
                    title="Eventos"
                    links={this.props.nav.links} />
                <div className="container">
                    <div className="bold top-padding row">
                        {"Mostrando " + eventos.length + " eventos encontrados"}
                    </div>
                    <div className="row">
                        <ul className="nav-list no-padding">
                            {
                                eventos.map(
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
}
