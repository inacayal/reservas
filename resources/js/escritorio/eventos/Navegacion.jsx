/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const Navegacion = {
    formulario: (data, editar) => {
        return editar ? {
            links: [
                {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-glass-cheers inline-box side-margin" />
                            Eventos
                    </div>
                    ),
                    to: '/eventos'
                }, {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-eye" />
                            Ver
                        </div>
                    ),
                    to: '/eventos/' + data.id
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
                                <i className="fas fa-glass-cheers inline-box side-margin" />
                                Eventos
                            </div>
                        ),
                        to: '/eventos'
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
                        <i className="fas fa-glass-cheers inline-box side-margin" />
                        Agregar nuevo
                    </div>
                ),
                to: '/eventos/agregar'
            }
        ]
    }),
    singular: (data) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-glass-cheers inline-box side-margin" />
                        Eventos
                    </div>
                ),
                to: '/eventos'
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen inline-box side-margin" />
                        Editar
                    </div>
                ),
                to: '/eventos/editar/' + data.id
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