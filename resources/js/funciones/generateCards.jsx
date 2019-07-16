import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CardList from '../componentes/complex/allUse/CardList';
import ButtonList from '../componentes/complex/allUse/ButtonList';
import { assignActionsByStatus } from './generateActions';
import { DAYS, MONTHS } from '../constantes/DaysMonths';
import { CLASSBYSTATE } from '../constantes/CardObject';

export function assignWeekElementType(
    acciones,
    type,
    sectionData,
    data,
    actions,
    show
) {
    switch (type) {
        case "horarios":
            return {
                title: {
                    data: sectionData ? 
                        sectionData.estado==="1" ? (
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
                    data: sectionData? 
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
                    class: sectionData ? 
                        sectionData.estado==="1" ? 
                            "box-padding border-bottom" 
                            : "box-padding border-bottom background-border" 
                        : "box-padding border-bottom"
                }
            };
            break;
        case "reservas":
            let dt = new Date(data),
                tdy = new Date(),
                tcnd = tdy.getDate() === dt.getDate() && tdy.getMonth() === dt.getMonth() && tdy.getFullYear() === dt.getFullYear(),
                reservations = sectionData ?
                    generateCardsForReservation(
                        sectionData.reservas,
                        actions.inner
                    ) : [];
            return {
                title: {
                    data: !sectionData ? (
                        <div className="full-width">
                            <div className="half inline-block">
                                <span className="line-v-middle inline-block v-align-center">{DAYS[dt.getDay()] + " "}</span>
                                <span className={tcnd ? "margin-box inline-block v-align-center highlight-title c-title" : " margin-box inline-block v-align-center light-danger c-title"}>{dt.getDate() + " "}</span>
                                <span className="line-v-middle inline-block v-align-center ">{MONTHS[tdy.getMonth()]}</span>
                            </div>
                            <div className="half text-right inline-block">
                                <span className="line-v-middle v-align-center smaller-text margin-box full-width">No hay reservaciones a mostrar</span>
                            </div>
                        </div>
                    ) : (
                            <div className="full-width">
                                <div className="inline-block half">
                                    <span className="line-v-middle inline-block v-align-center">{DAYS[dt.getDay()] + " "}</span>
                                    <span className={tcnd ? "margin-box inline-block v-align-center highlight-title c-title" : " margin-box inline-block v-align-center light-danger c-title"}>{dt.getDate() + " "}</span>
                                    <span className="line-v-middle inline-block v-align-center ">{MONTHS[tdy.getMonth()]}</span>
                                    <div className="inline-block margin-box">
                                        <ButtonList
                                            displayList={sectionData.show ? "flex-row nav-list no-padding h-end more" : "flex-row nav-list no-padding h-end less"}
                                            container="side-margin"
                                            elemClass="box-transparent highlight-hover full-width text-right button-border border-box"
                                            elems={acciones} />
                                    </div>
                                </div>
                                <div className="inline-block half text-right smaller-text">
                                    {
                                        sectionData.show ?
                                            "Mostrando " + sectionData.reservas.length + " reservaciones encontradas"
                                            : sectionData.reservas.length + " reservaciones encontradas"
                                    }
                                </div>
                            </div>
                        )
                },
                content: {
                    data: (sectionData) ?
                        (sectionData.show) ?
                            <CardList
                                displayList="box-padding extra-left-padding"
                                elems={reservations} />
                            :
                            <CardList
                                displayList="box-padding extra-left-padding hidden"
                                elems={reservations} />
                        : "",
                },
                container: {
                    class: "box-padding margin-box box-transparent full-width border-bottom"
                }
            };
            break;
        case "feriados":
            let date = new Date(data),
                today = new Date(),
                todayCond = today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear();
            return {
                title: {
                    data: (acciones.length === 1) ? (
                        <div className="full-width">
                            <div className="inline-block half">
                                <div className="inline-block">
                                    <span className="line-v-middle inline-block v-align-center">{DAYS[date.getDay()] + " "}</span>
                                    <span className={todayCond ? "margin-box inline-block v-align-center highlight-title c-title" : " margin-box inline-block v-align-center light-danger c-title"}>{date.getDate() + " "}</span>
                                    <span className="line-v-middle inline-block v-align-center ">{MONTHS[date.getMonth()]}</span>
                                </div>
                                <div className="inline-block  side-margin">
                                    <ButtonList
                                        displayList="flex-row nav-list no-padding h-end"
                                        container="side-margin"
                                        elemClass="box-transparent highlight-hover full-width button-border border-box"
                                        elems={acciones} />
                                </div>
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
                    class: sectionData ? 
                        sectionData.estado === 1 ? 
                            "box-padding box-transparent full-width border-bottom" 
                            : "box-padding full-width background-border border-bottom" 
                        : "box-padding box-transparent full-width border-bottom"
                }
            };
            break;
    }
}

export function assignMonthElementType(
    acciones,
    type,
    sectionData,
    data
) {
    let structure = {};
    switch (type) {
        case "reservas":
            let resDate = new Date(data),
                tday = new Date(),
                cond = tday.getDate() === resDate.getDate() && tday.getMonth() === resDate.getMonth() && tday.getFullYear() === resDate.getFullYear();
            resDate.setHours(0,0,0,0);
            structure = sectionData !== null ? {
                title: {
                    data: resDate.getDate(),
                    class: cond ?
                        "content c-title highlight-title text-center" :
                        "content c-title text-center",
                },
                content: {},
                container: {
                    data: data,
                    class: "same-width text-center box-padding highlight-hover pointer fix-height blue-highlight-hover",
                    click: acciones ? acciones[0].click : null
                }
            } : {
                    title: {
                        data: resDate.getDate(),
                        class: "content c-title"
                    },
                    content: {},
                    container: {
                        class: "background-border same-width text-center box-padding fix-height"
                    }
                };
            break;
        case "feriados":
            /**
             * actions: pass actions generated by generateActions functions
             * type: where is the function called from 
             * index: current index in data array
             * sectionData: data object from current object in loop
             */
            let date = new Date(data),
                today = new Date(),
                todayCond = today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear();
            structure = sectionData !== null ? {
                title: {
                    data: date.getDate(),
                    class: todayCond ?
                        "content c-title highlight-title text-center" :
                        "content c-title text-center light-danger",
                },
                content: {
                    data: <ButtonList
                        displayList="flex-row nav-list no-padding"
                        container="align-center"
                        elemClass="box-transparent highlight-hover full-width text-left side-margin button-border border-box"
                        elems={acciones} />
                },
                container: {
                    class: todayCond ?
                        "same-width text-center box-padding highlight-title" :
                        "same-width text-center box-padding light-danger"
                }
            } : {
                    title: {
                        data: date.getDate(),
                        class: "content c-title"
                    },
                    content: {},
                    container: {
                        class: "background-border same-width text-center box-padding"
                    }
                };
            break;
    }
    return structure;
}

function generateCardsForReservation(
    reservationArray,
    actions
) {
    return reservationArray.map(
        (e, i) => {
            let acciones = assignActionsByStatus(e.estado, actions, e.id),
                classByState = CLASSBYSTATE[e.estado];
            return {
                title: {
                    data: (
                        <div>
                            <div className="full-width">
                                <div className="inline-block half">
                                    <span className="side-margin bold light-danger">{e.hora}</span>
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
                    class: "box-padding"
                }
            };
        }
    )
}

export function generateDayCard(

){
    return {
        title: {
            data: (
                <div>
                    <div className="full-width">
                        <div className="inline-block half">
                            <span className="side-margin bold light-danger">{e.hora}</span>
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
            ),x 
        },
        content: {},
        container: {
            class: "box-padding"
        }
    }
}