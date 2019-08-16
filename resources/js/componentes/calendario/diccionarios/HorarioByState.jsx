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

export const HorarioByState = {
    laboral: (
        data,
        sectionData,
        acciones
    ) =>
        ({
            title: {
                data:(
                    <div className="full-width box-padding" >
                        <div className="seventy inline-block  sub-title">
                            <div className="inline-block side-margin text-top">
                                {DAYS[data]}
                            </div>
                            <div className="inline-block side-margin">
                                {acciones}
                            </div>
                        </div>
                        <div className="thirty inline-block text-right smaller-text">
                            Día laboral regular
                        </div>
                    </div >
                )
            },
            content: {
                data:(
                    <div className="full-width">
                        <div className="half box-padding inline-block">
                            <div>
                                <span className="light-danger">Horario de Reservas:</span>
                                <span>{" " + sectionData.reserva.apertura + "-" + sectionData.reserva.cierre}</span>
                            </div>
                            <div>
                                <span className="light-danger">Horario de Atención:</span>
                                <span>{" " + sectionData.atencion.apertura + "-" + sectionData.atencion.cierre}</span>
                            </div>
                        </div>
                        <div className="half box-padding inline-block">
                            <span className="light-danger">Descripción:</span>
                            <span>{" " + sectionData.descripcion}</span>
                        </div>
                    </div>
                )
            },
            container: {
                class: "box-padding"
            }
        }),
    no_laboral: (
        data,
        sectionData,
        acciones
    ) => 
        ({
            title: {
                data:(
                    <div className="full-width box-padding">
                        <div className="seventy inline-block sub-title">
                            <div className="inline-block side-margin text-top">
                                {DAYS[data]}
                            </div>
                            <div className="inline-block side-margin">
                                {acciones}
                            </div>
                        </div>
                        <div className="thirty inline-block text-right smaller-text">
                            Día no laboral
                        </div>
                    </div>
                )
            },
            content: {
                data:(
                    <div className="full-width ">
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
                    <div className="full-width  box-padding">
                        <div className="seventy sub-title inline-block ">
                            <div className="inline-block side-margin">
                                {DAYS[data]}
                            </div>
                            <div className="inline-block side-margin">
                                {acciones}
                            </div>
                        </div>
                        <div className="thirty text-right inline-block smaller-text">
                            Aun no has asignado un horario de reservas
                        </div>
                    </div>
                )
            },
            content: {
                data: (
                    <></>
                )
            },
            container: {
                class: "box-padding"
            }
        })
};
