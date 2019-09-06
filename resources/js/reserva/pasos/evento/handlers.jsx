/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export const generateListByLocationCapacity = ({
    personas,
    ubicaciones
}) => {
    const list = [...Array(ubicaciones.maximo + 1).keys()];
    list.shift();
    personas.list = Object.assign({}, list);
};

export const generateHourArray = (
    horario,
    intervalo,
    hourArray,
    start
) => {
    let strHr = horario.apertura.reserva.hora,
        strMn = horario.apertura.reserva.minuto,
        endHr = horario.cierre.reserva.hora === 0 ? 24 : horario.cierre.reserva.hora,
        endMn = horario.cierre.reserva.minuto,
        hrPtr = start.hora,
        mnPtr = start.minuto,
        hList = {};

    hourArray[hrPtr] = {};
    hList[hrPtr] = hrPtr;

    while (hrPtr !== endHr || (hrPtr === endHr && mnPtr <= endMn)) {
        if (mnPtr >= 60) {
            hrPtr++;
            hourArray[hrPtr] = {};
            hList[hrPtr] = hrPtr;
            mnPtr = 0;
        }
        hourArray[hrPtr][mnPtr] = mnPtr;
        mnPtr += intervalo;
    }

    return { hourArray, hList };
}

export const calculateOffset = (
    antelacion,
    date,
    data,
    callBack
) => {
    const offset = { dias: parseInt(antelacion / 24), horas: antelacion % 24 },
        cierreH = parseInt(data.cierre.reserva.hora),
        cierreM = parseInt(data.cierre.reserva.minuto);

    date.setDate(date.getDate() + offset.dias);
    date.setHours(date.getHours() + offset.horas, date.getMinutes(), 0, 0);

    if (date.getHours() > cierreH || (date.getHours() === cierreH && date.getMinutes() > cierreM)) {
        date.setDate(date.getDate() + 1);
        date.setHours(0, 0, 0, 0);
    }

    callBack(date);

    return date;
};

export const generateAcceptedHours = ({
    antelacion,
    feriado,
    horario,
    intervalo,
    fecha,
    min
}) => {
    const generate = feriado !== undefined ? feriado : horario,
        strHora = min.getDate() === fecha.getDate() && min.getMonth() === fecha.getMonth() && min.getFullYear() === fecha.getFullYear()
            ? generate.apertura.reserva.hora + antelacion
            : generate.apertura.reserva.hora,
        strMinuto = generate.apertura.reserva.minuto;

    return generateHourArray(
        generate,
        intervalo,
        {},
        { hora: strHora, minuto: strMinuto }
    );
}
