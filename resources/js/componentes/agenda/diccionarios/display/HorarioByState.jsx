/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import CardList from '../../../basic/CardList';
import DynamicList from './DynamicList';
import {Link} from 'react-router-dom';
/**
 * constantes
 */
import { DAYS, MONTHS } from '../../../../constantes/DaysMonths';
import { CLASSBYSTATE } from '../../../../constantes/CardObject';


export const HorarioWeekByState = {
    laboral: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) =>{
        const eventos = Object.values(sectionData.eventos.data);  
        return {
            title: {
                data: (
                    <div className="full-width box-padding" >
                        <div className="seventy inline-block sub-title">
                            <div className="inline-block side-margin text-top bold">
                                <Link to ={'/horarios/' + dataIndex} className="text bold subrayado">{DAYS[sectionData.diaSemana - 1]}</Link>
                            </div>
                            <div className="inline-block side-margin">
                                {renderActions}
                            </div>
                        </div>
                        <div className="thirty inline-block text-right smaller-text border-bottom">
                            Día laboral
                        </div>
                    </div >
                )
            },  
            content: {
                data: (
                    <div className="container">
                        <div className="row box-padding">
                            <div className="col-md-4" >
                                <div className="light-danger bold">Horarios:</div>
                                <div style={{ padding: "0px 0px 0px 10px" }}>
                                    <div className="bold">Reservas:</div>
                                    <div>{sectionData.apertura.reserva.hora + ":" + sectionData.apertura.reserva.minuto + "hs. - " + sectionData.cierre.reserva.hora + ":" + sectionData.cierre.reserva.minuto + "hs."}</div>
                                    <div className="bold">Atención:</div>
                                    <div>{sectionData.apertura.atencion.hora + ":" + sectionData.apertura.atencion.minuto + "hs. - " + sectionData.cierre.atencion.hora + ":" + sectionData.cierre.atencion.minuto + "hs."}</div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="full-width">
                                    <div className="light-danger inline-block half bold">
                                        Eventos
                                    </div>
                                    <div className="smaller-text inline-block half text-right">
                                        {eventos.length + " encontrados"}
                                    </div>
                                </div>
                                <div className="v-padding ">
                                    {
                                        eventos.length>0
                                        ?
                                            <DynamicList data = {eventos} max={1}/>
                                        :
                                            "No hay eventos que mostrar."
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
            container: {
                class: null
            }
        };
    },
    no_laboral: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) => 
        ({
            title: {
                data:(
                    <div className="full-width box-padding">
                        <div className="seventy inline-block sub-title">
                            <div className="bold inline-block side-margin text-top">
                                {DAYS[sectionData.diaSemana-1]}
                            </div>
                            <div className="inline-block side-margin">
                                {renderActions}
                            </div>
                        </div>
                        <div className="thirty inline-block text-right smaller-text border-bottom ">
                            Día no laboral
                        </div>
                    </div>
                )
            },
            content: {
                data:(
                    <div className="full-width ">
                        <div className="half box-padding inline-block">
                            <div className="light-danger bold">Sin apertura</div>
                        </div>
                        <div className="half box-padding inline-block">
                            <span className="light-danger bold">Descripción</span>
                            <span>{" " + sectionData.descripcion}</span>
                        </div>
                    </div>
                )
            },
            container: {
                class: "box-padding background-border"
            },
        }),
    no_data: (
        data,
        sectionData,
        acciones
    ) =>
        ({
            title: {
                data:(
                    <div className="full-width  v-padding">
                        <div className="seventy sub-title inline-block ">
                            <div className="inline-block side-margin bold">
                                {DAYS[data-1]}
                            </div>
                            <div className="inline-block side-margin">
                                {acciones}
                            </div>
                        </div>
                        <div className="thirty text-right inline-block smaller-text border-bottom">
                            Aun no has asignado un horario de reservas
                        </div>
                    </div>
                )
            },
            content: {
                data: (
                    <div className="full-width ">
                        <div className="half box-padding inline-block">
                            <div className="light-danger bold">Sin horario</div>
                        </div>
                        <div className="half box-padding inline-block">
                            <span className="light-danger bold">Sin descripción</span>
                        </div>
                    </div>
                )
            },
            container: {
                class: "box-padding"
            }
        })
};
