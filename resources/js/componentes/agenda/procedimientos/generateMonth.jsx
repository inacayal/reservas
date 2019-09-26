/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * constantes
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';
import {GenerateActions} from '../../../acciones/GenerateActions';
/**
 * diccionario
 */
import {AssignMonthByStatus} from './AssignByStatus';
/**
 * funciones
 */
import {getMonthLength} from '../../../utils/Helper';

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
            AssignMonthByStatus(
                null,
                null,
                new Date(evalDate),
                type,
                false
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
            AssignMonthByStatus(
                null,
                null,
                new Date(evalDate),
                type,
                false
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
        monthEnd=null;
    datePtr.setDate(datePtr.getDate() - datePtr.getDate() + 1);
    let dateStr = datePtr.getDate();
    
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
            AssignMonthByStatus(
                GenerateActions[type](
                    data[dateStr],
                    actions,
                    data[dateStr] ? (data[dateStr]||{}).id : dateStr,
                    'month'
                ),
                data[dateStr],
                new Date(datePtr),
                type,
                true
            )
        );
        
        if (weekCtr === 6) {
            weekCtr = 0;
            month.push(monthEnd === null ? week : week.concat(monthEnd));
            week = [];
        } else weekCtr++;
        
        datePtr = new Date(datePtr);
        datePtr.setDate(datePtr.getDate() + 1);
        dateStr = datePtr.getDate();
    }
    return month;
}