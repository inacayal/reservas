/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseTable from './BaseTable';

export default function PromocionesTable(props){
    const columns = [
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title text-left',
                fixed: "left",
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi'))
            },
            {
                Header: "Descripción",
                accessor: "descripcion",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            },
            {
                Header: "Descuento",
                accessor: "descuento",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            }
        ];
    if (props.showEventos)
        columns.push({
            Header: "Eventos",
            accessor: "eventos",
            className: "visible",
            headerClassName: 'bold highlight-title text-left',
            Filter: ({ filter, onChange }) =><></>
        });
    if (props.showActions)
        columns.push({
            Header: "Acciones",
            accessor: "acciones",
            className: "visible text-right",
            headerClassName: 'bold highlight-title text-right',
            Filter: ({ filter, onChange }) =><></>
        });
    return (
        <BaseTable data={props.data} columns={columns} filterable={props.filter}/>
    );
}
