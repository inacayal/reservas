/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
/**
 * react calendar
 */
import Promociones from './Promociones';
import Calendar from 'react-calendar';
import {Calendario} from './Calendario';
/**
 * CONSTANTS
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';

export default function CalendarioEventos(props){
    const 
        [hoverDate, changeHover] = useState(props.showDate),
        fecha = hoverDate.getDate(),
        dia = hoverDate.getDay(),
        mes = hoverDate.getMonth(),
        year = hoverDate.getFullYear(),
        hoverData = props.data.feriados.data[fecha] 
            ? props.data.feriados.data[fecha] 
            : props.data.horarios.data[dia+1],
        feriado = props.data.feriados.data[fecha],
        dateString = DAYS[dia] + " " + fecha + " de " + MONTHS[mes] + " " + year,
        atencionString = props.current.apertura.atencion.hora + ":" + (props.current.apertura.atencion.minuto < 10 ? "0" + props.current.apertura.atencion.minuto : props.current.apertura.atencion.minuto) + " - " + props.current.cierre.atencion.hora + ":" + (props.current.cierre.atencion.minuto < 10 ? "0" + props.current.cierre.atencion.minuto : props.current.apertura.atencion.minuto),
        reservaString = props.current.apertura.reserva.hora + ":" + (props.current.apertura.reserva.minuto < 10 ? "0" + props.current.apertura.reserva.minuto : props.current.apertura.reserva.minuto) + " - " + props.current.cierre.reserva.hora + ":" + (props.current.cierre.reserva.minuto < 10 ? "0" + props.current.cierre.reserva.minuto : props.current.cierre.reserva.minuto);

    return (
        <div className="row justify-content-center top-padding">
            <div className="col-md-8 no-padding">
                <Calendario
                    showDate={props.showDate}
                    minDate={props.minDate}
                    data={props.data}
                    changeHover={changeHover}
                    fetch={props.fetch}
                    clickCallback={props.clickCallback}/>
            </div>
            <div className="col-md-4 text-left">
                <div>
                    {
                        feriado
                            ?
                            <div >
                                <div>
                                    <h6 className="highlight bold no-margin">
                                        {"Feriado del " + dateString}
                                    </h6>
                                    <p className="bold no-margin">
                                        {feriado.nombre}
                                    </p>
                                </div>
                                <p className="no-margin">
                                    {feriado.nombre}
                                </p>
                                <p className="no-margin">
                                    {"atencion: " + feriado.apertura.atencion.hora + ":" + (feriado.apertura.atencion.minuto < 10 ? "0" + feriado.apertura.atencion.minuto : feriado.apertura.atencion.minuto) + " - " + feriado.cierre.atencion.hora + ":" + (feriado.cierre.atencion.minuto < 10 ? "0" + feriado.cierre.atencion.minuto : feriado.cierre.atencion.minuto)}
                                </p>
                                <p>
                                    {"reservas: " + feriado.apertura.reserva.hora + ":" + (feriado.apertura.reserva.minuto < 10 ? "0" + feriado.apertura.reserva.minuto : feriado.apertura.reserva.minuto) + " - " + feriado.cierre.reserva.hora + ":" + (feriado.cierre.reserva.minuto < 10 ? "0" + feriado.cierre.reserva.minuto : feriado.cierre.reserva.minuto)}
                                </p>
                            </div>
                            :
                            <div >
                                <h6 className="highlight bold no-margin">
                                    {dateString}
                                </h6>
                                <p className="no-margin">
                                    {"atención: " + atencionString}
                                </p>
                                <p>
                                    {"reservas: " + reservaString}
                                </p>
                            </div>
                    }
                </div>
                <div className="container ">
                    <Promociones 
                        data={hoverData.eventos.data}/> 
                </div>
            </div>
        </div>
    );
}