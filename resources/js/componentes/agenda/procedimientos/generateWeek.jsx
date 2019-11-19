/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * constantes
 */
import {DAYS} from '../../../constantes/DaysMonths';
/**
 * funciones
 */
import {GenerateActions} from '../../../acciones/GenerateActions';
import {AssignWeekByStatus} from './AssignByStatus';

const moveIndex = (
    i,
    date,
    data
) => {
    let rData = [];
    if (date) {
        let datePtr = new Date(date),
            day = date.getDay();
        datePtr.setDate(datePtr.getDate() + (i - day));
        let index = datePtr.getDate();
        rData = [data[index], (data[index]||{}).id ? data[index].id : datePtr, datePtr];
    } else
        rData = [ data[i + 1] || null, data[i + 1] ? data[i + 1].id : i + 1 , null];
    return rData;
}

const generateWeek = (
    date,
    data,
    actions,
    type
) => DAYS.reduce(
        (prev, curr, ind) => {
            const [currentData,index, dateIndex] = moveIndex(ind,date,data),
                acciones = GenerateActions[type](
                    currentData,
                    actions,
                    index,
                    'week',
                    date
                ),
                elem = AssignWeekByStatus(
                    acciones,
                    currentData,
                    index,
                    actions,
                    type
                );

            if (dateIndex){
                prev = date.getMonth() === dateIndex.getMonth()
                    ? prev.concat([elem])
                    : prev;
            } else
                prev.push(elem);

            return prev;
        },
    []
)
export default generateWeek;
