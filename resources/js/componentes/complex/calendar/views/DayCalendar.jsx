import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import generateDay from '../../../../funciones/generateDay';

//estos son los dias de atencion de la semana.

function DayCalendar(props) {
    if (props.horarios){
        let dayReservationHours = generateDay(
            props.horarios.horarios,
            props.horarios.intervalo,
            props.horarios.caida,
            props.data
        );

        return (
            <div className={props.show ? "row full-width" : "hidden"}>
            </div>
        )
    }
    return (
        <div>
        </div>
    )
}
export default React.memo(DayCalendar);