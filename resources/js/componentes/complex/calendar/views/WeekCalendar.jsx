import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//components
import ButtonList from '../../allUse/ButtonList';
import CardList from '../../allUse/CardList';
import Button from '../../../basic/Button';

//functions
import generateWeek from '../../../../funciones/generateWeek';
import calendarNavigation from '../../../../funciones/calendarNavigation';
//constants
import { MONTHS } from '../../../../constantes/DaysMonths';

function WeekCalendar(props) {
    //show current week as it goes, highlighting today
    //pass today in props
    let sideTitles = calendarNavigation(
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
            new Date(),
            props.type
        );
    return (
        <div className={props.show ? "container" : "hidden"}>
            <div className="row bold">
                {"Mostrando " + MONTHS[props.date.getMonth()] + " " + props.date.getFullYear()}
            </div>
            <div className="row h-center">
                <CardList
                    displayList="justify no-padding full-width flex-column nav-list h-center"
                    elems={week} />
            </div>
            <div className="row">
                <ButtonList
                    clickHandler={props.changeCurrentWeek}
                    elemClass="box-transparent"
                    displayList="flex-row margin-box no-padding nav-list full-width"
                    elems={sideTitles} />
            </div>
        </div>
    );
}
export default React.memo(WeekCalendar);