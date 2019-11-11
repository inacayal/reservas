
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
 * sub elementos
 */
import { GET } from '../../../utils/api';
/**
 * nav
 */
 import Actions from '../../../componentes/basic/Actions';
import { Navegacion } from '../../../acciones/ActionsByView';
import LocalesTable from '../../../componentes/tables/LocalesTable';

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
                    this.setState({ data: response.data.locales.data });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}


export class Locales extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    links(key) {
        return [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-eye" />
                        Ver
                    </div>
                ),
                to: '/locales/' + key
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen" />
                        Editar
                    </div>
                ),
                to: '/locales/editar/' + key
            }
        ];
    }

    render() {
        const data = Object.values(this.props.data).map(
                e => ({
                    ...e,
                    acciones: <Actions links={this.links(e.id)} buttons={[]}/>
                })
            );
        return (
            <>
                <Titulo
                    title="Locales"
                    links={this.props.nav.links} />
                <div className="container">
                    <div className="row">
                        <LocalesTable data={data}/>
                    </div>
                </div>
            </>
        )
    }
}
