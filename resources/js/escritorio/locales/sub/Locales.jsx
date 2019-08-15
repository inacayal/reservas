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
import ButtonList from '../../../componentes/basic/ButtonList';
import { closeModal, ConfirmarModal } from '../../../componentes/modal/Modal';
/**
 * sub elementos
 */
import VerLocal from './VerLocal';

export default class LocalesRouting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            verLocal: false
        }
        this.showSingleLocal = this.showSingleLocal.bind(this);
        this.columns = [
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title',
                fixed: "left"
            },
            {
                Header: "Provincia",
                accessor: "provincia",
                headerClassName: 'bold highlight-title',
                fixed: "left"
            },
            {
                Header: "Dirección",
                accessor: "direccion",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Razón Social",
                accessor: "razonSocial",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Teléfono",
                accessor: "telefono",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "CUIT / CUIL",
                accessor: "cuitCuil",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Administrador",
                accessor: "administrador",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Correo del administrador",
                accessor: "correoAdmin",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Teléfono del administrador",
                accessor: "telAdmin",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Estado",
                accessor: "estado",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Acciones",
                accessor: "acciones",
                className: "text-right",
                headerClassName: 'bold highlight-title',
                fixed: "right"
            }
        ];
    }

    showSingleLocal(e) {
        e.preventDefault();
        const local = e.currentTarget.getAttribute('data');
        this.setState({ formulario: false, verLocal: local })
    }

    componentDidMount() {
        console.log('localesMount');
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    generateActionsForElement(elem) {
        return [
            {
                title: (
                    <div className="smaller-text text bold text-center">
                        <i className="fas fa-eye" />
                        Ver
                    </div>
                ),
                data: elem,
                class: "box-transparent highlight-hover border-box button-border inline-block smaller-text",
                click: this.showSingleLocal
            }
        ]
    }

    render() {
        const 
            columns = this.columns,
            data = Object.keys(this.props.data).map(
                e => ({
                    ...this.props.data[e],
                    acciones: <ButtonList
                        displayList="flex-row nav-list no-padding inline-block  align-center"
                        container="side-margin inline-block"
                        elems={this.generateActionsForElement(e)} />
                })
            ),
            ReactTableFixedColumns = withFixedColumns(ReactTable);
        return (
            <div className="full-width container">
                <Titulo
                    title="Locales"
                    navigation={[]} />
                <div className={this.state.verLocal ? "hidden" : "row full-width"}>
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
                        rowsText='filas' />
                </div>
                <div className={this.state.verLocal ? "row" : "hidden"}>
                    <VerLocal
                        elem={this.state.verLocal ? this.props.data[this.state.verLocal] : null} />
                </div>
            </div>
        )
    }
}
