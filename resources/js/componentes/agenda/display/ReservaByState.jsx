/**
 * react basic
 */
import React, { Component, useState } from 'react';
import {Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import {CardList} from '../../basic/CardList';
import ButtonList from '../../basic/ButtonList';
/**
 * funciones
 */
import {GenerateActions} from '../../../acciones/GenerateActions';
/**
 * constantes
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';
import { CLASSBYSTATE } from '../../../constantes/CardObject';

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
        content: (
            <>
                <div className="c-title light-danger">{date.getDate()}</div>
                <i className="text-top fas fa-ellipsis-h highlight-title" style={{ marginTop: "-8px" }} />
                <div>{renderActions}</div>
            </>
        ),
        class: "same-width text-center box-padding light-danger relative black-overlay"
    }),
    no_data: (
        renderActions,
        sectionData,
        date,
        isThisMonth
    ) => ({
        content:(
            <div className="content c-title">
                {date.getDate()}
            </div>
        ),
        class: isThisMonth 
            ? "same-width text-center box-padding fix-height" 
            : "background-border same-width text-center box-padding fix-height"
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
        content:() => 
            <>
                <div className="v-align-center light-danger c-title">
                    {dataIndex.getDate() + " "}
                </div>
                <div className="line-v-middle inline-block v-align-center">{DAYS[dataIndex.getDay()] + " "}</div>
            </>,
            class: "box-padding text-center same-width highlight-hover pointer",
            data: dataIndex.getDate()
    }),
    data: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) => {
        const reservations = generateCardListForReservationObject(
            sectionData,
            originalActions.inner
        );
        return {
            content:() => (
                <>
                    <div className="v-align-center light-danger c-title">
                        {dataIndex.getDate() + " "}
                    </div>
                    <div className="line-v-middle inline-block v-align-center">{DAYS[dataIndex.getDay()] + " "}</div>
                </>
            ),
            class: "box-padding same-width text-center highlight-hover pointer",
            data:dataIndex.getDate()
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
            const 
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
                                <div className="inline-block ninety">
                                    <span className="side-margin bold">{e.nombre + " " + e.apellido}</span>
                                    <span className="side-margin light-danger">
                                        {e.telefono}
                                    </span>
                                    <span className="side-margin">
                                        {e.email}
                                    </span>
                                </div>
                                <div className="inline-block ten text-right">
                                    <div className={classByState}>{e.estado}</div>
                                </div>
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

function generateDayCardFromArray(
    data,
    actions,
    dataStr
) {
    let obj = {};
    return data.map(
        (e, i) => {
            let acciones = GenerateActions.reservas(
                e,
                actions,
                e.id,
                'day'
            );
            return {
                title: {
                    data: (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-11 no-padding">
                                    <Link to={'reservas/'+e.id}>
                                        <span className="side-margin sub-title text bold subrayado inline-block">{e.nombre + " " + e.apellido}</span>
                                    </Link>
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
                    class: ""
                }
            };
        }
    );
};