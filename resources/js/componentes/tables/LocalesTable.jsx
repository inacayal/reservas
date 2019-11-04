
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

export default function LocalesTable(props){
    const columns = [
            {
                Header: "Franquicia",
                accessor: "franquicia",
                headerClassName: 'bold highlight-title text-left',
                fixed: "left"
            },
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title text-left',
                fixed: "left"
            },
            {
                Header: "Teléfono",
                accessor: "telefonoLocal",
                headerClassName: 'bold highlight-title text-left'
            },
            {
                Header: "Correo",
                accessor: "correoLocal",
                headerClassName: 'bold highlight-title text-left'
            },
            {
                Header: "Administrador",
                accessor: "admNombre",
                headerClassName: 'bold highlight-title text-left'
            },
            {
                Header: "Acciones",
                accessor: "acciones",
                className: "text-right visible",
                minWidth:120,
                headerClassName: 'bold highlight-title text-left',
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
                rowsText='filas'/>
        </>
    );
}
