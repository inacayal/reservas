/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import ButtonList from '../../basic/ButtonList';
import {CardList} from '../../basic/CardList';
import Button from '../../basic/Button';
/**
 * funciones
 */
import generateWeek from '../procedimientos/generateWeek';
import calendarNavigation from '../navegacion/calendarNavigation';
/**
 * constantes
 */
import { MONTHS } from '../../../constantes/DaysMonths';

function WeekCalendar(props) {
    //show current week as it goes, highlighting today
    //pass today in props
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