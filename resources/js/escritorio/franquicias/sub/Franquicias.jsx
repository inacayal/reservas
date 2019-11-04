/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * react table
 */
import ReactTable from 'react-table';
import "react-table/react-table.css";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';
import { closeModal, ConfirmarModal } from '../../../componentes/modal/Modal';
/**
 * sub elementos
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';
import FranquiciasTable from '../../../componentes/tables/FranquiciasTable'


export default class Franquicias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadFinished: false,
            data: null,
            open: false
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
            endpoint: '/usuario/franquicias/4',
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

    componentDidMount() {
        this.fetchData();
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
        if (this.state.data && this.state.loadFinished) {
            const
                columns = this.columns,
                data = Object.keys(this.state.data).map(
                    e => ({
                        ...this.state.data[e],
                        acciones: <Actions links={this.links(e)} buttons={[]} />
                    })
                );
            return (
                <>
                    <Titulo
                        title="Franquicias"
                        links={this.props.nav.links} />
                    <div className="container no-padding">
                        <div className="row">
                            <FranquiciasTable data={data}/>
                        </div>
                    </div>
                </>
            )
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
