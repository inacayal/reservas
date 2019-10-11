/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
/**
 * CONSTANTS
 */
import { DAYS, MONTHS, HOURS } from '../../constantes/DaysMonths';
/**
 * input
 */
import { Text } from '../../componentes/input/Text';
import { MultipleSelect } from '../../componentes/input/MultipleSelect';

const SelectData = {
    eventos: {
        name: "eventos",
        show: false,
        selected: [],
        search: "",
        input: React.createRef(),
        list: {}
    }
}

export const EventoFields = (props) => {
    const eventos = SelectData.eventos;
    if (props.editar){
        eventos.selected = Object.keys(props.data.eventos.list)||[];
        eventos.list =  props.eventos.list;
    } else {
        eventos.selected = [];
        eventos.list = {};
    }
    return (
        <>
            <div className={props.class.col+" relative visible"}>
                <div className={props.side ? "hidden" : "top-padding full-width overlay"} />
                <div className="bold light-danger full-width">Eventos</div>
                <MultipleSelect
                    select={eventos}
                    titulo="selecciona los eventos"
                    optionData={props.eventos.list} />
            </div>
            {
                props.class.type==='feriado'
                ?
                    <div className={props.class.col} >
                        <Text rows={3} titulo="Nombre" name="nombre" value={(props.data || {}).nombre || ""} classes={"border-box input-text margin-box"} />
                    </div>
                :
                    ""
            }
            
            <div className={props.class.col}>
                <Text rows={4} titulo="Descripción" name="descripcion" value={(props.data||{}).descripcion || ""} classes={"border-box input-text margin-box"} />
            </div>
        </>
    );
}
