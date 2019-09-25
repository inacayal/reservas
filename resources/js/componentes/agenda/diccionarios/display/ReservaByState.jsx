/**
 * react basic
 */
import React, { Component, useState } from 'react';
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
        data,
        actions,
        dataStr
    ) => {
        const reservations = generateDayCardFromArray(
            data,
            actions,
            dataStr
        );
        return {
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
                class: "box-padding"
            },
            content: {},
            container: {
                class: "padding-box"
            }
        };
    },
    no_data: (
        display,
        data,
        actions,
        dataStr
    ) => ({
        title: {
            data: (
                <div>
                    <div className="inline-block half">
                        <div className="line-v-middle light-danger bold side-margin inline-block">{display}</div>
                    </div>
                    <div className="inline-block half smaller-text text-right border-bottom">
                        Sin reservas
                    </div>
                </div>
            ),
            class: "box-padding"
        },
        content: {},
        container: {
            class: "box-padding"
        }
    })
};

export const ReservaMonthByState = {
    data: (
        renderActions,
        sectionData,
        date,
        isThisMonth
    ) => ({
        title: {
            data: (
                <>
                    <div className="c-title light-danger">{date.getDate()}</div>
                    <i className="text-top fas fa-ellipsis-h highlight-title" style={{ marginTop: "-8px" }} />
                </>
            )
        },
        content: {
            data: (
                <>{renderActions}</>
            )
        },
        container: {
            class: "same-width text-center box-padding light-danger fix-heigh relative black-overlay"
        }
    }),
    no_data: (
        renderActions,
        sectionData,
        date,
        isThisMonth
    ) => ({
        title: {
            data: date.getDate(),
            class: "content c-title"
        },
        content: {},
        container: {
            class: isThisMonth ? "same-width text-center box-padding fix-height" : "background-border same-width text-center box-padding fix-height"
        }
    })
};

export const ReservaWeekByState = {
    no_data:(
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) => ({
        title: {
            data: (
                <div className="container ">
                    <div className="row">
                        <div className="col-md-8 no-padding">
                            <span className="margin-box inline-block v-align-center light-danger c-title">
                                {dataIndex.getDate() + " "}
                            </span>
                            <span className="line-v-middle inline-block v-align-center bold">{DAYS[dataIndex.getDay()] + " "}</span>
                        </div>
                        <div className="col-md-4  text-right border-bottom">
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
            class:"box-padding"
        }
    }),
    data: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) => {
        const reservations = generateCardListForReservationObject(
            sectionData.reservas,
            originalActions.inner
            ),
            show = false;
        //console.log(dataIndex);
        return {
            title: {
                data: (
                    <div className="container ">
                        <div className="row">
                            <div className="col-md-8 no-padding">
                                <span className=" margin-box inline-block v-align-center light-danger c-title">
                                    {dataIndex.getDate() + " "}
                                </span>
                                <span className="bold line-v-middle inline-block v-align-center">{DAYS[dataIndex.getDay()] + " "}</span>
                                <div className="inline-block margin-box">
                                    {renderActions}
                                </div>
                            </div>
                            <div className="col-md-4 text-right border-bottom">
                                <span className="line-v-middle smaller-text inline-block negative-margin">
                                    {
                                        show ?
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
                data: (show) ?
                    <CardList
                        displayList="box-padding medium-left-padding nav-list"
                        elems={reservations} />
                    :
                    ""
            },
            container: {
                class:"box-padding"
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