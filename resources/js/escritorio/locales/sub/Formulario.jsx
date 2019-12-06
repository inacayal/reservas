import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import { FormularioEstablecimiento } from '../../configuracion/FormularioEstablecimiento';
import { FormularioUsuario } from '../../configuracion/FormularioUsuario';
import { FormularioFranquicia } from '../FormularioFranquicia';
import Actions from '../../../componentes/basic/Actions';
import Titulo from '../../../componentes/basic/Titulo';
import { Navegacion } from '../../../acciones/ActionsByView';

export function Formulario (props) {
    const data = props.data;
    if (props.editar)
        props.nav.buttons[0].click = props.toggleModal;
    return (
        <>
            <Titulo title={
                    props.editar
                        ? data.nombre
                        : "Agregar Local"
                    }
                    links={props.nav.links}
                    buttons ={props.nav.buttons} />
            <div className="container">
                <FormularioFranquicia   data={data}
                                        agregarLocal={!props.editar}
                                        fields={props.fields}
                                        errors={props.errors}
                                        change={props.change}/>
                <div className="row mid-title top-padding">
                    Información del local
                </div>
                <div className="v-padding">
                    <FormularioEstablecimiento  data={data}
                                                fields={props.fields}
                                                errors={props.errors}
                                                change={props.change}
                                                isFranquicia/>
                </div>
                <div className="v-padding">
                    <FormularioUsuario  data={data}
                                        fields={props.fields}
                                        errors={props.errors}
                                        change={props.change}/>
                </div>
            </div>
        </>
    );
}

/*
if (props.editar)
props.nav.buttons[0].click = props.toggleModal;
const data = props.data;
return (
<>
<Titulo title={
props.editar
? data.nombre
: "Agregar franquicia"
}
links={props.nav.links}
buttons={props.nav.buttons} />
<div className="container">
<FormularioEstablecimiento  data={data}
isFranquicia
fields={props.fields}
errors={props.errors}
change={props.change}/>
<FormularioUsuario  data={data}
fields={props.fields}
errors={props.errors}
change={props.change}/>
</div>
</>
)
*/
