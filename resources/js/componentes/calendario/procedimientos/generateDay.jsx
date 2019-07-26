import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import assignDayElementType from '../diccionarios/DayDictionary';
import ButtonList from '../../basic/ButtonList';

function generateHourArray(
    horarios,
    intervalo,
    date,
    dataObject,
    type,
    actions,
    caida
){
    let startTime = horarios.apertura.split(':'),
        strHr = parseInt(startTime[0]),
        strMn = parseInt(startTime[1]),
        hrPtr = strHr,
        mnPtr = strMn,
        hourArray=[],
        endTime = horarios.cierre.split(':'),
        endHr = parseInt(endTime[0]),
        endMn = parseInt(endTime[1]);
    
    while (hrPtr !== endHr || (hrPtr === endHr && mnPtr <= endMn)){
        if(mnPtr>=60){
            mnPtr=0;
            hrPtr++;
        }
        let findDate = new Date(date).setHours(hrPtr, mnPtr, 0, 0),
            data = dataObject[findDate];
        hourArray.push(
            assignDayElementType[type](
                data,
                findDate,
                actions
            )
        );
        mnPtr+=intervalo;
    }
    return hourArray;
}

export default function generateDay(
    horariosData,
    intervalo,
    caida,
    date,
    data,
    type,
    actions
){
    let ceroDate = new Date(date),
        reservationHours = [];
    ceroDate.setHours(0,0,0,0);
    let dateStr = ceroDate.getTime().toString();
    return [
        generateHourArray(
            horariosData[date.getDay()],
            parseInt(intervalo),
            date,
            ((data[dateStr]||{}).reservas||{}),
            type,
            actions,
            caida
        ),
        ((data[dateStr] || {}).reservas || []).length 
    ];
}