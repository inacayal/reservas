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
        data,
        actions
    ) => DAYS.map(
        (e, i) => {
            const actionIndex = data[i] ? 'data' : 'no_data';
            return assignWeekElementType['horarios'](
                generateActions['horarios'](
                    data[i],
                    i,
                    actions
                ),
                data[i],
                i.toString()
            );
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
        actions
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
                        actions,
                        strDate,
                        'week'
                    ),
                    data[strDate],
                    strDate
                );
            }
        );
    }
}
export default generateWeek;