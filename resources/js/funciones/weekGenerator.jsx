import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DAYS, MONTHS } from '../constantes/DaysMonths';
import Button from '../componentes/basic/Button';
import ButtonList from '../componentes/complex/allUse/ButtonList';
import generateActions from './generateActions';

export function generateDayWeek(date, data, actions,currentDate) {
    let week = [];
    let day = date.getDay();
    let today = new Date();
    return DAYS.map(
        (e,i) => {
            let datePtr = new Date(date);
            datePtr.setDate(datePtr.getDate() + (i - day));
            datePtr.setHours(0,0,0,0);
            let stringDate = (datePtr.getTime()).toString();
            let acciones = generateActions(data[stringDate],actions,stringDate);
            let todayCond = today.getDate() === datePtr.getDate() && today.getMonth()===datePtr.getMonth() && today.getFullYear() === datePtr.getFullYear();
            let elem = {
                title: {
                    data: DAYS[datePtr.getDay()],
                    class: ""
                },
                content: {
                    data: datePtr.getDate(),
                    class: todayCond ? "content c-title highlight-title" : "content c-title light-danger"
                },
                description: {
                    data: MONTHS[datePtr.getMonth()],
                    class: ""
                },
                footer: {
                    data: <ButtonList
                        displayList="flex-row nav-list no-padding"
                        container="align-center"
                        elemClass="box-transparent highlight-hover full-width text-left"
                        elems={acciones} />,
                    class: ""
                },
                container: {
                    data: datePtr,
                    class: todayCond ? "same-width box-transparent highlight-title text-center" : "text-center box-transparent same-width"
                }
            };
            return elem;
        }
    )
}

export function generateMonthWeek(date, data, actions, currentDate) {
    let week = [];
    let day = date.getDay();
    let today = new Date();
    return DAYS.map(
        (e, i) => {
            let datePtr = new Date(date);
            datePtr.setDate(datePtr.getDate() + (i - day));
            datePtr.setHours(0, 0, 0, 0);
            let stringDate = (datePtr.getTime()).toString();
            let acciones = generateActions(data[stringDate], actions, stringDate);
            let todayCond = today.getDate() === datePtr.getDate() && today.getMonth() === datePtr.getMonth() && today.getFullYear() === datePtr.getFullYear();
            let elem = {
                title: {
                    data: datePtr.getDate(),
                    class: todayCond ? "content c-title highlight-title" : (currentDate.getMonth() !== datePtr.getMonth()) ? "content c-title" : "content c-title light-danger"
                },
                content: {
                    data: "",
                    class: ""
                },
                description: {
                    data: "",
                    class: ""
                },
                footer: {
                    data: <ButtonList
                        displayList="flex-row nav-list no-padding"
                        container="align-center"
                        elemClass="box-transparent highlight-hover full-width text-left"
                        elems={acciones} />,
                    class: ""
                },
                container: {
                    data: datePtr,
                    class: (currentDate.getMonth() !== datePtr.getMonth()) ?
                        "background-border same-width text-center box-padding" : "same-width box-transparent text-center box-padding"
                }
            };
            return elem;
        }
    )
}
