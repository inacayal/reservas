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
import {GenerateActions} from '../../../acciones/GenerateActions';
import WeekDictionary from '../diccionarios/assign/WeekDictionary';

const generateWeek = {
    horarios: (
        data,
        actions
    ) => DAYS.reduce(
            (prev, curr, i) => {
            const actionIndex = data[i] ? 'data' : 'no_data';
            prev.push(
                WeekDictionary.horarios(
                    GenerateActions.horarios(
                        data[i],
                        i,
                        actions
                    ),
                    data[i],
                    i.toString()
                )
            );
            return prev;
        },
        []
    ),
    reservas: (
        date,
        data,
        actions
    ) => {
        let dy = date.getDay();
        return DAYS.reduce(
            (prev,curr,i) => {
                let datePtr = new Date(date);
                datePtr.setDate(datePtr.getDate() + (i - dy));
                const strDate = datePtr.getDate();
                
                if (date.getMonth() === datePtr.getMonth())
                    prev.push(
                        WeekDictionary.reservas(
                            GenerateActions.reservas(
                                data[strDate] || null,
                                actions.outer,
                                strDate,
                                'week',
                                data[strDate] ? 'data' : 'no_data'
                            ),
                            data[strDate],
                            datePtr.getTime(),
                            actions
                        )
                    );
                return prev;
            },
            []
        );
    },
    feriados: (
        date,
        data,
        actions
    ) => {
        const day = date.getDay();
        return DAYS.reduce(
            (prev, curr, i) => {
                let datePtr = new Date(date);
                datePtr.setDate(datePtr.getDate() + (i - day));
                const strDate = datePtr.getDate();
                if (date.getMonth() === datePtr.getMonth())
                    prev.push(
                        WeekDictionary.feriados(
                            GenerateActions.feriados(
                                data[strDate],
                                actions,
                                strDate,
                                'week'
                            ),
                            data[strDate],
                            datePtr.getTime()
                        )
                    );
                return prev
            },
            []
        );
    }
}
export default generateWeek;