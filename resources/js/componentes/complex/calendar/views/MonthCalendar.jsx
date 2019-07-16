import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//funciones
import generateMonth from '../../../../funciones/generateMonth';
import calendarNavigation from '../../../../funciones/calendarNavigation';
import getMonthLength from '../../../../funciones/getMonthLength';
//Constants
import { DAYS, MONTHS } from '../../../../constantes/DaysMonths';
//complex
import ButtonList from '../../allUse/ButtonList';
import CardList from '../../allUse/CardList';


function MonthCalendar(props) {
    let month = props.date.getMonth();
    let navigation = calendarNavigation({ left: -1, right: 1}, 'mes');
    let weeks = generateMonth(props.date,props.data,props.actions,props.type);
    return (
        <div className={props.show ? "full-width" : "hidden"}>
            <div className=" bold">
                {"Mostrando " + MONTHS[month] + " " + props.date.getFullYear()}
            </div>
            <div className="container">
                <div className="row b-down">
                    <div className="justify full-width flex-row nav-list h-center ">
                        {DAYS.map(
                            (e, i) => <div key={i} className="box-padding same-width box-transparent highlight-title text-center">{e}</div>
                        )}
                    </div>
                </div>
                {weeks.map(
                    (e, i) => 
                        <div key={i} className="row">
                            <CardList
                            displayList="justify no-padding full-width flex-row nav-list h-center"
                            elems={e} />
                        </div>
                )}
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