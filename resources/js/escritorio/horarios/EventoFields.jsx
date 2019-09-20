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
        eventos.selected = Object.keys(props.data.data.eventos.list)||[];
        eventos.list =  props.data.eventos.list;
    } else
        eventos.list = props.data.list;
    console.log(eventos);
    return (
        <>
            <div className="col-md-4 relative visible" style={{ paddingLeft: "0px" }}>
                <div className={props.side ? "hidden" : "top-padding full-width overlay"} />
                <div className="bold light-danger full-width">Eventos</div>
                <MultipleSelect
                    select={eventos}
                    titulo="selecciona los eventos"
                    optionData={props.editar ? props.data.eventos.data : props.data.data} />
            </div>
            <div className="col-md-4" >
                <Text rows={3} titulo="Nombre" name="nombre" value={props.data.data.nombre || ""} classes={"border-box input-text margin-box"} />
            </div>
            <div className="col-md-4" style={{ paddingRight: "0px" }}>
                <Text rows={3} titulo="Descripción" name="descripcion" value={props.data.data.descripcion || ""} classes={"border-box input-text margin-box"} />
            </div>
        </>
    );
}
