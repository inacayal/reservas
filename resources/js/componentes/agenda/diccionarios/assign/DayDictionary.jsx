/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import CardList from '../../../basic/CardList';
import ButtonList from '../../../basic/ButtonList';
/**
 * dictionary
 */
import {ReservaDayByState} from '../display/ReservaByState';
import { GenerateActions } from '../../../../acciones/GenerateActions';
/**
 * constantes
 */
import { DAYS, MONTHS } from '../../../../constantes/DaysMonths';
import { CLASSBYSTATE } from '../../../../constantes/CardObject';

const DayDictionary = {
    reservas: (
        data,
        dataStr,
        display,
        actions
    ) => {
        let index = data ? 'data' : 'no_data',
            reservations = data ?
                generateDayCardFromArray(
                    data,
                    actions,
                    dataStr
                )
                : null;
        return ReservaDayByState[index](
            display,
            reservations
        );
    },
    feriados: (
        sectionData,
        data,
        actions
    ) => {
        return {};
    }
}

function generateDayCardFromArray(
    data,
    actions,
    dataStr
) {
    let obj = {};
    return data.map(
        (e, i) => {
            let acciones = GenerateActions.reservas(
                    data,
                    {
                        aceptar:actions.aceptar,
                        rechazar:actions.rechazar,
                        revertir:actions.revertir
                    },
                    dataStr,
                    'day',
                    e.estado
                ),
                classes = i === 0 ?
                    "box-padding no-top-padding"
                    : "box-padding";
            if (i !== data.length - 1)
                classes += " border-bottom";
            return {
                title: {
                    data: (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-11 no-padding">
                                    <span className="side-margin light-title inline-block">{e.nombre + " " + e.apellido}</span>
                                    {acciones}
                                </div>
                                <div className="col-md-1 no-padding smaller-text">
                                    {e.estado}
                                </div>
                            </div>
                        </div>
                    ),
                    class: ""
                },
                content: {},
                container: {
                    class: classes
                }
            };
        }
    );
};
export default DayDictionary;