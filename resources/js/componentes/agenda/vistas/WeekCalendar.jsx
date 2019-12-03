import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../../basic/ButtonList';
import {CardList} from '../../basic/CardList';
import Button from '../../basic/Button';
import generateWeek from '../procedimientos/generateWeek';
import calendarNavigation from '../calendarNavigation';
import { MONTHS } from '../../../constantes/DaysMonths';

function WeekCalendar(props) {
    const sideTitles = calendarNavigation(
            {
                left: -7,
                right: 7
            },
            'semana'
        ),
        week = generateWeek(
            props.date,
            props.data,
            props.actions,
            props.type
        );
    return (
        <div className="container">
            <div className="row m-font">
                {`Mostrando ${MONTHS[props.date.getMonth()]} de ${props.date.getFullYear()}`}
            </div>
            <div className="row">
                <ul className="justify no-padding full-width flex-column nav-list h-center">
                    {
                        week.map(
                            (elem,index) =>
                                <li key={index} className={elem.class}>
                                    <elem.content/>
                                </li>
                        )
                    }
                </ul>
            </div>
            <div className="row">
                <ButtonList clickHandler={props.changeCurrentWeek}
                            elemClass="box-transparent"
                            displayList="flex-row margin-box no-padding nav-list full-width"
                            elems={sideTitles} />
            </div>
        </div>
    );
}
export default React.memo(WeekCalendar);
