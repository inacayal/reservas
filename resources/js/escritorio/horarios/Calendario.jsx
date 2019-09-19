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
        today = new Date(),
        [day, changeDay] = useState(props.date),
        tileDisabled = ({ activeStartDate, date, view }) => {
            const disableByDate = view === 'month'
                ? props.data.feriados.data[date.getDate()]
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
                tileClassName='relative'
                showNeighboringMonth={false}
                value={day}
                minDate={today}
                onClickDay={ (date) => changeDay(new Date(date))}
                onClickMonth={monthChange}
                tileDisabled={tileDisabled}
                onActiveDateChange={navChange} />
        </>
    );
}

export const Calendario = React.memo(CalendarioMemo)