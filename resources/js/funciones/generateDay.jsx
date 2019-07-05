import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function generateDayReservationHours(
    data,
    intervalo
){
    return Object.keys(data).map(
        (e,i) => {
            let startTime = data[e].apertura.split(':'),
                strHr = parseInt(startTime[0]),
                strMn = parseInt(startTime[1]),
                hrPtr = strHr,
                mnPtr = strMn,
                hourArray=[],
                endTime = data[e].cierre.split(':'),
                endHr = parseInt(endTime[0]),
                endMn = parseInt(endTime[1]);
            
            while (hrPtr !== endHr || (hrPtr === endHr && mnPtr <= endMn)){
                if(mnPtr>=60){
                    mnPtr=0;
                    hrPtr++;
                }
                hourArray.push(hrPtr + ":" + (mnPtr===0 ? "00" : mnPtr)+ ":00");
                mnPtr+=intervalo;
            }
            return hourArray;
        }
    );
}

export default function generateDay(
    data,
    intervalo,
    caida
){
    let reservationHours = generateDayReservationHours(
        data,
        parseInt(intervalo)
    );
    console.log(reservationHours);
}