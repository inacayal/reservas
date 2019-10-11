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
                            <i className="fas fa-store-alt inline-box side-margin" />
                            Ubicaciones
                            </div>
                    ),
                    to: '/ubicaciones'
                }, {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-eye" />
                            Ver
                        </div>
                    ),
                    to: '/ubicaciones/' + data.id
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
                                <i className="fas fa-store-alt inline-box side-margin" />
                                Ubicaciones
                            </div>
                        ),
                        to: '/ubicaciones'
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
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar nueva
                    </div>
                ),
                to: '/ubicaciones/agregar'
            }
        ]
    }),
    singular: (data) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-store-alt inline-box side-margin" />
                        Ubicaciones
                            </div>
                ),
                to: '/ubicaciones'
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen inline-box side-margin" />
                        Editar
                    </div>
                ),
                to: '/ubicaciones/editar/' + data.id
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