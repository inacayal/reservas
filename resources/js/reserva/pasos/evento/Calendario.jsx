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
            const disableByDate = view === 'month'
                ? props.data.horarios.data[date.getDay() + 1].estado === 'no_laboral' || props.data.feriados.data[date.getDate()].estado === 'no_laboral'
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
            const index = date.getDate();
            return props.data.feriados.data[index] !== undefined
                ?
                <>
                    <div
                        className="full-cover box-padding"
                        onMouseOver={(props.data.feriados.data[date.getDate()].estado === 'no_laboral' || date.getDate() < props.minDate.getDate()) ? (e) => false : (e) => props.changeHover(date)}
                        onMouseLeave={(props.data.feriados.data[date.getDate()].estado === 'no_laboral' || date.getDate() < props.minDate.getDate()) ? (e) => false : (e) => props.changeHover(props.showDate)}
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
                        onMouseOver={(props.data.horarios.data[date.getDay() + 1].estado === 'no_laboral' || date.getDate() < props.minDate.getDate()) ? (e) => false : (e) => props.changeHover(date)}
                        onMouseLeave={(props.data.horarios.data[date.getDay() + 1].estado === 'no_laboral' || date.getDate() < props.minDate.getDate()) ? (e) => false : (e) => props.changeHover(props.showDate)}>
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