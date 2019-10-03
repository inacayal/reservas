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
import { DAYS, MONTHS } from '../../constantes/DaysMonths';

function CalendarioMemo(props) {
    const
        today = props.editar ? props.date : new Date(),
        [day, changeDay] = useState(props.date),
        tileDisabled = ({ activeStartDate, date, view }) => {
            let disableByDate = false;
            if (props.editar)
                disableByDate = today.getDate() < date.getDate() || today.getDate() > date.getDate();
            else 
                disableByDate = view === 'month'
                    ? props.data.feriados[date.getDate()]
                    : date.getMonth() < activeStartDate.getMonth() || date.getFullYear() < activeStartDate.getFullYear();
            
            return disableByDate;
        },
        monthChange = (date) => {
            props.fetch(date);
        },
        navChange = ({ activeStartDate, view }) => {
            props.fetch(activeStartDate);
        },
        noOp = () => false;

    useEffect(() => noOp, []);

    return (
        <>
            <input type="date" value={day} readOnly className="hidden" />
            <Calendar
                showNavigation={!props.editar}
                tileClassName='relative'
                showNeighboringMonth={false}
                value={props.editar ? today : day}
                minDate={today}
                onClickDay={props.editar ? () => false : (date) => changeDay(new Date(date))}
                onClickMonth={monthChange}
                tileDisabled={tileDisabled}
                onActiveDateChange={navChange} />
        </>
    );
}

export const Calendario = React.memo(CalendarioMemo)