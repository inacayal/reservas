import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import getMonthLength from './getMonthLength';
import { DAYS, MONTHS } from '../constantes/DaysMonths';
import {assignMonthElementType} from './generateCards';
import {generateActions} from './generateActions';

function evalFirstWeek (date,type){
    let day = date.getDay(),
        evalDate = new Date(date),
        res = [];
    //ver el primer dia de esta semana
    evalDate.setDate(evalDate.getDate()-day);
    while(evalDate.getMonth()!==date.getMonth()){
        let elem = assignMonthElementType(
            null,
            type,
            null,
            evalDate.getTime()
        );
        res.push(elem);
        evalDate = new Date(evalDate);
        evalDate.setDate(evalDate.getDate()+1);
    }
    return res;
}

function evalLastWeek(date,type){
    let day = date.getDay(),
        evalDate = new Date(date),
        res = [];
    //ver el primer dia de esta semana
    evalDate.setDate(evalDate.getDate() + 6 - day);
    while (evalDate.getMonth() !== date.getMonth()) {
        let elem = assignMonthElementType(
            null,
            type,
            null,
            evalDate.getTime()
        );
        res.push(elem);
        evalDate = new Date(evalDate);
        evalDate.setDate(evalDate.getDate() - 1);
    }
    return (res||[]).reverse();
}
export default function generateMonth (date,data,actions,type){
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
        elem = assignMonthElementType(
            generateActions(
                data[dateStr], 
                actions.outer, 
                dateStr, 
                false, 
                type
            ),
            type,
            data[dateStr],
            dateStr
        );
        week.push(elem);
        
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