import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../../allUse/ButtonList';
import Calendar from 'react-calendar';
import {DAYS,MONTHS } from '../../../../constantes/DaysMonths';

function MonthCalendar(props){
    return (
        <div className={!props.show ? "row" : "hidden"}>
            <div className="col-md-7">
                <Calendar
                    value={props.date}
                    onChange={props.dateChange} />
            </div>
            <div className="col-md-5 no-padding">
                <div className="box-padding">
                    <div className="highlight-title">{"Días feriados de " + MONTHS[props.date.getMonth()] + " " + props.date.getFullYear()}</div>
                    <ButtonList
                        clickHandler={props.daySelection}
                        displayList="flex-column h-center nav-list no-padding"
                        elems={props.info} />
                </div>
            </div>
        </div>
    );
}
export default MonthCalendar;