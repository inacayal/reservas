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
import {generateActions} from '../../../acciones/generateActions';
import assignWeekElementType from '../diccionarios/assign/WeekDictionary';

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
        actions
    ) => {
        let dy = date.getDay();
        return DAYS.map(
            (e, i) => {
                let datePtr = new Date(date);
                datePtr.setDate(datePtr.getDate() + (i - dy));
                datePtr.setHours(0, 0, 0, 0);
                let strDate = datePtr.getTime();
                
                //cambiar acciones generadas dependiendo de la data
                //genera objecto actions con asignaciones terminadas
                
                return assignWeekElementType['reservas'](
                    generateActions['reservas'](
                        data[strDate] || null,
                        actions.outer,
                        strDate,
                        'week'
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