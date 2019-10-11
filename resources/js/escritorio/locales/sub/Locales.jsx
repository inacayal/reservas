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
import VerLocal from './VerLocal';
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';
/**
 * nav
 */
import { Navegacion } from '../Navegacion';

export default class Locales extends Component {
    constructor(props) {
        super(props);
        this.state={
            loadFinished:false,
            data:null,
            open: false
        }
        this.columns = [
            {
                Header: "Franquicia",
                accessor: "franquicia",
                headerClassName: 'bold highlight-title',
                fixed: "left"
            },
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title',
                fixed: "left"
            },
            {
                Header: "Teléfono",
                accessor: "telefonoLocal",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Correo",
                accessor: "correoLocal",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Administrador",
                accessor: "admNombre",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Acciones",
                accessor: "acciones",
                className: "text-right visible",
                minWidth:120,
                headerClassName: 'bold highlight-title',
                fixed: "right"
            }
        ];
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
            endpoint: '/usuario/locales/5',
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
        if (this.state.data && this.state.loadFinished){
            const 
                columns = this.columns,
                data = Object.keys(this.state.data).map(
                    e => ({
                        ...this.state.data[e],
                        acciones: <Actions links={this.links(e)} buttons={[]}/>
                    })
                ),
                ReactTableFixedColumns = withFixedColumns(ReactTable),
                nav = Navegacion.listado(data);
            return (
                <>
                    < Titulo
                        title="Locales"
                        links={nav.links} />
                    <div className="container">
                        <div className="row full-width no-margin">
                            <ReactTableFixedColumns
                                data={data}
                                columns={columns}
                                minRows={0}
                                previousText={
                                    <div>
                                        <i className="line-v-middle highlight middle-font fas fa-angle-left" />
                                        <span className="text ">Anterior</span>
                                    </div>
                                }
                                nextText={
                                    <div>
                                        <span className="text ">Siguiente</span>
                                        <i className="line-v-middle highlight middle-font fas fa-angle-right" />
                                    </div>
                                }
                                pageText='Página'
                                ofText='de'
                                rowsText='filas'/>
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
