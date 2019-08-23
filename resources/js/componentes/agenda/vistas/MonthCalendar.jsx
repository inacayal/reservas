/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * funciones
 */
import generateMonth from '../procedimientos/generateMonth';
import calendarNavigation from '../navegacion/calendarNavigation';
import getMonthLength from '../../../funciones/getMonthLength';
/**
 * constantes
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';
/**
 * componentes
 */
import ButtonList from '../../basic/ButtonList';
import CardList from '../../basic/CardList';
import Button from '../../basic/Button';


function MonthCalendar(props) {
    let month = props.date.getMonth();
    let navigation = calendarNavigation(
        {
            left: -1,
            right: 1
        },
        'mes'
    );
    let weeks = generateMonth(
        props.date,
        props.data,
        props.actions,
        props.type
    );
    return (
        <div className="container">
            <div className="row bold">
                <span className="align-center side-margin inline-block">{"Mostrando " + MONTHS[month] + " " + props.date.getFullYear()}</span>
            </div>
            <div className="row b-down">
                <div className="container justify full-width flex-row nav-list ">
                    {
                        DAYS.map(
                            (e, i) => 
                                <div 
                                    key={i} 
                                    className="box-padding same-width box-transparent highlight-title text-center"
                                >
                                    {e}
                                </div>
                        )
                    }
                </div>
            </div>
            <div className="row">
                <div className="container">
                    {
                        weeks.map(
                            (e, i) =>
                                <div key={i} className="row">
                                    <CardList
                                        displayList="justify no-padding full-width flex-row nav-list h-center"
                                        elems={e} />
                                </div>
                        )
                    }
                </div>
            </div>
            <div className="row">
                <ButtonList
                    clickHandler={props.changeCurrentMonth}
                    elemClass="box-transparent"
                    displayList="flex-row margin-box nav-list full-width no-padding"
                    elems={navigation} />
            </div>
        </div>
    );
}
export default MonthCalendar;