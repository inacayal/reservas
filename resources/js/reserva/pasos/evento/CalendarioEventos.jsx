/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Promociones from './Promociones';
/**
 * react calendar
 */
import Calendar from 'react-calendar';
/**
 * CONSTANTS
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';

export default function CalendarioEventos(props){
    const [auxDate, changeAux] = useState(props.showDate),
        feriado = props.feriados[auxDate.getDate()],
        dateObj = {
            dia: DAYS[auxDate.getDay()],
            fecha: auxDate.getDate(),
            mes: MONTHS[auxDate.getMonth()],
            year: auxDate.getFullYear()
        },
        dateString = dateObj.dia + " " + dateObj.fecha + " de " + dateObj.mes + " " + dateObj.year,
        weekDay = props.horarios[props.showDate.getDay() + 1],
        atencionString = weekDay.apertura.atencion.hora + ":" + (weekDay.apertura.atencion.minuto < 10 ? "0" + weekDay.apertura.atencion.minuto : weekDay.apertura.atencion.minuto) + " - " + weekDay.cierre.atencion.hora + ":" + (weekDay.cierre.atencion.minuto < 10 ? "0" + weekDay.cierre.atencion.minuto : weekDay.apertura.atencion.minuto),
        reservaString = weekDay.apertura.reserva.hora + ":" + (weekDay.apertura.reserva.minuto < 10 ? "0" + weekDay.apertura.reserva.minuto : weekDay.apertura.reserva.minuto) + " - " + weekDay.cierre.reserva.hora + ":" + (weekDay.cierre.reserva.minuto < 10 ? "0" + weekDay.cierre.reserva.minuto : weekDay.cierre.reserva.minuto),
        dayChange = (date) => {
            props.resetSelect();
            props.clickCallback(date)(date);
            changeAux(date);
        }, 
        tileDisabled = ({ activeStartDate, date, view }) => {
            const disableByDate = view === 'month'
                ? date.getMonth() < activeStartDate.getMonth() || date.getMonth() > activeStartDate.getMonth()
                : date.getMonth() < activeStartDate.getMonth();
            return disableByDate;
        },
        monthChange = (date) => {
            props.resetSelect();
            props.fetch(date);
        },
        navChange = ({ activeStartDate, view }) => {
            props.resetSelect();
            props.fetch(activeStartDate);
        },
        tileContent = ({ date, view }) => {
            const index = date.getDate();
            return props.feriados[index] !== undefined
                ?
                <>
                    <div
                        className="overlay full-cover box-padding"
                        onMouseOver={(e) => { changeAux(date) }}
                        onMouseLeave={(e) => { changeAux(props.showDate) }}
                        onClick={props.clickCallback}>
                    </div>
                    <p className="no-margin bold smaller-text">
                        <i className="line-v-middle fas fa-ellipsis-h highlight-title full-cover " />
                    </p>
                </>
                : 
                <>
                    <div
                        className="overlay full-cover box-padding"
                        onMouseOver={(e) => { changeAux(date) }}
                        onMouseLeave={(e) => { changeAux(props.showDate) }}>
                    </div>
                    <p></p>
                </>
        };
    return (
        <div className="row justify-content-center top-padding">
            <div className="col-md-8 no-padding">
                <input type="date" value={props.showDate} readOnly className="hidden" />
                <Calendar
                    tileClassName='relative'
                    showNeighboringMonth={false}
                    value={props.showDate}
                    minDate={props.minDate}
                    onClickDay={dayChange}
                    onClickMonth={monthChange}
                    tileDisabled={tileDisabled}
                    tileContent={tileContent}
                    onActiveDateChange={navChange}/>
            </div>
            <div className="col-md-4 text-left">
                <div className="text-left border-box box-padding">
                    {
                        feriado
                            ?
                            <div >
                                <div>
                                    <h6 className="highlight bold no-margin">
                                        {"Feriado del " + dateString}
                                    </h6>
                                    <div style={{ border: "solid 2px var(--highlight-blue)", margin: "10px 0px", borderRadius: "3px" }} className="thirty"></div>
                                    <p className="bold no-margin">
                                        {feriado.nombre}
                                    </p>
                                </div>
                                <p className="no-margin">
                                    {feriado.nombre}
                                </p>
                                <div style={{ border: "solid 2px var(--border)", margin: "10px 0px", borderRadius: "3px" }} className="thirty"></div>
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
                                <div style={{ border: "solid 2px var(--highlight-blue)", margin: "10px 0px", borderRadius: "3px" }} className="thirty"></div>
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
                        data={ feriado ? feriado.eventos.data :  weekDay.eventos.data}/> 
                </div>
            </div>
        </div>
    );
}