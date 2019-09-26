/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
/**
 * funciones
 */
import generateDay from '../procedimientos/generateDay';
import generateWeek from '../procedimientos/generateWeek';
/**
 * componentes
 */
import ButtonList from '../../basic/ButtonList';
import calendarNavigation from '../calendarNavigation';
import {CardList} from '../../basic/CardList';
import {Toggle} from '../../input/Toggle';
/**
 * constantes
 */
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';
import {getMonthLength} from '../../../utils/Helper';
import { evaluateDateChange } from '../../../utils/Helper';

const WeekDisplay = (
    props
) => {
    const 
        [nDate,changeDate] = useState(new Date(props.date)),
        week = generateWeek(
            nDate,
            props.data,
            props.actions,
            props.type
        ),
        changeIndex = (e) => {
            e.preventDefault(); 
            evaluateDateChange(
                new Date(nDate), 
                parseInt(e.currentTarget.getAttribute('data')), 
                props.fetch,
                changeDate
            );
        },
        classes = "no-padding full-width flex-row nav-list";   

    return (
        <>
            <ul className={nDate.getDate()<7 ? classes + " h-end" : classes}>
                {
                    week.map(
                        (elem, index) =>
                            <li
                                key={index}
                                className={elem.data == props.date.getDate() ? elem.class + " selected" : elem.class}
                                data={elem.data}
                                onClick={props.verDia}>
                                <elem.content />
                            </li>
                    )
                }
            </ul>
            <ButtonList
                clickHandler={changeIndex}
                elemClass="box-transparent"
                displayList="flex-row margin-box no-padding nav-list full-width"
                elems={props.sideTitles} />
        </>
    );
}

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
            ),
            [side,changeToggleSide] = useState(false),
            sideTitles = calendarNavigation(
                {
                    left: -7,
                    right: 7
                },
                'semana'
            );
        return (
            <div className="full-width">
                <div className="container">
                    <div className="row v-padding bold">
                        {"Mostrando " + DAYS[props.date.getDay()] + " " + props.date.getDate() + " de " + MONTHS[props.date.getMonth()]}
                    </div>
                    <div className="row">
                        <WeekDisplay 
                            date={props.date}
                            data={props.data}
                            actions={props.actions}
                            type={props.type}
                            sideTitles={sideTitles}
                            verDia ={props.verDia}
                            date={props.date}
                            fetch ={props.fetch}/>
                    </div>
                    <div className="row v-padding justify-content-end bold">
                        <Toggle
                            leftTitle="Ver listado"
                            rightTitle="Ver tabla"
                            name="estado"
                            side={side}
                            changeSide = {changeToggleSide}/>
                    </div>
                </div>
                <div className="limit-height-half v-padding">
                    {
                        side 
                        ? 
                            <CardList 
                                displayList="nav-list box-padding"
                                elems={dayReservationHours}/>
                        : 
                            "tabla"
                    }
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