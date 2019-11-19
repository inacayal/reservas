/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import Titulo from '../../../componentes/basic/Titulo';
/**
 * api
 */
/**
 * function
 */
import generateWeek from '../../../componentes/agenda/procedimientos/generateWeek';
/**
 * constants
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';

export function Horarios (props) {
    const week = generateWeek(
            null,
            props.data,
            {eliminar: props.toggleModal},
            'horarios'
        );
    return (
        <>
            <Titulo
                title="Horarios"/>
            <ul className="justify no-padding full-width flex-column nav-list h-center">
                {
                    week.map(
                        (elem, index) =>
                            <li key={index} className={elem.class}><elem.content /></li>
                    )
                }
            </ul>
        </>
    );
}
