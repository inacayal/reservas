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
        name: "cierre_atencion_minuto",
        show: false,
        selected: [],
        search: "",
        input: React.createRef(),
        list: {}
    }
}

export const EventoFields = (props) => {
    return (
        <>
            <div className="col-md-4" style={{paddingLeft:"0px"}}>
                <Text rows={1} titulo="Nombre" name="nombre" value={props.nombre || ""} classes={"border-box input-text margin-box"} />
            </div>
            <div className="col-md-4">
                <Text rows={3} titulo="Descripción" name="descripcion" value={props.descripcion || ""} classes={"border-box input-text margin-box"} />
            </div>
            <div className="col-md-4" style={{ paddingRight: "0px" }}>
                <div className="bold light-danger full-width">Eventos</div>
                
            </div>
        </>
    );
}
/**
 <MultipleSelect
     options={Object.values(props.data)} /> 
 * 
 */