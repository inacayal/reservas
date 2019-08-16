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

export const FeriadoMonthByState = {
    data: {
        laboral: (
            titleClass,
            acciones,
            date,
            container
        ) => ({
            title: {
                data: date.getDate(),
                class: titleClass,
            },
            content: {
                data: (
                    <>{acciones}</>
                )
            },
            container: {
                class: container
            }
        }),
        no_laboral: (
            titleClass,
            acciones,
            date,
            container
        ) => ({
            title: {
                data: date.getDate(),
                class: titleClass
            },
            content: {
                data: (
                    <div className="flex-row">{acciones}</div>
                )
            },
            container: {
                class: container
            }
        })
    },
    no_data: (
        date,
        isSameMonth
    ) => ({
        title: {
            data: date.getDate(),
            class: "content c-title"
        },
        content: {},
        container: {
            class: isSameMonth ? 
                "background-border same-width text-center box-padding fix-height"
                : "same-width text-center box-padding fix-height"
        }
    }),
}

export const FeriadoWeekByState = {
    laboral:(
        todayCond,
        date,
        acciones,
        sectionData
    )=>
        ({
            title: {
                data: (
                    <div className="full-width">
                        <div className="inline-block half">
                            <span className="line-v-middle inline-block v-align-center">{DAYS[date.getDay()] + " "}</span>
                            <span className={todayCond ? "margin-box inline-block v-align-center highlight-title c-title" : " margin-box inline-block v-align-center light-danger c-title"}>{date.getDate() + " "}</span>
                            <span className="line-v-middle inline-block v-align-center ">{MONTHS[date.getMonth()]}</span>
                            {acciones}
                        </div>
                        <div className="inline-block half text-right">
                            <div className="side-margin inline-block smaller-text">
                                Día laboral
                            </div>
                        </div>
                    </div>
                )
            },
            content: {
                data: (
                    <div className="box-padding full-width">
                        <div className="half inline-block">
                            <div>
                                <span className="light-danger">Horario de reservas:</span>
                                <span>{" " + sectionData.reserva.apertura + "-" + sectionData.reserva.cierre}</span>
                            </div>
                            <div>
                                <span className="light-danger">Horario de atencion:</span>
                                <span>{" " + sectionData.atencion.apertura + "-" + sectionData.atencion.cierre}</span>
                            </div>
                        </div>
                        <div className="half inline-block">
                            <span className="light-danger">Descripción:</span>
                            <span>{" " + sectionData.descripcion}</span>
                        </div>
                    </div>
                )
            },
            container: {
                class: "box-padding  box-transparent full-width"
            }
        }),
    no_laboral: (
        todayCond,
        date,
        acciones,
        sectionData
    ) => 
        ({
            title: {
                data: (
                    <div className="full-width">
                        <div className="inline-block half">
                            <span className="line-v-middle inline-block v-align-center">{DAYS[date.getDay()] + " "}</span>
                            <span className={todayCond ? "margin-box inline-block v-align-center highlight-title c-title" : " margin-box inline-block v-align-center light-danger c-title"}>{date.getDate() + " "}</span>
                            <span className="line-v-middle inline-block v-align-center ">{MONTHS[date.getMonth()]}</span>
                            <div className="inline-block side-margin">
                                {acciones}
                            </div>
                        </div>
                        <div className="inline-block half text-right">
                            <div className="side-margin inline-block smaller-text">
                                Día no laboral
                            </div>
                        </div>
                    </div>
                )
            },
            content: {
                data: (
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
            },
            container: {
                class: "box-padding  full-width background-border"
            }
        }),
    no_data: (
        todayCond,
        date,
        acciones,
        sectionData
    ) => 
        ({
            title:{
                data:(
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
                )
            },
            content:{
                data:""
            },
            container:{
                class: "box-padding box-transparent full-width"
            }
        })
}
