/**
 * react basic
 */
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import Titulo from '../../../componentes/basic/Titulo';
import { FormularioUsuario } from '../../../form/FormularioUsuario';

export default function Usuario (props) {
    return (
        <>
            <Titulo title="Configurar Usuario"
                links={props.nav.links} />
            <div className="container">
                <FormularioUsuario  data={props.data}
                    fields={props.fields}
                    errors={props.errors}
                    change={props.change}/>
            </div>
        </>
    );
}
