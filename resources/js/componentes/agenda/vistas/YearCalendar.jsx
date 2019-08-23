/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * react datepicker
 */
import Calendar from 'react-calendar';
/**
 * componentes
 */
import ButtonList from '../../basic/ButtonList';
import calendarNavigation from '../navegacion/calendarNavigation';
import generateYear from '../procedimientos/generateYear';
/**
 * constantes
 */
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';

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
        <div className="row full-width">
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