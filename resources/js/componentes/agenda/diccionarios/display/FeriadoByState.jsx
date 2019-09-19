/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
/**
 * componentes
 */
import CardList from '../../../basic/CardList';
import ButtonList from '../../../basic/ButtonList';
import DynamicList from './DynamicList';
/**
 * constantes
 */
import { DAYS, MONTHS } from '../../../../constantes/DaysMonths';
import { CLASSBYSTATE } from '../../../../constantes/CardObject';

export const FeriadoMonthByState = {
    data: {
        laboral: (
            classes,
            acciones,
            date
        ) => ({
            title: {
                data: (
                    <>
                        <div className="c-title">{date.getDate()}</div>
                        <i className="text-top fas fa-ellipsis-h highlight-title" style={{ marginTop: "-8px" }}  />
                    </>
                ),
                class: classes.title,
            },
            content: {
                data: (
                    <>{acciones}</>
                )
            },
            container: {
                class: classes.container + " black-overlay"
            }
        }),
        no_laboral: (
            classes,
            acciones,
            date
        ) => ({
            title: {
                data: (
                    <>
                        <div className="c-title">{date.getDate()}</div>
                        <i className="text-top fas fa-ellipsis-h highlight-title" style={{marginTop:"-8px"}} />
                    </>
                ),
                class: classes.title
            },
            content: {
                data: (
                    <div className="flex-row">{acciones}</div>
                )
            },
            container: {
                class: classes.container+" black-overlay"
            }
        })
    },
    no_data: (
        date,
        isThisMonth
    ) => {
        return {
            title: {
                data: date.getDate(),
                class: "content c-title"
            },
            content: {},
            container: {
                class: isThisMonth 
                    ? "same-width text-center box-padding fix-height"
                    : "background-border same-width text-center box-padding fix-height"
            }
        }
    },
}

export const FeriadoWeekByState = {
    laboral:(
        todayCond,
        date,
        acciones,
        sectionData
    )=>
        {
            const eventos = Object.values(sectionData.eventos.data);
            return {
            title: {
                data: (
                    <div className="container no-padding">
                        <div className="row">
                            <div className="col-md-9">
                                <Link to={'horarios/feriados/'+sectionData.id}>
                                    <span className={todayCond ? "subrayado margin-box inline-block v-align-center highlight-title c-title" : "subrayado margin-box inline-block v-align-center light-danger c-title"}>{date.getDate() + " "}</span>
                                    <span className="text subrayado bold line-v-middle inline-block v-align-center">{DAYS[date.getDay()] + " "}</span>
                                    {acciones}
                                </Link>
                            </div>
                            <div className="col-md-3 border-bottom no-padding">
                                <p className="smaller-text no-margin text-right">{sectionData.nombre}</p>
                            </div>
                        </div>
                    </div>
                )
            },
            content: {
                data: (
                    <div className="box-padding container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="light-danger bold">Horarios</div>
                                            <div style={{paddingLeft:"10px"}}>
                                                <div className="bold">Reservas:</div>
                                                <div>{sectionData.apertura.reserva.hora + ":" + sectionData.apertura.reserva.minuto + "hs. - " + sectionData.cierre.reserva.hora + ":" + sectionData.apertura.reserva.minuto + "hs."}</div>
                                                <div className="bold">Atencion:</div>
                                                <div>{sectionData.apertura.atencion.hora + ":" + sectionData.apertura.atencion.minuto + "hs. - " + sectionData.cierre.atencion.hora + ":" + sectionData.cierre.atencion.minuto + "hs."}</div>
                                            </div> 
                                        </div>
                                        <div className="col-md-6">
                                            <div className="light-danger bold">Descripción:</div>
                                            <div>{sectionData.descripcion.substring(0, 30) + "..."}</div>
                                            <div className="border-top small-v-padding"/>
                                            <div className="smaller-text">mostrando sólo los primeros 30 caracteres</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="light-danger bold">Eventos</div>
                                {
                                    eventos.length > 0
                                        ?
                                        <DynamicList data={eventos} max={1} />
                                        :
                                        "No hay eventos que mostrar."
                                }
                            </div>
                        </div>
                    </div>
                )
            },
            container: {
                class: "box-padding  box-transparent full-width relative"
            }
        }
    },
    no_laboral: (
        todayCond,
        date,
        acciones,
        sectionData
    ) => 
        ({
            title: {
                data: (
                    <div className="container no-padding">
                        <div className="row">
                            <div className="col-md-9">
                                <Link to={'horarios/feriados/'} params={{id:sectionData.id}}>
                                    <span className={todayCond ? "subrayado margin-box inline-block v-align-center highlight-title c-title" : "subrayado margin-box inline-block v-align-center light-danger c-title"}>{date.getDate() + " "}</span>
                                    <span className="text subrayado bold line-v-middle inline-block v-align-center">{DAYS[date.getDay()] + " "}</span>
                                    {acciones}
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <p className="smaller-text no-margin text-right">{sectionData.nombre}</p>
                            </div>
                        </div>
                    </div>
                )
            },
            content: {
                data: (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 light-danger bold">
                                Sin apertura
                            </div>
                            <div className="col-md-6 ">
                                <div className="light-danger bold">Descripción:</div>
                                <div>{sectionData.descripcion.substring(0, 30) + "..."}</div>
                                <div className="border-top small-v-padding" />
                                <div className="smaller-text">mostrando sólo los primeros 30 caracteres</div>
                            </div>
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
                    <div className="container no-padding">
                        <div className="row">
                            <div className="col-md-8 bold">
                                <span className={todayCond ? "margin-box inline-block v-align-center highlight-title c-title" : " margin-box inline-block v-align-center light-danger c-title"}>{date.getDate() + " "}</span>
                                <span className="line-v-middle inline-block v-align-center bold">{DAYS[date.getDay()] + " "}</span>
                            </div>
                            <div className="col-md-4 border-bottom text-right no-padding">
                                <p className="smaller-text no-margin">No has designado este día como feriado</p>
                            </div>
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
