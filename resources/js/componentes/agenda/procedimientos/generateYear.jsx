/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import ButtonList from '../../../componentes/basic/ButtonList';
/**
 * constantes
 */
import {MONTHS,monthRows,monthIndex} from '../../../constantes/DaysMonths';

export default function generateYear(date,handler){
    let year = [],
        fourMonths=[],
        currentIndex = monthIndex[date.getMonth()].split('');
    for(let row = 0; row<monthRows.length; row++){
        year.push(
            <ButtonList
                key={row}
                container="thirty"
                clickHandler={handler}
                elems={monthRows[row]}
                selected={row==currentIndex[0] ? date.getMonth()+1 : null}
                selectedClass={"box-padding v-padding full-width highlight-nav highlight-border"}
                displayList="flex-row no-margin nav-list full-width no-padding h-center"
                elemClass="box-padding highlight-hover box-transparent full-width"/>
        );
    }
    return year;
}
