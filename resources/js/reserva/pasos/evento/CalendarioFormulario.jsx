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

export default function CalendarioFormulario(props) {
    const ubicacion = props.ubicaciones.data[props.fields.id_ubicacion] || null,
        personas = ubicacion ? generateListByLocationCapacity(ubicacion.maximo+1) : {},
        promociones = props.fields.id_evento ? eventos.data[eventoSelect.selected].promociones.data : null,
        eventos = props.currentData.eventos,
        select = {
            id_ubicacion:{
                name:"id_ubicacion",
                show: false,
                selected: null,
                search: "",
                input: React.createRef(),
                list: props.ubicaciones.list
            },
            id_evento: {
                name: "id_evento",
                show: false,
                selected: null,
                search: "",
                input: React.createRef(),
                list: eventos.list
            },
            hora_reserva: {
                name: "hora_reserva",
                show: false,
                selected: null,
                search: "",
                input: React.createRef(),
                list: props.horario.hList||{}
            },
            minuto_reserva: {
                name: "minuto_reserva",
                show: false,
                selected: null,
                search: "",
                input: React.createRef(),
                list: props.horario.hourArray[props.fields.hora_reserva]||{}
            },
            cantidad_personas: {
                name: "cantidad_personas",
                show: false,
                selected: null,
                search: "",
                input: React.createRef(),
                list:personas
            }
        }
    return (
        <>
            <div className="row box-padding">
                <h3 className={props.displayTitles ? "bold highlight-title align-center" : "hidden"}>datos de contacto</h3>
            </div>
            <div className="row v-padding">
                <div className="col-sm-4 container">
                    <div className="row">
                        <div className="col-md-6">
                            <Text
                                rows={1}
                                titulo="Nombre"
                                name="nombre"
                                holder="Nombre del solicitante hasta 100 caracteres"
                                value={props.fields.nombre}
                                changeHandler={props.change}
                                errors={props.errors.nombre}/>
                        </div>
                        <div className="col-md-6">
                            <Text
                                rows={1}
                                titulo="Apellido"
                                name="apellido"
                                holder="Apellido del solicitante hasta 100 caracteres"
                                value={props.fields.apellido}
                                changeHandler={props.change}
                                errors={props.errors.apellido} />
                        </div>
                    </div>

                </div>
                <div className="col-sm-4">
                    <Text
                        rows={1}
                        titulo="correo electrónico"
                        name="email"
                        holder="Email del solicitante hasta 100 caracteres"
                        value={props.fields.email}
                        changeHandler={props.change}
                        errors={props.errors.email}/>
                </div>
                <div className="col-sm-4">
                    <Text
                        rows={1}
                        titulo="teléfono"
                        name="telefono"
                        holder="Teléfono del solicitante hasta 20 caracteres"
                        value={props.fields.telefono}
                        changeHandler={props.change}
                        errors={props.errors.telefono}/>
                </div>
                <div className="col-sm-6">
                    <Text
                        rows={3}
                        titulo="Observaciones"
                        name="descripcion"
                        holder="Observaciones de la reserva (alguna petición extra o algo que quieras dejar claro)"
                        value={props.fields.descripcion}
                        changeHandler={props.change}
                        errors={props.errors.telefono}/>
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
                            changeSelect={props.change}
                            select = {select.id_ubicacion}
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
                                        changeSelect={props.change}
                                        select = {select.hora_reserva}
                                        titulo="hora" />
                                </div>
                                <div className="col-sm-1 text-center v-align-center h-padding">
                                    <h6 className="c-title" style={{ color: "#bfbfbf" }}>:</h6>
                                </div>
                                <div className="col-md-6 text-left relative visible h-padding">
                                    <div
                                        className={select.hora_reserva.selected ? "hidden" : "top-padding full-width overlay"} />
                                    <Select
                                        changeSelect={props.change}
                                        select = {select.minuto_reserva}
                                        titulo="minutos"
                                        readOnly={select.hora_reserva.selected ? true : false} />
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
                                        changeSelect={props.change}
                                        select = {select.id_evento}
                                        titulo="selecciona tipo de evento de tu reserva"/>
                                    {
                                        select.id_evento.selected
                                            ?
                                            <div className="smaller-text">
                                                <div>{"Descripcion: " + eventos.data[select.id_evento.selected].descripcion}</div>
                                            </div>
                                            :
                                            <></>
                                    }
                                </div>
                            </div>
                            <div className="row v-padding text-left">
                                <div className="v-padding col-md-12 flex-row relative visible" >
                                    <div
                                        className={select.id_ubicacion.selected ? "hidden" : "top-padding full-width overlay"}/>
                                    <div className="full-width">
                                        <h6 className="highlight bold no-margin">Personas</h6>
                                        <Select
                                            changeSelect={props.change}
                                            select = {select.cantidad_personas}
                                            titulo="selecciona la cantidad de personas"
                                            readOnly={select.id_ubicacion.selected ? true : false} />
                                        <div className="smaller-text">
                                            {
                                                select.id_ubicacion.selected
                                                ?
                                                    "Máximo " + ubicacion.maximo + " personas para " + ubicacion.nombre
                                                :
                                                    "Debes seleccionar una ubicación"
                                            }
                                        </div>
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
                                                        <input type="radio" name="id_promocion" value={props.fields.id_promocion} />
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
