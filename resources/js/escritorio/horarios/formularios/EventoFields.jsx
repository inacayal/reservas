import React, {
    Component,
    useState,
    useEffect
} from 'react';
import {
    DAYS,
    MONTHS,
    HOURS
} from '../../../constantes/DaysMonths';
import ReactDOM from 'react-dom';
import { Text } from '../../../componentes/input/Text';
import { MultipleSelect } from '../../../componentes/input/MultipleSelect';

export const EventoFields = (props) => {
    return (
        <>
            <div className={`${props.class.col} relative visible v-padding`}>
                <div className={
                    props.side
                        ? "hidden"
                        : "top-padding full-width overlay"
                } />
                <div className="mid-font light-danger full-width">
                    Eventos
                </div>
                <MultipleSelect fieldName={"Eventos"}
                                titulo="Selecciona los eventos"
                                optionData={props.eventos.list}
                                errors={props.errors.id_evento}
                                changeSelect={props.change}
                                selected={props.fields.id_evento}/>
            </div>
            {
                props.class.type==='feriado'
                ?
                    <div className={`${props.class.col} v-padding`}>
                        <Text   rows={3}
                                titulo="Nombre"
                                name="nombre"
                                holder="Nombre del feriado hasta 50 caracteres"
                                errors={props.errors.nombre}
                                value={props.fields.nombre}
                                changeHandler={props.change}/>
                    </div>
                :
                    ""
            }

            <div className={`${props.class.col} v-padding`}>
                <Text   rows={4}
                        titulo="Descripción"
                        holder="Descripción del día hasta 100 caracteres"
                        name="descripcion"
                        errors={props.errors.descripcion}
                        value={props.fields.descripcion}
                        changeHandler={props.change}/>
            </div>
        </>
    );
}
