/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * Components
 */
import CardList from '../../basic/CardList';
import ButtonList from '../../basic/ButtonList';
/**
 * dictionaries
 */
import { assignActionsByStatus } from '../../../funciones/generateActions';
import {FeriadoMonthByState} from './FeriadoByState';
/**
 * constantes
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';
import { CLASSBYSTATE, CLASSBYDATE } from '../../../constantes/CardObject';
import {ReservaMonthByState} from './ReservasByState';


const assignMonthElementType = {
    reservas: (
        acciones,
        sectionData,
        data
    )=> {
        const resDate = new Date(data),
            tday = new Date(),
            cond = tday.getDate() === resDate.getDate() && tday.getMonth() === resDate.getMonth() && tday.getFullYear() === resDate.getFullYear(),
            titleClass = cond ?
                "content c-title highlight-title text-center" :
                "content c-title text-center",
            index = sectionData !== null 
                ? "data"
                : "no_data";
        return ReservaMonthByState[index](
            resDate,
            titleClass,
            data,
            acciones
        );
    },
    feriados:(
        acciones,
        sectionData,
        data,
        isThisMonth
    ) => {
        const date = new Date(data),
            today = new Date(),
            todayCond = today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear(),
            index = todayCond ? 'today' : 'not_today';
        
        if (sectionData) 
            return FeriadoMonthByState["data"][sectionData.estado](
                CLASSBYDATE[index].title,
                acciones,
                date,
                CLASSBYDATE[index].container
            );
        return FeriadoMonthByState["no_data"](date,isThisMonth);
    }
};

export default assignMonthElementType;



