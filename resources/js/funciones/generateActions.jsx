/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componmentes
 */
import Actions from '../componentes/basic/Actions';
/**
 * dictionaries
 */
import {FeriadosActions,HorariosActions} from './actionDictionaries';

export const assignActionsByStatus = {
    rechazado: (
        actions,
        data
    ) => [
        {
            title: (
                <div className="smaller-text text bold text-center">
                    <i className="fas fa-eye inline-box side-margin" />
                    Ver reserva
                </div>
            ),
            click: actions.ver,
            data: data
        },
        {
            title: (
                <div className="smaller-text text bold text-center">
                    <i className="fas fa-history inline-box side-margin" />
                    Revertir
                    </div>
            ),
            click: actions.revertir,
            data: data
        }
    ],
    pendiente: (
        actions,
        data
    ) => [
        {
            title: (
                <div className="smaller-text text bold text-center">
                    <i className="fas fa-eye inline-box side-margin" />
                    Ver reserva
                    </div>
            ),
            click: actions.ver,
            data: data
        },
        {
            title: (
                <div className="smaller-text text bold text-center">
                    <i className="fas fa-times-circle inline-box side-margin" />
                    Rechazar
                    </div>
            ),
            click: actions.rechazar,
            data: data
        },
        {
            title: (
                <div className="smaller-text text bold text-center">
                    <i className="fas fa-check-circle inline-box side-margin" />
                    Aprobar
                    </div>
            ),
            click: actions.aprobar,
            data: data
        }
    ],
    aprobado: (
        actions,
        data
    ) => [
        {
            title: (
                <div className="smaller-text text bold text-center">
                    <i className="fas fa-eye inline-box side-margin" />
                    Ver reserva
                    </div>
            ),
            click: actions.ver,
            data: data
        },
        {
            title: (
                <div className="smaller-text text bold text-center">
                    <i className="fas fa-history inline-box side-margin" />
                    Revertir
                </div>
            ),
            click: actions.revertir,
            data: data
        }
    ]
};

export const generateActions = {
    reservas: (
        hasEvents,
        actions,
        links,
        data,
        enableTitles,
        show
    ) => {
        if (!enableTitles) {
            return [{
                click: actions.ver,
                data: data
            }];
        } else {
            if (hasEvents) {
                if (!show) {
                    return [
                        {
                            title: (
                                <div className="smaller-text text bold text-center">
                                    <i className="fas fa-eye inline-box side-margin" />
                                    Ver reservaciones
                                </div>
                            ),
                            click: actions.ver,
                            data: data
                        },
                        {
                            title: (
                                <div className="smaller-text text bold text-center">
                                    <i className="fas fa-plus-circle  inline-box side-margin" />
                                    Expandir
                                </div>
                            ),
                            click: actions.expandir,
                            data: data
                        }
                    ];
                } else {
                    return [
                        {
                            title: (
                                <div className="smaller-text text bold text-center">
                                    <i className="fas fa-eye inline-box side-margin" />
                                    Ver reservaciones
                                </div>
                            ),
                            click: actions.ver,
                            data: data
                        },
                        {
                            title: (
                                <div className="smaller-text text bold text-center">
                                    <i className="fas fa-minus-circle  inline-box side-margin" />
                                    Contraer
                                </div>
                            ),
                            click: actions.expandir,
                            data: data
                        }
                    ];
                }
            }
        };
    },
    feriados: (
        data,
        actions,
        key,
        type
    ) => {
        const index = data ? 'data' : 'no_data',
            acciones = FeriadosActions[type][index](
                key,
                actions
            );
        return (
            <Actions
                links={acciones.links}
                buttons={acciones.buttons} />
        )
    },
    horarios: (
        data,
        key,
        actions
    ) => {
        const index = data ? 'data' : 'no_data',
            acciones = HorariosActions[index](
                key,
                actions
            );
        return (
            <Actions 
                links={acciones.links}
                buttons={acciones.buttons}/>
        );
    }
};
