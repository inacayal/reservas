import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {FormularioReservas} from '../../../form/FormularioReservas';
import Titulo from '../../../componentes/basic/Titulo';

export function Reservas (props) {
    return (
        <>
            <Titulo title="Configurar Reservas"
                    links={props.nav.links} />
            <div className="container">
                <FormularioReservas data ={props.data}
                                    fields={props.fields}
                                    errors={props.errors}
                                    change={props.change}/>
            </div>
        </>
    );
}
