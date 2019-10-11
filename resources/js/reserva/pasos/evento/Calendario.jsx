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

function CalendarioMemo(props) {
    const
        dayChange = (date) => {
            props.clickCallback(date)(date);
            props.changeHover(date);
        },
        tileDisabled = ({ activeStartDate, date, view }) => {
            const normal = props.data.horarios.data[date.getDay() + 1],
                feriado = props.data.feriados.data[date.getDate()],
                feriadoNoLaboral = feriado!==undefined ? feriado.estado === 'no_laboral' : false;
            const disableByDate = view === 'month'
                ? normal.estado === 'no_laboral' || feriadoNoLaboral 
                : date.getMonth() < activeStartDate.getMonth() || date.getFullYear() < activeStartDate.getFullYear();
            return disableByDate;
        },
        monthChange = (date) => {
            props.fetch(date);
        },
        navChange = ({ activeStartDate, view }) => {
            props.fetch(activeStartDate);
        },
        tileContent = ({ date, view }) => {
            const index = date.getDate(),
                feriado = props.data.feriados.data[index],
                horario = props.data.horarios.data[date.getDay()+1];
            return feriado !== undefined
                ?
                <>
                    <div
                        className="full-cover box-padding"
                        onMouseOver={
                            (feriado.estado === 'no_laboral' || date.getDate() < props.minDate.getDate())
                                ? (e) => false 
                                : (e) => props.changeHover(date)
                            }
                        onMouseLeave={
                            (feriado.estado === 'no_laboral' || date.getDate() < props.minDate.getDate()) 
                                ? (e) => false 
                                : (e) => props.changeHover(props.showDate)}
                        onClick={props.clickCallback}>
                    </div>
                    <p className="no-margin bold smaller-text">
                        <i className="line-v-middle fas fa-ellipsis-h highlight-title" />
                    </p>
                </>
                :
                <>
                    <div
                        className="full-cover box-padding"
                        onMouseOver={
                            (horario.estado === 'no_laboral' || date.getDate() < props.minDate.getDate()) 
                                ? (e) => false 
                                : (e) => props.changeHover(date)
                            }
                        onMouseLeave={
                            (horario.estado === 'no_laboral' || date.getDate() < props.minDate.getDate()) 
                                ? (e) => false 
                                : (e) => props.changeHover(props.showDate)
                                }>
                    </div>
                    <p></p>
                </>
        },
        noOp = () => false;
    useEffect(() =>  noOp,[props.showDate]);
    return (
        <>
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
                onActiveDateChange={navChange} />
        </>
    );
}

export const Calendario =  React.memo(CalendarioMemo)