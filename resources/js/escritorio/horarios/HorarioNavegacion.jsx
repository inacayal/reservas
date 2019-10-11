/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const HorarioNavegacion = {
    formulario: (data, editar) => {
        return editar ? {
            links: [
                {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-calendar-week inline-box side-margin" />
                            Horarios
                        </div>
                    ),
                    to: '/horarios'
                }, {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-eye" />
                            Ver
                        </div>
                    ),
                    to: '/horarios/' + data.horarios.id
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
                                <i className="fas fa-calendar-week inline-box side-margin" />
                                Horarios
                            </div>
                        ),
                        to: '/horarios'
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
            }
        ]
    }),
    singular: (data) => ({
        links: [
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
                        <i className="fas fa-pen inline-box side-margin" />
                        Editar
                    </div>
                ),
                to: '/horarios/editar/' + data.id
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