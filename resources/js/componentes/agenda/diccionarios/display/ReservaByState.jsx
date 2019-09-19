/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import {CardList} from '../../../basic/CardList';
import ButtonList from '../../../basic/ButtonList';
/**
 * funciones
 */
import {GenerateActions} from '../../../../acciones/GenerateActions';
/**
 * constantes
 */
import { DAYS, MONTHS } from '../../../../constantes/DaysMonths';
import { CLASSBYSTATE } from '../../../../constantes/CardObject';

export const ReservaDayByState = {
    data: (
        display,
        reservations
    ) => ({
        title: {
            data: (
                <div className="container no-padding">
                    <div className="row">
                        <div className="col-md-1">
                            <span className="side-margin light-danger bold inline-block">{display}</span>
                        </div>
                        <div className="col-md-11">
                            <CardList
                                displayList="nav-list full-width"
                                elems={reservations} />
                        </div>
                    </div>
                </div>
            ),
            class: "box-padding border-bottom"
        },
        content: {},
        container: {
            class: "padding-box"
        }
    }),
    no_data: (
        display,
        reservations
    ) => ({
        title: {
            data: (
                <div>
                    <div className="inline-block half">
                        <div className="line-v-middle light-danger bold side-margin inline-block">{display}</div>
                    </div>
                    <div className="inline-block half smaller-text text-right">
                        Sin reservas
                    </div>
                </div>
            ),
            class: "box-padding border-bottom"
        },
        content: {},
        container: {
            class: "padding-box"
        }
    })
};

export const ReservaMonthByState = {
    data: (
        resDate,
        titleClass,
        data,
        actions
    ) => ({
        title: {
            data: resDate.getDate(),
            class: titleClass,
        },
        content: {},
        container: {
            data: data,
            class: "same-width text-center box-padding highlight-hover pointer fix-height blue-highlight-hover",
            click: actions.ver
        }
    }),
    no_data: (
        resDate,
        titleClass,
        data,
        actions
    ) => ({
        title: {
            data: resDate.getDate(),
            class: "content c-title"
        },
        content: {},
        container: {
            class: "background-border same-width text-center box-padding fix-height",
            data: data,
            click: actions.ver
        }
    })
};

export const ReservaWeekByState = {
    no_data:(
        dt,
        tcnd,
        elC,
        sectionData,
        acciones,
        actions
    ) => ({
        title: {
            data: (
                <div className="container no-padding">
                    <div className="row">
                        <div className="col-md-8 no-padding">
                            <span className="line-v-middle inline-block v-align-center">{DAYS[dt.getDay()] + " "}</span>
                            <span className={tcnd ? "margin-box inline-block v-align-center highlight-title c-title" : " margin-box inline-block v-align-center light-danger c-title"}>{dt.getDate() + " "}</span>
                            <span className="line-v-middle inline-block v-align-center ">{MONTHS[dt.getMonth()]}</span>
                        </div>
                        <div className="col-md-4 no-padding text-right">
                            <span className="line-v-middle smaller-text inline-block negative-margin"> No hay reservaciones a mostrar</span>
                        </div>
                    </div>
                </div>
            )
        },
        content: {
            data: ""
        },
        container: {
            class: elC
        }
    }),
    data: (
        dt,
        tcnd,
        elC,
        sectionData,
        acciones,
        actions
    ) => {
        const reservations = generateCardListForReservationObject(
            sectionData.reservas,
            actions.inner
        );
        return {
            title: {
                data: (
                    <div className="container no-padding">
                        <div className="row">
                            <div className="col-md-8 no-padding">
                                <span className="line-v-middle inline-block v-align-center">{DAYS[dt.getDay()] + " "}</span>
                                <span className={tcnd ? "margin-box inline-block v-align-center highlight-title c-title" : " margin-box inline-block v-align-center light-danger c-title"}>{dt.getDate() + " "}</span>
                                <span className="line-v-middle inline-block v-align-center ">{MONTHS[dt.getMonth()]}</span>
                                <div className="inline-block margin-box">
                                    {acciones}
                                </div>
                            </div>
                            <div className="col-md-4 no-padding text-right">
                                <span className="line-v-middle smaller-text inline-block negative-margin">
                                    {
                                        sectionData.show ?
                                            "Mostrando " + reservations.length + " reservaciones encontradas"
                                            : reservations.length + " reservaciones encontradas"
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                )
            },
            content: {
                data: (sectionData.show) ?
                    <CardList
                        displayList="box-padding medium-left-padding nav-list"
                        elems={reservations} />
                    :
                    ""
            },
            container: {
                class: elC
            }
        }
    }
};

function generateCardListForReservationObject(
    resObject,
    actions
) {
    return Object.keys(resObject).map(
        (e, i) => {
            let hora = new Date(parseInt(e)),
                reservaciones = generateCardsForReservationArray(resObject[e], actions);
            const [hr, mn] = [e.substr(0, e.length / 2), e.substr(e.length / 2, e.length-1)];
            return {
                title: {
                    data: (
                        <div className="full-width container">
                            <div className="row">
                                <div className="col-md-1 no-padding">
                                    <span className="side-margin bold light-danger">{hr+':'+mn}</span>
                                </div>
                                <div className="col-md-11 no-padding">
                                    <CardList
                                        displayList="nav-list"
                                        elems={reservaciones} />
                                </div>
                            </div>
                        </div>
                    ),
                    class: ""
                },
                content: {},
                container: {
                    class: "box-padding"
                }
            };
        }
    )
}

function generateCardsForReservationArray(
    hourReservations,
    actions
) {
    return hourReservations.map(
        (e, i) => {
            let acciones = GenerateActions.reservas(
                    e,
                    actions,
                    e.hora_reserva,
                    'day',
                    e.estado
                ),
                classByState = CLASSBYSTATE[e.estado],
                classByIndex = {
                    0: "box-padding no-top-padding border-bottom"
                };
            classByIndex[hourReservations.length - 1] = hourReservations.length - 1 === 0 ?
                "box-padding no-top-padding"
                : "box-padding";
            return {
                title: {
                    data: (
                        <div>
                            <div className="full-width">
                                <div className="inline-block half">
                                    <span className="side-margin">{e.nombre}</span>
                                    <span className="side-margin">{e.apellido}</span>
                                    <span className="side-margin">
                                        <span className="side-margin light-danger">
                                            tel.
                                            </span>
                                        <span className="side-margin">
                                            {e.telefono}
                                        </span>
                                    </span>
                                </div>
                                <div className="inline-block half text-right">
                                    <div className={classByState}>{e.estado}</div>
                                </div>
                            </div>
                            <div className="full-width text-right">
                                {acciones}
                            </div>
                        </div>
                    ),
                    class: ""
                },
                content: {},
                container: {
                    class: classByIndex[i] ?
                        classByIndex[i] : "box-padding border-bottom"
                }
            };
        }
    )
};