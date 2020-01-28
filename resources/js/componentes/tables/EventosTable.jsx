
/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseTable from './BaseTable';

export default function EventosTable(props){
    const columns = [
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title text-left',
                fixed: "left",
                minWidth:120,
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi'))
            },
            {
                Header: "Descripción",
                accessor: "descripcion",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            }
        ];
    if (props.showHorarios)
        columns.push({
            Header: "Horarios",
            accessor: "horarios",
            className: "visible",
            minWidth:120,
            headerClassName: 'bold highlight-title text-left',
            Filter: ({ filter, onChange }) =><></>
        });
    if (props.showPromociones)
        columns.push({
            Header: "Promociones",
            accessor: "promociones",
            className: "visible",
            minWidth:120,
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
