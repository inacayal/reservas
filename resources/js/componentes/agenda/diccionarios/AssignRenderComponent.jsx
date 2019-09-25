/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { HorarioWeekByState } from './display/HorarioByState';
import { FeriadoWeekByState, FeriadoMonthByState } from './display/FeriadoByState';
import { ReservaWeekByState, ReservaMonthByState, ReservaDayByState } from './display/ReservaByState';


export const AssignWeekComponent = {
    feriados: {...FeriadoWeekByState},
    horarios: {...HorarioWeekByState},
    reservas: {...ReservaWeekByState}
};

export const AssignMonthComponent = {
    feriados: { ...FeriadoMonthByState },
    reservas: { ...ReservaMonthByState }
};

export const AssignDayComponent = {
    reservas: {...ReservaDayByState}
};