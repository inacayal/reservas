/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import CardList from '../../basic/CardList';
import ButtonList from '../../basic/ButtonList';
/**
 * constantes
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';
import { CLASSBYSTATE } from '../../../constantes/CardObject';


export const ReservaMonthByState = {
    data: (
        resDate,
        titleClass,
        data,
        acciones
    ) => ({
        title: {
            data: resDate.getDate(),
            class: titleClass,
        },
        content: {},
        container: {
            data: data,
            class: "same-width text-center box-padding highlight-hover pointer fix-height blue-highlight-hover",
            click: acciones ? acciones[0].click : null
        }
    }),
    no_data: (
        resDate,
        titleClass,
        data,
        acciones
    ) => ({
        title: {
            data: resDate.getDate(),
            class: "content c-title"
        },
        content: {},
        container: {
            class: "background-border same-width text-center box-padding fix-height",
            data: data,
            click: acciones ? acciones[0].click : null
        }
    })
};

export const ReservaWeekByState = {

};