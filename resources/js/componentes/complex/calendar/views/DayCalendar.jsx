import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//components
import ButtonList from '../../allUse/ButtonList';
import CardList from '../../allUse/CardList';

//functions
import {generateDayWeek} from '../../../../funciones/weekGenerator';
import calendarNavigation from '../../../../funciones/calendarNavigation';
//constants
import { MONTHS } from '../../../../constantes/DaysMonths';

function DayCalendar(props) {
    //show current week as it goes, highlighting today
    //pass today in props
    var sideTitles = calendarNavigation({ left: -7, right: 7 }, 'semana');
    let week = generateDayWeek(props.date, props.data, props.actions);
    return (
        <div className={props.show ? "container" : "hidden"}>
            <div className="row">
                {"Mostrando " + MONTHS[props.date.getMonth()] + " " + props.date.getFullYear()}
            </div>
            <div className="row h-center">
                <CardList
                    displayList="justify no-padding full-width flex-row nav-list h-center"
                    elems={week} />
            </div>
            <div className="row">
                <ButtonList
                    clickHandler={props.changeCurrentWeek}
                    elemClass="box-transparent"
                    displayList="flex-row nav-list full-width"
                    elems={sideTitles} />
            </div>
        </div>
    );
}
export default React.memo(DayCalendar);