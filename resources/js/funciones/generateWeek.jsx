import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {assignWeekElementType} from './generateCards';
import {DAYS} from '../constantes/DaysMonths';
import {generateActions} from './generateActions';

export default function generateWeek(date, data, actions,currentDate,type) {
    switch (type){
        case "horarios":
            return DAYS.map(
                (e, i) => {
                    let elem = assignWeekElementType(
                        generateActions(
                            data[i], 
                            actions.outer, 
                            i, 
                            true, 
                            type
                        ),
                        type,
                        data[i],
                        i,
                        actions
                    );
                    return elem;
                }
            );
        break;
        case "reservas":
            let dy = date.getDay();
            return DAYS.map(
                (e, i) => {
                    let datePtr = new Date(date);
                    datePtr.setDate(datePtr.getDate() + (i - dy));
                    datePtr.setHours(0, 0, 0, 0);
                    let strDate = datePtr.getTime(),
                        informacionDia = data[strDate] ? { 
                            data: data[strDate].reservas, 
                            show: data[strDate].show
                        } : [],
                        elem = assignWeekElementType(
                            generateActions(
                                informacionDia.data,
                                actions.outer, 
                                strDate, 
                                true,
                                type,
                                informacionDia.show
                            ),
                            type,
                            data[strDate],
                            strDate,
                            actions
                        );
                    return elem;
                }
            );
        break;
        case "feriados":
            let day = date.getDay();
            return DAYS.map(
                (e, i) => {
                    let datePtr = new Date(date);
                    datePtr.setDate(datePtr.getDate() + (i - day));
                    datePtr.setHours(0, 0, 0, 0);
                    let strDate = datePtr.getTime();
                    let elem = assignWeekElementType(
                        generateActions(
                            data[strDate], 
                            actions.outer, 
                            strDate, 
                            true, 
                            type
                        ),
                        type,
                        data[strDate],
                        strDate,
                        actions
                    );
                    return elem;
                }
            );
        break;
    }
}