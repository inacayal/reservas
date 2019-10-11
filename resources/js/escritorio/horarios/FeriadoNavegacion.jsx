/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const FeriadoNavegacion = {
    formulario: (data, editar) => {
        return editar ? {
            links: [
                {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-store-alt inline-box side-margin" />
                            Feriados
                        </div>
                    ),
                    to: '/horarios/feriados'
                }, {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-eye" />
                            Ver
                        </div>
                    ),
                    to: '/horarios/feriados/' + data.feriados.id
                }
            ],
            buttons: [
                {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-trash inline-box side-margin" />
                            Eliminar
                        </div>
                    ),
                    click: () => false
                },
            ]
        } : {
                links: [
                    {
                        title: (
                            <div className="smaller-text text bold">
                                <i className="fas fa-calendar-day inline-box side-margin" />
                                Feriados
                            </div>
                        ),
                        to: '/horarios/feriados'
                    }
                ],
                buttons: null
            };
    },
    listado: (data) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-tachometer-alt inline-box side-margin" />
                        Escritorio
                    </div>
                ),
                to: '/'
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-calendar-week inline-box side-margin" />
                        Horarios
                            </div>
                ),
                to: '/horarios'
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar nuevo
                    </div>
                ),
                to: '/horarios/feriados/agregar'
            }
        ]
    }),
    singular: (data) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-calendar-day inline-box side-margin" />
                        Feriados
                    </div>
                ),
                to: '/horarios/feriados'
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen inline-box side-margin" />
                        Editar
                    </div>
                ),
                to: '/horarios/feriados/editar/' + data.id
            }
        ],
        buttons: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-trash inline-box side-margin" />
                        Eliminar
                    </div>
                ),
                click: () => false
            },
        ]
    })

}