import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import generateDay from '../../../../funciones/generateDay';
import CardList from '../../allUse/CardList';
import Button from '../../../basic/Button';
import {DAYS,MONTHS} from '../../../../constantes/DaysMonths';
//estos son los dias de atencion de la semana.

function DayCalendar(props) {
    if (props.horarios){
        let [dayReservationHours,foundLength] = generateDay(
            props.horarios.horarios,
            props.horarios.intervalo,
            props.horarios.caida,
            props.date,
            props.data,
            props.type,
            props.actions.inner
        );

        return (
            <div className={props.show ? "full-width" : "hidden"}>
                <div className="v-padding container">
                    <div className="row bold">
                        <span className="align-center side-margin inline-block">
                            {"Mostrando " + DAYS[props.date.getDay()] + " " + props.date.getDate() + " de " + MONTHS[props.date.getMonth()]}
                        </span>
                    </div>
                </div>
                <div className="limit-height-half">
                    <CardList 
                        displayList="nav-list box-padding"
                        elems={dayReservationHours}/>
                </div>
            </div>
        )
    }
    return (
        <div className={props.show ? "full-width" : "hidden"}>
            <div className="bold">{"Mostrando "+DAYS[props.date.getDay()]+" "+props.date.getDate()+" de "+ MONTHS[props.date.getMonth()]}</div>
            <div>Aun no has asignado los horarios de trabajo de tu local</div>
        </div>
    )
}
export default React.memo(DayCalendar);