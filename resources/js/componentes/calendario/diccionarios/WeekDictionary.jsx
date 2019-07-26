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
 * funciones
 */
import { assignActionsByStatus } from '../../../funciones/generateActions';
/**
 * constantes
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';
import { CLASSBYSTATE } from '../../../constantes/CardObject';

const assignWeekElementType = {
    horarios: (
        acciones,
        sectionData,
        data,
        actions,
        show
    ) => {
        let elemClass = sectionData ?
            sectionData.estado === "1" ?
                "box-padding"
                : "box-padding background-border"
            : "box-padding"
        if (data !== 6)
            elemClass += " border-bottom";
        return {
            title: {
                data: sectionData ?
                    sectionData.estado === "1" ? (
                        <div className="full-width box-padding">
                            <div className="half inline-block  sub-title">
                                <div className="inline-block side-margin">
                                    {DAYS[data]}
                                </div>
                                <div className="inline-block side-margin">
                                    <ButtonList
                                        displayList="flex-row nav-list no-padding h-end"
                                        container="side-margin"
                                        elemClass="box-transparent highlight-hover full-width border-box button-border"
                                        elems={acciones} />
                                </div>
                            </div>
                            <div className="half inline-block text-right smaller-text">
                                Día laboral regular
                                </div>
                        </div>
                    ) : (
                            <div className="full-width box-padding">
                                <div className="half inline-block sub-title">
                                    <div className="inline-block side-margin">
                                        {DAYS[data]}
                                    </div>
                                    <div className="inline-block side-margin">
                                        <ButtonList
                                            displayList="flex-row nav-list no-padding h-end"
                                            container="side-margin"
                                            elemClass="box-transparent highlight-hover full-width border-box button-border"
                                            elems={acciones} />
                                    </div>
                                </div>
                                <div className="half inline-block text-right smaller-text">
                                    Día no laboral
                            </div>
                            </div>
                        ) : (
                        <div className="full-width  box-padding">
                            <div className="half sub-title inline-block ">
                                <div className="inline-block side-margin">
                                    {DAYS[data]}
                                </div>
                                <div className="inline-block side-margin">
                                    <ButtonList
                                        displayList="flex-row nav-list no-padding h-end"
                                        container="side-margin"
                                        elemClass="box-transparent highlight-hover full-width border-box button-border"
                                        elems={acciones} />
                                </div>
                            </div>
                            <div className="half text-right inline-block smaller-text">
                                Aun no has asignado un horario de reservas
                            </div>
                        </div>
                    )
            },
            content: {
                data: sectionData ?
                    sectionData.estado === "1" ?
                        <div className="full-width">
                            <div className="half box-padding inline-block">
                                <span className="light-danger">Horario de Reservas:</span>
                                <span>{" " + sectionData.apertura + "-" + sectionData.cierre}</span>
                            </div>
                            <div className="half box-padding inline-block">
                                <span className="light-danger">Descripción:</span>
                                <span>{" " + sectionData.descripcion}</span>
                            </div>
                        </div>
                        :
                        <div className="full-width ">
                            <div className="half box-padding inline-block">
                                <div className="light-danger">Sin apertura</div>
                            </div>
                            <div className="half box-padding inline-block">
                                <span className="light-danger">Descripción:</span>
                                <span>{" " + sectionData.descripcion}</span>
                            </div>
                        </div>
                    : ""
            },
            container: {
                class: elemClass
            }
        };
    },
    reservas: (
        acciones,
        sectionData,
        data,
        actions,
        show
    ) => {
        let dt = new Date(data),
            tdy = new Date(),
            tcnd = tdy.getDate() === dt.getDate() && tdy.getMonth() === dt.getMonth() && tdy.getFullYear() === dt.getFullYear(),
            reservations = sectionData ?
                generateCardListForReservationObject(
                    sectionData.reservas,
                    actions.inner
                ) : [],
            elC = dt.getDay() !== 6 ?
                "box-padding margin-box box-transparent full-width border-bottom" :
                "box-padding margin-box box-transparent full-width";
        if (data === 6)
            elemClass += " border-bottom";

        return {
            title: {
                data: !sectionData ? (
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
                ) : (
                        <div className="container no-padding">
                            <div className="row">
                                <div className="col-md-8 no-padding">
                                    <span className="line-v-middle inline-block v-align-center">{DAYS[dt.getDay()] + " "}</span>
                                    <span className={tcnd ? "margin-box inline-block v-align-center highlight-title c-title" : " margin-box inline-block v-align-center light-danger c-title"}>{dt.getDate() + " "}</span>
                                    <span className="line-v-middle inline-block v-align-center ">{MONTHS[dt.getMonth()]}</span>
                                    <div className="inline-block margin-box">
                                        <ButtonList
                                            displayList={sectionData.show ? "flex-row nav-list no-padding h-end more" : "flex-row nav-list no-padding h-end less"}
                                            container="side-margin"
                                            elemClass="box-transparent highlight-hover full-width text-right button-border border-box"
                                            elems={acciones} />
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
                data: (sectionData) ?
                    (sectionData.show) ?
                        <CardList
                            displayList="box-padding medium-left-padding nav-list"
                            elems={reservations} />
                        :
                        <CardList
                            displayList="box-padding extra-left-padding hidden"
                            elems={reservations} />
                    : "",
            },
            container: {
                class: elC
            }
        };
    },
    feriados: (
        acciones,
        sectionData,
        data,
        actions,
        show
    ) => {
        let date = new Date(data),
            today = new Date(),
            todayCond = today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear(),
            eleC = sectionData ?
                sectionData.estado === 1 ?
                    "box-padding  box-transparent full-width"
                    : "box-padding  full-width background-border"
                : "box-padding box-transparent full-width"
        if (date.getDay() !== 6)
            eleC += " border-bottom";
        return {
            title: {
                data: (acciones.length === 1) ? (
                    <div className="full-width">
                        <div className="inline-block half">
                            <span className="line-v-middle inline-block v-align-center">{DAYS[date.getDay()] + " "}</span>
                            <span className={todayCond ? "margin-box inline-block v-align-center highlight-title c-title" : " margin-box inline-block v-align-center light-danger c-title"}>{date.getDate() + " "}</span>
                            <span className="line-v-middle inline-block v-align-center ">{MONTHS[date.getMonth()]}</span>
                        </div>
                        <div className="inline-block half text-right smaller-text">
                            No has designado un horario especial para este día
                            </div>
                    </div>
                ) : (
                        <div className="full-width">
                            <div className="inline-block half">
                                <span className="line-v-middle inline-block v-align-center">{DAYS[date.getDay()] + " "}</span>
                                <span className={todayCond ? "margin-box inline-block v-align-center highlight-title c-title" : " margin-box inline-block v-align-center light-danger c-title"}>{date.getDate() + " "}</span>
                                <span className="line-v-middle inline-block v-align-center ">{MONTHS[date.getMonth()]}</span>
                                <div className="inline-block side-margin">
                                    <ButtonList
                                        displayList="flex-row nav-list no-padding h-end"
                                        container="side-margin"
                                        elemClass="box-transparent highlight-hover full-width button-border border-box"
                                        elems={acciones} />
                                </div>
                            </div>
                            <div className="inline-block half text-right">
                                <div className="side-margin inline-block smaller-text">
                                    {
                                        sectionData.estado === 1 ?
                                            "Día laboral"
                                            : "Día no laboral"
                                    }
                                </div>
                            </div>
                        </div>
                    )
            },
            content: {
                data: sectionData ? (
                    (sectionData.estado === 1) ? (
                        <div className="box-padding full-width">
                            <div className="half inline-block">
                                <span className="light-danger">Horario de reservas:</span>
                                <span>{" " + sectionData.apertura + "-" + sectionData.cierre}</span>
                            </div>
                            <div className="half inline-block">
                                <span className="light-danger">Descripción:</span>
                                <span>{" " + sectionData.descripcion}</span>
                            </div>
                        </div>
                    ) : (
                            <div className="full-width box-padding">
                                <div className="half box-padding inline-block">
                                    <div className="light-danger">Sin apertura</div>
                                </div>
                                <div className="half box-padding inline-block">
                                    <span className="light-danger">Descripción:</span>
                                    <span>{" " + sectionData.descripcion}</span>
                                </div>
                            </div>
                        )
                ) : ""
            },
            container: {
                class: eleC
            }
        };
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
            return {
                title: {
                    data: (
                        <div className="full-width container">
                            <div className="row">
                                <div className="col-md-1 no-padding">
                                    <span className="side-margin bold light-danger">{hora.getHours() + ":" + (hora.getMinutes() < 10 ? "0" + hora.getMinutes() : hora.getMinutes())}</span>
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
            let acciones = assignActionsByStatus(e.estado, actions, e.id),
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
                                <ButtonList
                                    displayList="flex-row nav-list no-padding h-end"
                                    container="side-margin"
                                    elemClass="box-transparent highlight-hover full-width text-right border-box-no-padding button-border"
                                    elems={acciones} />
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
export default assignWeekElementType;