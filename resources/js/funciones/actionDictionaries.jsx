/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const FeriadosActions = {
    week: {
        no_data: (
            key,
            actions
        ) => ({

        }),
        data: (
            key,
            actions
        ) => ({
            links:
                [
                    {
                        title: (
                            <div className="smaller-text text bold">
                                <i className="fas fa-pen inline-box side-margin" />
                                Editar feriado
                            </div>
                        ),
                        to: '/horarios/feriados/editar/' + key
                    }
                ],
            buttons: [
                {
                    title: (
                        <div className="smaller-text text bold text-center">
                            <i className="fas fa-trash inline-box side-margin" />
                            Eliminar feriado
                        </div>
                    ),
                    click: actions.eliminar,
                    data: key
                }
            ]
        })
    },
    month: {
        data: (
            key,
            actions
        ) => ({
            links:
                [
                    {
                        title: (
                            <div className="smaller-text text bold">
                                <i className="fas fa-pen inline-box side-margin" />
                            </div>
                        ),
                        to: '/horarios/feriados/editar/' + key
                    }
                ],
            buttons: [
                {
                    title: (
                        <div className="smaller-text text bold text-center">
                            <i className="fas fa-trash inline-box side-margin" />
                        </div>
                    ),
                    click: actions.eliminar,
                    data: key
                },
                {
                    title: (
                        <div className="smaller-text text bold text-center">
                            <i className="fas fa-eye inline-box side-margin" />
                        </div>
                    ),
                    click: actions.ver,
                    data: key,
                    class: "box-transparent highlight-hover full-width text-right"
                }
            ]
        }),
        no_data: (
            key,
            actions
        ) => ({})
    }
};


export const HorariosActions = {
    data: (
        key,
        actions
    ) => ({
        links:
            [
                {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-pen inline-box side-margin" />
                            Editar horario
                        </div>
                    ),
                    to: '/horarios/editar/' + key
                }
            ],
        buttons: [
            {
                title: (
                    <div className="smaller-text text bold text-center">
                        <i className="fas fa-trash inline-box side-margin" />
                        Eliminar horario
                    </div>
                ),
                click: actions.eliminar,
                data: key
            }
        ]
    }),
    no_data: (
        key
    ) => ({
        links:
            [
                {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-plus-circle inline-box side-margin" />
                            Agregar horario
                        </div>
                    ),
                    to: '/horarios/agregar/' + key
                }
            ],
        buttons: []
    })
}
/**
 *  feriados:(
        hasEvents,
        actions,
        data,
        enableTitles,
        show
    ) => {
        let acciones = (hasEvents) ? [
            {
                title: (
                    <div className="smaller-text text bold text-center">
                        <i className="fas fa-pen inline-box side-margin" />
                        {(enableTitles) ? 'Editar' : ''}
                    </div>
                ),
                click: actions.editar,
                data: data,
                class: (!enableTitles) ? "box-transparent highlight-hover full-width text-right" : null
            },
            {
                title: (
                    <div className="smaller-text text bold text-center">
                        <i className="fas fa-trash inline-box side-margin" />
                        {(enableTitles) ? 'Eliminar' : ''}
                    </div>
                ),
                click: actions.eliminar,
                data: data,
                class: (!enableTitles) ? "box-transparent highlight-hover full-width text-right" : null
            }
        ] : [
                {}
            ];
        if (!enableTitles && hasEvents)
            acciones.push();
        return acciones;
    }
 * 
 * 
 * {

        let acciones = (hasEvents) ? [
            {
                title: (
                    <div className="smaller-text text bold text-center">
                        <i className="fas fa-pen inline-box side-margin" />
                        {(enableTitles) ? 'Editar' : ''}
                    </div>
                ),
                click: actions.editar,
                data: data,
                class: (!enableTitles) ? "box-transparent highlight-hover full-width text-right" : null
            },
            {
                title: (
                    <div className="smaller-text text bold text-center">
                        <i className="fas fa-trash inline-box side-margin" />
                        {(enableTitles) ? 'Eliminar' : ''}
                    </div>
                ),
                click: actions.eliminar,
                data: data,
                class: (!enableTitles) ? "box-transparent highlight-hover full-width text-right" : null
            }
        ] : [
                {}
            ];
        if (!enableTitles && hasEvents)
            acciones.push({
                title: (
                    <div className="smaller-text text bold text-center">
                        <i className="fas fa-eye inline-box side-margin" />
                        {(enableTitles) ? 'Ver' : ''}
                    </div>
                ),
                click: actions.ver,
                data: data,
                class: (!enableTitles) ? "box-transparent highlight-hover full-width text-right" : null
            });
        return acciones;
    }
 */