/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import DayDictionary from '../diccionarios/assign/DayDictionary';
import ButtonList from '../../basic/ButtonList';

export function generateHourArray(
    horario,
    intervalo,
    dataObject,
    type,
    actions,
    caida
){
    let strHr = parseInt(horario.apertura.reserva.hora),
        strMn = parseInt(horario.apertura.reserva.minuto),
        endHr = parseInt(horario.cierre.reserva.hora),
        endMn = parseInt(horario.cierre.reserva.minuto),
        hrPtr = strHr,
        mnPtr = strMn,
        hourArray=[];

    while (hrPtr !== endHr || (hrPtr === endHr && mnPtr <= endMn)){
        if(mnPtr>=60){
            mnPtr=0;
            hrPtr++;
        }
        const find = mnPtr < 10
            ? hrPtr + '0' + mnPtr
            : hrPtr + '' + mnPtr,
            data = dataObject[find];

        hourArray.push(
            DayDictionary[type](
                data,
                find,
                mnPtr < 10 ? hrPtr + ':0' + mnPtr : hrPtr + ':' + mnPtr,
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
    let reservationHours = [],
        dateStr = date.getDate();
    return [
        generateHourArray(
            horariosData[date.getDay()+1],
            parseInt(intervalo),
            ((data[dateStr]||{}).reservas||{}),
            type,
            actions,
            caida
        ),
        ((data[dateStr] || {}).reservas || []).length 
    ];
}