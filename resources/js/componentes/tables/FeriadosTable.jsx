
/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseTable from './BaseTable';

export default function FeriadosTable(props){
    const columns = [
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title text-left',
                fixed:"left",
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi'))
            },
            {
                Header: "Fecha",
                accessor: "fecha",
                headerClassName: 'bold highlight-title text-left',
                fixed:"left",
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi'))
            },
            {
                Header: "Tipo",
                accessor: "estado",
                headerClassName: 'visible bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            },
            {
                Header: "Estado",
                accessor: "scope",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            }
        ];
    return (
        <BaseTable data={props.data} columns={columns} filterable={true}/>
    );
}
