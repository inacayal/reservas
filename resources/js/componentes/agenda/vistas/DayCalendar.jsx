/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * funciones
 */
import generateDay from '../procedimientos/generateDay';
/**
 * componentes
 */
import Button from '../../basic/Button';
import {CardList} from '../../basic/CardList';
/**
 * constantes
 */
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';

function DayCalendar(props) {
    if (props.horarios){
        const [
            dayReservationHours,
            foundLength
        ] = generateDay(
            props.horarios.data,
            props.horarios.intervalo,
            props.horarios.caida,
            props.date,
            props.data,
            props.type,
            props.actions.inner
        );
        return (
            <div className="full-width">
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
                        elems={dayReservationHours}
                    />
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