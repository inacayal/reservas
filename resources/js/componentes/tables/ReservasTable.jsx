
/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseTable from './BaseTable';

export default function UbicacionesTable(props){
    const columns = [
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title text-left',
                fixed:"left",
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi'))
            },
            {
                Header: "Apellido",
                accessor: "apellido",
                headerClassName: 'bold highlight-title text-left',
                fixed:"left",
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi'))
            },
            {
                Header: "DNI",
                accessor: "dni",
                headerClassName: 'bold highlight-title text-left',
                fixed:"left",
                filterMethod: (filter, row) => row[filter.id].match(new RegExp(`${filter.value}*`,'gi'))
            },
            {
                Header: "Email",
                accessor: "email",
                headerClassName: 'visible bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            },
            {
                Header: "Teléfono",
                accessor: "telefono",
                headerClassName: 'visible bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            },
            {
                Header: "Fecha de reserva",
                accessor: "fechaReserva",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            },
            {
                Header: "Ocasión",
                accessor: "eventos.nombre",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            },
            {
                Header: "Promoción",
                accessor: "promocion.nombre",
                headerClassName: 'bold highlight-title text-left',
                Filter: ({ filter, onChange }) =><></>
            },
            {
                Header: "Acciones",
                accessor: "acciones",
                className: "visible",
                headerClassName: 'visible bold highlight-title text-right',
                Filter: ({ filter, onChange }) =><></>
            }
        ];
    return (
        <BaseTable data={props.data} columns={columns} filterable={true}/>
    );
}
