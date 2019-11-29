
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

export default function FranquiciasTable(props){
    const columns = [
            {
                Header: "Administrador",
                accessor: "administrador",
                headerClassName: 'bold highlight-title text-left',
                fixed: "left"
            },
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'mid-font bold highlight-title text-left',
                fixed: "left"
            },
            {
                Header: "Teléfono",
                accessor: "admTelefono",
                headerClassName: 'mid-font bold highlight-title text-left'
            },
            {
                Header: "Correo",
                accessor: "admEmail",
                headerClassName: 'mid-font bold highlight-title text-left'
            },
            {
                Header: "Razón Social",
                accessor: "razonSocial",
                headerClassName: 'mid-font bold highlight-title text-left'
            },
            {
                Header: "Acciones",
                accessor: "acciones",
                className: "text-right visible",
                minWidth: 120,
                headerClassName: 'mid-font bold highlight-title text-left',
                fixed: "right"
            }
        ],
        ReactTableFixedColumns = withFixedColumns(ReactTable);
    return (
        <>
            <ReactTableFixedColumns
                data={props.data}
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
                rowsText='filas'
                showPagination = {props.withPagination}/>
        </>
    );
}
