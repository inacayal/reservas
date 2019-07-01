import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DAYS, MONTHS } from '../constantes/DaysMonths';
import {generateMonthWeek} from './weekGenerator';

function moveToFirstWeek(date){
    let copyDate = new Date(date);
    while (copyDate.getMonth() === date.getMonth()){
        copyDate = new Date(copyDate);
        copyDate.setDate(copyDate.getDate()-7);
    }
    return copyDate;
}

export default function generateMonth (date,data,actions){
    
    let datePointer = moveToFirstWeek(date);
    let evalDate = new Date(datePointer);
    
    evalDate.setDate(evalDate.getDate()-datePointer.getDay()+6);

    let month = (evalDate.getMonth() === date.getMonth()) ? 
        [generateMonthWeek(datePointer, data, actions, true, date)] 
        : [];
    
    let evalMonth = date.getMonth()-1 < 0 ? 11 : date.getMonth()-1;

    while (evalMonth === datePointer.getMonth() || date.getMonth() === datePointer.getMonth()){
        evalMonth = date.getMonth() - 1 < 0 ? 11 : date.getMonth() - 1;
        datePointer = new Date(datePointer);
        datePointer.setDate(datePointer.getDate() + 7);
        evalDate = new Date(datePointer);
        evalDate.setDate(evalDate.getDate() -datePointer.getDay());
        if(evalDate.getMonth() === date.getMonth())
            month.push(generateMonthWeek(datePointer, data, actions, true, date));
    }
    
    return month;
}