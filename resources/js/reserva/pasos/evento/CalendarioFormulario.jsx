/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
/**
 * react calendar
 */
import Calendar from 'react-calendar';
/**
 * CONSTANTS
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';
/**
 * dependencies
 */
import Promociones from './Promociones';
import { Select } from "../../../componentes/input/Select.jsx";
import { Text } from "../../../componentes/input/Text.jsx";
import { generateListByLocationCapacity } from './Handlers';

const SelectData = {
    ubicacion:{
        name:"ubicacion",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {}
    },
    evento: {
        name: "evento",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {}
    },
    hora: {
        name: "hora",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {}
    },
    minuto: {
        name: "minuto",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {}
    },
    personas: {
        name: "personas",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {}
    }
}

export default function CalendarioFormulario(props) {
    const 
        [horaSelect, changeHora] = useState(SelectData.hora),
        [minutoSelect, changeMinuto] = useState(SelectData.minuto),
        [ubicacionSelect, changeUbicacion] = useState(SelectData.ubicacion),
        [eventoSelect, changeEvento] = useState(SelectData.evento),
        [personasSelect, changePersonas] = useState(SelectData.personas),
        eventos = props.currentData.eventos,
        promociones = eventoSelect.selected
            ? eventos.data[eventoSelect.selected].promociones.data
            : null,
        ubicacion = props.ubicaciones.data[ubicacionSelect.selected] || null,
        dateChange = () => {
            changeHora(SelectData.hora);
            changeMinuto(SelectData.minuto);
            changeUbicacion(SelectData.ubicacion);
            changeEvento(SelectData.evento);
            changePersonas(SelectData.personas);
        };
    
    useEffect(dateChange,[props.date]);

    horaSelect.list = (props.horario.hList) 
        ? props.horario.hList 
        : {};
    minutoSelect.list = horaSelect.selected
        ? props.horario.hourArray[horaSelect.selected]
        : {};
    personasSelect.list = (ubicacion) 
        ? generateListByLocationCapacity(ubicacion.maximo+1)
        : {};
    ubicacionSelect.list = props.ubicaciones.list;
    eventoSelect.list = eventos.list;
        
    return (
        <>
            <div className="row box-padding">
                <h3 className={props.displayTitles ? "bold highlight-title align-center" : "hidden"}>datos de contacto</h3>
            </div>
            <div className="row v-padding">
                <div className="col-sm-4">
                    <Text rows={1} titulo="nombre  y apellido" name="name" value={props.nombre} classes={"border-box input-text margin-box"} />
                </div>
                <div className="col-sm-4">
                    <Text rows={1} titulo="correo electrónico" name="email" value={props.correo} classes={"border-box input-text margin-box"} />
                </div>
                <div className="col-sm-4">
                    <Text rows={1} titulo="teléfono" name="telefono" value={props.telefono} classes={"border-box input-text margin-box"} container="full-width" />
                </div>
                <div className="col-sm-6">
                    <Text rows={3} titulo="Observaciones" name="descripcion" value={props.descripcion} classes={"border-box input-text margin-box"} container="full-width" />
                </div>
            </div>
            <div className="no-padding top-padding col-md-3">
                <i className="line-v-middle fas fa-angle-left highlight-title" />
                <div className="text-left right-padding">
                    foto relacionada <br />a la ubicacion
                </div>
            </div>
            <div className="top-padding col-md-9">
                <div className="row">
                    <div className="col-md-6 text-left">
                        <h6 className="highlight bold no-margin">Ubicación</h6>
                        <Select
                            changeSelect={changeUbicacion}
                            select = {ubicacionSelect}
                            titulo="selecciona la ubicación" />
                    </div>
                    <div className="col-md-6 text-left">
                        <div className="container">
                            <div className="row">
                                <h6 className="highlight bold no-margin">Hora de reserva</h6>
                            </div>
                            <div className="row">
                                <div className="col-sm-5 h-padding text-left" style={{paddingLeft:"0px"}}>
                                    <Select
                                        changeSelect={changeHora}
                                        select = {horaSelect}
                                        titulo="hora" />
                                </div>
                                <div className="col-sm-1 text-center v-align-center h-padding">
                                    <h6 className="c-title" style={{ color: "#bfbfbf" }}>:</h6>
                                </div>
                                <div className="col-md-6 text-left relative visible h-padding">
                                    <div
                                        className={horaSelect.selected ? "hidden" : "top-padding full-width overlay"} />
                                    <Select
                                        changeSelect={changeMinuto}
                                        select = {minutoSelect}
                                        titulo="minutos"
                                        readOnly={horaSelect.selected ? true : false} />
                                </div>
                            </div>
                            <div className="row">
                                <p className="smaller-text no-margin">{props.date+""}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row v-padding">
                    <div className="col-md-6 no-padding">
                        <div className="container">
                            <div className="row text-left">
                                <div className="col-md-12">
                                    <h6 className="highlight bold no-margin">Ocasión</h6>
                                    <Select
                                        changeSelect={changeEvento}
                                        select = {eventoSelect}
                                        titulo="selecciona tipo de evento de tu reserva"/>
                                    {
                                        eventoSelect.selected
                                            ?
                                            <div className="smaller-text">
                                                <div>{"Descripcion: " + eventos.data[eventoSelect.selected].descripcion}</div>
                                            </div>
                                            :
                                            <></>
                                    }
                                </div>
                            </div>
                            <div className="row v-padding text-left">
                                <div className="v-padding col-md-12 flex-row relative visible" >
                                    <div
                                        className={ubicacionSelect.selected ? "hidden" : "top-padding full-width overlay"}/>
                                    <div className="full-width">
                                        <h6 className="highlight bold no-margin">Personas</h6>
                                        <Select
                                            changeSelect={changePersonas}
                                            select = {personasSelect}
                                            titulo="selecciona la cantidad de personas"
                                            readOnly={ubicacionSelect.selected ? true : false} />
                                        <div className="smaller-text">{ubicacionSelect.selected ? "Máximo " + ubicacion.maximo + " personas para " + ubicacion.nombre : "Debes seleccionar una ubicación"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 text-left">
                        {
                            promociones
                                ?
                                <ul className="no-padding nav-list full-width">
                                    {
                                        Object.values(promociones).map(
                                            (p, i) =>
                                                <li key={i} className="full-width border-button">
                                                    <div className="inline-block v-align-center">
                                                        <input type="radio" name="promocion" value={p.id} />
                                                    </div>
                                                    <div className="inline-block">
                                                        <div className="bold">{p.nombre}</div>
                                                        <div className="smaller-text">{p.descripcion}</div>
                                                        <div className="text-right smaller-text bold">{p.descuento !== 0 ? p.descuento+"% descuento":"sin descuento"}</div>
                                                    </div>
                                                </li>
                                        )
                                    }
                                </ul>
                                :
                                <></>
                        }
                    </div>
                </div>
            </div>
            
        </>
    )
}