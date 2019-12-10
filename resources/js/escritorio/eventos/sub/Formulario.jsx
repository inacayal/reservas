import React, {
    Component,
    useState
} from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';
import { assignHorarios } from '../../../generators/generateEventosCard';
import { Text } from '../../../componentes/input/Text';
import { MultipleSelect } from '../../../componentes/input/MultipleSelect';
import {Toggle} from '../../../componentes/input/Toggle';
import {createFeriadosList} from '../../../utils/Helper';

export function Formulario (props) {
    const   data = props.data.all,
            estado = props.fields.scope == 1,
            feriadoList = createFeriadosList(data.feriados.data);
    if (props.editar)
        props.nav.buttons[0].click = props.toggleModal;

    return (
        <>
            <Titulo     title={
                            props.editar
                                ? props.fields.nombre
                                : "Agregar Evento"
                        }
                        links={props.nav.links}
                        buttons={props.nav.buttons} />
            <div className="container col-md-11">
                <div className="row bold justify-content-end h-padding">
                    <Toggle rightTitle="Activo"
                            leftTitle="Inactivo"
                            name="scope"
                            side={estado}
                            value={props.fields.scope}
                            changeSide={props.change}/>
                </div>
                <div className="row relative visible top-padding">
                    <div className={
                        estado
                            ? "hidden"
                            : "top-padding full-width overlay"
                        }/>
                    <div className="col-md-6">
                        <div className="v-padding">
                            <h6 className="highlight m-font">
                                Horarios
                            </h6>
                            <MultipleSelect fieldName="Días de semana"
                                            name="horarios"
                                            titulo="Selecciona los horarios"
                                            optionData={data.horarios.list}
                                            errors={props.errors.horarios}
                                            changeSelect={props.change}
                                            selected ={props.fields.horarios}/>
                        </div>
                        <div className="v-padding">
                            <h6 className="highlight m-font">
                                Feriados
                            </h6>
                            <MultipleSelect fieldName="Feriados"
                                            name="feriados"
                                            titulo="Selecciona los feriados"
                                            optionData={feriadoList}
                                            errors={props.errors.feriados}
                                            changeSelect={props.change}
                                            selected ={props.fields.feriados}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="container">
                            <div className="row">
                                <Text   rows={1}
                                        titulo="Nombre"
                                        holder="Nombre del evento hasta 45 caracteres"
                                        name="nombre"
                                        value={props.fields.nombre}
                                        changeHandler={props.change}
                                        errors={props.errors.nombre}/>
                            </div>
                            <div className="row v-padding">
                                <Text   rows={4}
                                        titulo="Descripción"
                                        holder="Descripción del evento hasta 100 caracteres"
                                        name="descripcion"
                                        value={props.fields.descripcion}
                                        changeHandler={props.change}
                                        errors={props.errors.descripcion}/>
                            </div>
                            <div className="v-padding">
                                <h6 className="highlight m-font">
                                    Promociones
                                </h6>
                                <MultipleSelect fieldName="Promociones"
                                                name="promociones"
                                                titulo="Selecciona las promociones"
                                                optionData={data.promociones.list}
                                                errors={props.errors.promociones}
                                                changeSelect={props.change}
                                                selected ={props.fields.promociones}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
