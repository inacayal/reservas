/**
 * react basic
 */
import React, { Component, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import CardList from '../../basic/CardList';
import {CommaList} from '../../basic/CommaList';
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';
import { CLASSBYSTATE } from '../../../constantes/CardObject';
import CustomLink from '../../basic/CustomLink';


export const HorarioWeekByState = {
    laboral: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) =>{
        const eventos = sectionData.eventos.list,
            eventoLength = Object.keys(eventos).length,
            linkParam={
                to:`/horarios/${dataIndex}`,
                params:{id:dataIndex},
                route:'horarios'
            };
        return {
            content: () =>
                <>
                    <div className="full-width" >
                        <div className="inline-block side-margin text-top">
                            <CustomLink params={linkParam}>
                                <span className="mid-title subrayado" style={{color:'var(--light-danger)'}}>
                                    {DAYS[sectionData.diaSemana - 1]}
                                </span>
                            </CustomLink>
                            {renderActions}
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-end bold m-font">
                            Día laboral
                        </div>
                        <div className="row h-padding">
                            <div className="col-md-6 container">
                                <div className="row m-font">
                                    Horarios de atención
                                </div>
                                <div className="row">
                                    <div className="col-md-6 no-padding">
                                        <div className="bold">
                                            Reservas
                                        </div>
                                        <div>
                                            {`${sectionData.apertura.reserva.hora}:${sectionData.apertura.reserva.minuto} horas - ${sectionData.cierre.reserva.hora}:${sectionData.cierre.reserva.minuto} horas`}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="bold">
                                            Atención
                                        </div>
                                        <div>{`${sectionData.apertura.atencion.hora}:${sectionData.apertura.atencion.minuto} horas - ${sectionData.cierre.atencion.hora}:${sectionData.cierre.atencion.minuto} horas`}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="inline-block m-font">
                                    {`${eventoLength} Eventos encontrados`}
                                </div>
                                <div className="v-padding ">
                                    {
                                        eventoLength > 0
                                        ?
                                            <ul className="no-padding nav-list"><CommaList list={eventos} endpoint='/eventos' /></ul>
                                        :
                                            "No hay eventos que mostrar."
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>,
            class: null
        };
    },
    no_laboral: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) =>
        {
            const linkParam = {
                to:`/horarios/${dataIndex}`,
                params:{id:dataIndex},
                route:'horarios'
            };
            return {
                content: () => {
                    return (
                        <>
                            <div className="full-width box-padding">
                                <div className="seventy inline-block sub-title">
                                    <div className="bold inline-block side-margin text-top">
                                        <CustomLink params={linkParam}>
                                            <span className="text bold subrayado">
                                                {DAYS[sectionData.diaSemana - 1]}
                                            </span>
                                        </CustomLink>
                                        {renderActions}
                                    </div>
                                </div>
                                <div className="thirty inline-block text-right smaller-text border-bottom ">
                                    Día no laboral
                                </div>
                            </div>
                            <div className="full-width ">
                                <div className="half box-padding inline-block">
                                    <div className="light-danger bold">Sin apertura</div>
                                </div>
                                <div className="half box-padding inline-block">
                                    <span className="light-danger bold">Descripción</span>
                                    <span>{" " + sectionData.descripcion}</span>
                                </div>
                            </div>
                        </>
                    )
                },
                class: "box-padding background-border"
            }
        },
    no_data: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) =>
        ({
            content: () =>
                <>
                    <div className="full-width  v-padding">
                        <div className="seventy sub-title inline-block ">
                            <div className="inline-block side-margin bold">
                                {DAYS[dataIndex - 1]}
                            </div>
                            <div className="inline-block side-margin">
                                {renderActions}
                            </div>
                        </div>
                        <div className="thirty text-right inline-block smaller-text border-bottom">
                            Aun no has asignado un horario de reservas
                            </div>
                    </div>
                    <div className="full-width ">
                        <div className="half box-padding inline-block">
                            <div className="light-danger bold">Sin horario</div>
                        </div>
                        <div className="half box-padding inline-block">
                            <span className="light-danger bold">Sin descripción</span>
                        </div>
                    </div>
                </>,
            class: "box-padding background-border"
        })
};
