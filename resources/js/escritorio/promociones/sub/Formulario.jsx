import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import  Titulo from '../../../componentes/basic/Titulo';
import { MultipleSelect } from '../../../componentes/input/MultipleSelect';
import { Numeric } from '../../../componentes/input/Numeric';
import { Text } from '../../../componentes/input/Text';

export function Formulario (props) {
    if (props.editar)
        props.nav.buttons[0].click = props.toggleModal;
    return (
        <>
            <Titulo title={
                        props.editar
                            ? props.fields.nombre
                            : "Agregar Promoción"
                    }
                    links={props.nav.links}
                    buttons={props.nav.buttons}/>
            <div className="container no-padding">
                <div className="row v-padding">
                    <div className="col-md-6">
                        <div className="container">
                            <div className="row v-padding">
                                <Text   rows={1}
                                        titulo="Nombre"
                                        holder="Nombre de la ubicación hasta 45 caracteres"
                                        name="nombre"
                                        value={props.fields.nombre}
                                        changeHandler={props.change}
                                        errors={props.errors.nombre}/>
                            </div>
                            <div className="row v-padding">
                                <Numeric    titulo="Descuento"
                                            name="descuento"
                                            holder="Descuento de la promoción hasta 100%"
                                            value={props.fields.descuento}
                                            changeHandler={props.change}
                                            errors={props.errors.descuento}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 top-padding">
                        <div>
                            <h6 className="highlight no-margin mid-font">
                                Eventos
                            </h6>
                            <MultipleSelect fieldName={"Eventos"}
                                            name="eventos"
                                            titulo="Selecciona los eventos"
                                            optionData={props.data.all.eventos.list}
                                            errors={props.errors.id_evento}
                                            changeSelect={props.change}
                                            selected={props.fields.eventos}/>
                        </div>
                        <div className="v-padding">
                            <Text   rows={3}
                                    titulo="Descripción"
                                    holder="Breve descripción de la promoción hasta 45 caracteres"
                                    name="descripcion"
                                    value={props.fields.descripcion}
                                    changeHandler={props.change}
                                    errors={props.errors.descripcion}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
