/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import ButtonList from '../../basic/ButtonList';
import calendarNavigation from '../calendarNavigation';
import generateYear from '../procedimientos/generateYear';
import {
    DAYS,
    MONTHS
} from '../../../constantes/DaysMonths';

function YearCalendar(props){
    const navigation = calendarNavigation(
            {
                left: -1,
                right: 1
            },
            'año'
        ),
        months = generateYear(
            props.date,
            props.handleMonthClick
        );
    return (
        <div className="row full-width h-padding">
            <div className="box-padding row m-font v-padding">
                {`Mostrando ${props.date.getFullYear()}`}
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
