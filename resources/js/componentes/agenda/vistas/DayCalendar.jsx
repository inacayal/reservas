import React, { Component, useState, useContext } from 'react';
import ReactDOM from 'react-dom';import generateDay from '../procedimientos/generateDay';
import generateWeek from '../procedimientos/generateWeek';import ButtonList from '../../basic/ButtonList';
import calendarNavigation from '../calendarNavigation';
import {CardList} from '../../basic/CardList';
import {Toggle} from '../../input/Toggle';import {DAYS,MONTHS} from '../../../constantes/DaysMonths';
import {getMonthLength} from '../../../utils/Helper';
import { evaluateDateChange } from '../../../utils/Helper';
import {WaitsLoading} from '../../../hocs/RouterTransition';

const WeekDisplay = React.memo(
    (props) =>{
        const
            context = useContext(WaitsLoading),
            [nDate, changeDate] = useState(new Date(props.date)),
            week = generateWeek(
                nDate,
                props.data,
                props.actions,
                props.type
            ),
            changeIndex = (e) => {
                e.preventDefault();
                const offset = parseInt(e.currentTarget.getAttribute('data')),
                    change = offset < 0
                        ? {
                            o: new Date(nDate),
                            n: new Date(nDate.setDate(nDate.getDate() + offset + (6 - nDate.getDay()))),
                            m: getMonthLength(nDate.getMonth() + 1, nDate.getFullYear())
                        }
                        : {
                            o: new Date(nDate),
                            n: new Date(nDate.setDate(nDate.getDate() + offset - nDate.getDay())),
                            m: 1
                        };

                evaluateDateChange (
                    change,
                    context,
                    (obj) => {changeDate(obj.date);},
                    '/reservas',
                    "3",
                    'reservas'
                );
            },
            classes = "no-padding full-width flex-row nav-list";
        return (
            <>
                <ul className={nDate.getDate() < 7 ? classes + " h-end" : classes}>
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
);

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
                props.actions
            ),
            [side,changeToggleSide] = useState(true),
            sideTitles = calendarNavigation(
                {
                    left: -7,
                    right: 7
                },
                'semana'
            );
            return (
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
                            fetch ={props.fetch}/>
                    </div>
                    {
                        foundLength>0
                        ?
                            <>
                                <div className="row v-padding justify-content-end bold">
                                    <div className="col-md-6">
                                        {foundLength + " reservaciones encontradas"}
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <Toggle
                                            leftTitle="Ver listado"
                                            rightTitle="Ver tabla"
                                            name="estado"
                                            side={side}
                                            changeSide={changeToggleSide} />
                                    </div>
                                </div>
                                <div className="row v-padding">
                                    {
                                        side
                                            ?
                                            <CardList
                                                displayList="nav-list full-width no-h-padding v-padding"
                                                elems={dayReservationHours} />
                                            :
                                            "tabla"
                                    }
                                </div>
                            </>
                        :
                            <div className="row h-center bold box-padding">
                                No se ha encontrado reservaciones
                            </div>
                    }
            </div>
        );
    }
    return (
        <div className={"full-width"}>
            <div className="bold">{"Mostrando "+DAYS[props.date.getDay()]+" "+props.date.getDate()+" de "+ MONTHS[props.date.getMonth()]}</div>
            <div>Aun no has asignado los horarios de trabajo de tu local</div>
        </div>
    )
}


export default React.memo(DayCalendar);
