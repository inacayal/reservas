/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * constantes
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';
import {generateActions} from '../../../acciones/generateActions';
/**
 * diccionario
 */
import assignMonthElementType from '../diccionarios/assign/MonthDictionary';
/**
 * funciones
 */
import getMonthLength from '../../../funciones/getMonthLength';

function evalFirstWeek (
    date,
    type
){
    let day = date.getDay(),
        evalDate = new Date(date),
        res = [];
    //ver el primer dia de esta semana
    evalDate.setDate(evalDate.getDate()-day);
    while(evalDate.getMonth()!==date.getMonth()){
        res.push(
            assignMonthElementType[type](
                null,
                null,
                evalDate.getTime(),
                true
            )
        );
        evalDate = new Date(evalDate);
        evalDate.setDate(evalDate.getDate()+1);
    }
    return res;
}

function evalLastWeek(
    date,
    type
){
    let day = date.getDay(),
        evalDate = new Date(date),
        res = [];
    //ver el primer dia de esta semana
    evalDate.setDate(evalDate.getDate() + 6 - day);
    while (evalDate.getMonth() !== date.getMonth()) {
        res.push(
            assignMonthElementType[type](
                null,
                null,
                evalDate.getTime(),
                true
            )
        );
        evalDate = new Date(evalDate);
        evalDate.setDate(evalDate.getDate() - 1);
    }
    return (res||[]).reverse();
}
export default function generateMonth (
    date,
    data,
    actions,
    type
){
    let monthLength = getMonthLength(
            date.getMonth()+1,
            date.getFullYear()
        ),
        datePtr = new Date(date),
        month = [],
        week = [],
        today = new Date(),
        monthEnd=null;

    let dateStr = datePtr.setDate(datePtr.getDate() - datePtr.getDate() + 1);
    
    for (let ptr = 0; ptr<monthLength; ptr++){
        let weekCtr = datePtr.getDay(),
            elem = {};
        
        if (ptr===0){
            week = evalFirstWeek(
                datePtr,
                type
            );
        }

        if(ptr===monthLength-1){
            monthEnd = evalLastWeek(
                datePtr,
                type
            );
            weekCtr = 6;
        }
        week.push(
            assignMonthElementType[type](
                generateActions[type](
                    data[dateStr] || null,
                    actions.outer,
                    dateStr,
                    'month'
                ),
                data[dateStr],
                dateStr,
                actions.outer
            )
        );
        
        if (weekCtr === 6) {
            weekCtr = 0;
            month.push(monthEnd === null ? week : week.concat(monthEnd));
            week = [];
        } else weekCtr++;
        
        datePtr = new Date(datePtr);
        dateStr = datePtr.setDate(datePtr.getDate() + 1);
        datePtr.setHours(0, 0, 0, 0);
    }
    return month;
}