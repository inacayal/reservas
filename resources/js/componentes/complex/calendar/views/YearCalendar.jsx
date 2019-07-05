import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../../allUse/ButtonList';
import Calendar from 'react-calendar';
import {DAYS,MONTHS} from '../../../../constantes/DaysMonths';
import calendarNavigation from '../../../../funciones/calendarNavigation';
import generateYear from '../../../../funciones/generateYear';

function YearCalendar(props){
    let navigation = calendarNavigation({ left: -1, right: 1 }, 'año');
    let months = generateYear(props.date,props.handleMonthClick);
    return (
        <div className={props.show ? "row full-width" : "hidden"}>
            <div className="box-padding row bold">
                {"Mostrando " + props.date.getFullYear()}
            </div>
            <div className="box-padding full-width">
                {months}
            </div>
            <div className="full-width">
                <ButtonList
                    clickHandler={props.changeCurrentYear}
                    elemClass="box-transparent"
                    displayList="flex-row margin-box nav-list full-width no-padding"
                    elems={navigation} />
            </div>
        </div>
    );
}
export default YearCalendar;