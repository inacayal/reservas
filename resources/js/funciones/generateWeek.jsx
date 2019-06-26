import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DAYS, MONTHS } from '../constantes/DaysMonths';

export default function generateWeek(date, off, feriados) {
    //numbers must have min sec hr set to 0
    let week = [];
    let day = date.getDay() - off;
    let dayNumber = date.getDate();
    let filter = [];
    for (let i = 0; i < DAYS.length; i++) {
        let newDay = new Date();
        newDay.setHours(0, 0, 0, 0);
        newDay.setDate(dayNumber + (i - day));
        let today = (i === day);
        let elem = {
            title: (
                <div>
                    <div className="content">
                        {DAYS[newDay.getDay()]}
                    </div>
                    <div className={(today) ? "content c-title highlight-title" : "content c-title light-danger"}>
                        {newDay.getDate()}
                    </div>
                    <div className="content">
                        {MONTHS[newDay.getMonth()]}
                    </div>
                </div>
            ),
            class: (today) ? "box-transparent pointer border-box box-padding margin-box highlight-title" : "pointer box-padding border-box margin-box box-transparent",
            data: newDay,
            feriado: feriados[newDay.toLocaleDateString]
        };
        let fr = feriados[(newDay.getTime()).toString()];
        if (fr) {
            filter.push(fr)
        }
        week.push(elem);
    }
    return [week, filter];
}
