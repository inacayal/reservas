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
import generatePromocionesCard from './generatePromocionesCard';
/**
 * api
 */
import { GET } from '../../../utils/api';

export const listHandler = (endpoint) => {
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
                this.setState({ data: response.data.promociones.data });
            }
        )
        .catch(
            error => {
                console.log(error.message)
            }
        );
    }
}

export class Promociones extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        console.log('eventosUnmount');
    }

    render() {
        const promociones = generatePromocionesCard(
            this.props.data,
            {eliminar: this.toggleModal}
        );
        return (
            <>
                <Titulo
                    title="Promociones"
                    links={this.props.nav.links} />
                <div className="container">
                    <div className="row">
                        <div className="bold top-padding">
                            {"Mostrando " + promociones.length + " promociones encontradas"}
                        </div>
                        <ul className="nav-list no-padding">
                            {
                                promociones.map(
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
