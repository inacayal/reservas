/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';

import { GET } from '../../../utils/api';
import FranquiciasTable from '../../../componentes/tables/FranquiciasTable'

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
                    this.setState({ data: response.data.usuarios.data });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}

export class Franquicias extends Component {
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
                to: '/franquicias/' + key
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen" />
                        Editar
                    </div>
                ),
                to: '/franquicias/editar/' + key
            },
            ,
            {
                title:(
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" /> Agregar Local
                    </div>
                ),
                to:"/locales/agregar"
            }
        ];
    }

    render() {
        const
            columns = this.columns,
            data = Object.keys(this.props.data).map(
                e => ({
                    ...this.props.data[e],
                    acciones: <Actions links={this.links(e)} buttons={[]} />
                })
            );
        return (
            <>
                <Titulo
                    title="Franquicias"
                    links={this.props.nav.links} />
                <div className="container">
                    <div className="row">
                        <FranquiciasTable data={data}/>
                    </div>
                </div>
            </>
        )
    }
}
