import React, {
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import  Titulo from '../../../componentes/basic/Titulo';
import { MultipleSelect } from '../../../componentes/input/MultipleSelect';
import { Numeric } from '../../../componentes/input/Numeric';
import { Text } from '../../../componentes/input/Text';
import {Toggle} from '../../../componentes/input/Toggle'

export function Formulario (props) {
    const [estado,toggle] = useState((props.data.selected||{}).estado === 'Activo');
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
            <div className="container col-md-11">
                <div className="row justify-content-end h-padding bold">
                    <Toggle rightTitle="Activo"
                            leftTitle="Inactivo"
                            name="estado"
                            side={estado}
                            changeSide={toggle}/>
                </div>
                <div className="row relative visible top-padding">
                    <div className={
                        estado
                        ? "hidden"
                        : "top-padding full-width overlay"
                    }/>
                    <div className="col-md-6">
                        <Text   rows={1}
                                titulo="Nombre"
                                holder="Nombre de la ubicación hasta 45 caracteres"
                                name="nombre"
                                value={props.fields.nombre}
                                changeHandler={props.change}
                                errors={props.errors.nombre}/>
                        <div className="top-padding">
                        <Text   rows={3}
                                titulo="Descripción"
                                holder="Breve descripción de la promoción hasta 45 caracteres"
                                name="descripcion"
                                value={props.fields.descripcion}
                                changeHandler={props.change}
                                errors={props.errors.descripcion}/>
                        </div>
                        <div className="top-padding">
                            <Numeric    titulo="Descuento"
                                        name="descuento"
                                        holder="Descuento de la promoción hasta 100%"
                                        value={props.fields.descuento}
                                        changeHandler={props.change}
                                        errors={props.errors.descuento}/>
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
                    </div>
                </div>
            </div>
        </>
    );
}
