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
import {generateActions} from '../../../funciones/generateActions';
import assignWeekElementType from '../diccionarios/WeekDictionary';

const generateWeek = {
    horarios: (
        date,
        data,
        actions,
        currentDate
    ) => DAYS.map(
        (e, i) => {
            return assignWeekElementType['horarios'](
                generateActions['horarios'](
                    data[i],
                    actions.outer,
                    i.toString(),
                    true,
                    true
                ),
                data[i],
                i.toString(),
                actions
            )
        }
    ),
    reservas: (
        date,
        data,
        actions,
        currentDate
    ) => {
        let dy = date.getDay();
        return DAYS.map(
            (e, i) => {
                let datePtr = new Date(date);
                datePtr.setDate(datePtr.getDate() + (i - dy));
                datePtr.setHours(0, 0, 0, 0);
                let strDate = datePtr.getTime(),
                    informacionDia = data[strDate] ? {
                        data: data[strDate].reservas,
                        show: data[strDate].show
                    } : [];
                return assignWeekElementType['reservas'](
                    generateActions['reservas'](
                        informacionDia.data,
                        actions.outer,
                        strDate,
                        true,
                        informacionDia.show
                    ),
                    data[strDate],
                    strDate,
                    actions
                );
            }
        );
    },
    feriados: (
        date,
        data,
        actions,
        currentDate
    ) => {
        const day = date.getDay();
        return DAYS.map(
            (e, i) => {
                let datePtr = new Date(date);
                datePtr.setDate(datePtr.getDate() + (i - day));
                datePtr.setHours(0, 0, 0, 0);
                let strDate = datePtr.getTime();
                return assignWeekElementType['feriados'](
                    generateActions['feriados'](
                        data[strDate],
                        actions.outer,
                        strDate,
                        true
                    ),
                    data[strDate],
                    strDate,
                    actions
                );
            }
        );
    }
}
export default generateWeek;