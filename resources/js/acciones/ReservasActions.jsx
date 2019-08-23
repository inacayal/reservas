/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const ReservasActions = {
    day:{
        Rechazada: (
            actions,
            data
        ) => ({
            buttons: actions.ver
                ?
                [
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
                :
                [
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
        }),
        Pendiente: (
            actions,
            data
        ) => ({
            buttons: actions.ver 
                ? 
                [
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
                ]
                : 
                [
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
                ]
        }),
        Aprobada: (
            actions,
            data
        ) => ({
            buttons: actions.ver
                ?
                [
                    {
                        title: (
                            <div className="smaller-text text bold text-center">
                                <i className="fas fa-history inline-box side-margin" />
                                Revertir
                            </div>
                        ),
                        click: actions.revertir,
                        data: data
                    },
                    {
                        title: (
                            <div className="smaller-text text bold text-center">
                                <i className="fas fa-eye inline-box side-margin" />
                                Ver reserva
                            </div>
                        ),
                        click: actions.ver,
                        data: data
                    }
                ]
                :
                [
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
        })
    },
    week: {
        data: (
            actions,
            data,
            dayData
        ) => {
            if (dayData.show)
                return {
                    buttons: [
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
                    ]
                };
            return {
                buttons: [
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
                ]
            };
        },
        no_data: (
            actions,
            data
        ) => []
    },
    month: {
        data: (
            actions,
            data
        ) => [{
            click: actions.ver,
            data: data
        }],
        no_data: (
            actions,
            data
        ) => []
    }
};