/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const Navegacion = {
    formulario: (data,editar) => {
        console.log(editar)
        return editar ? {
            links: [
                {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-percentage inline-box side-margin" />
                            Promociones
                        </div>
                    ),
                    to: '/promociones'
                }, {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-eye" />
                            Ver
                        </div>
                    ),
                    to: '/promociones/' + data.id
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
                                <i className="fas fa-percentage inline-box side-margin" />
                                Promociones
                            </div>
                        ),
                        to: '/promociones'
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
                to: '/promociones/agregar'
            }
        ]
    }),
    singular: (data) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-percentage inline-box side-margin" />
                        Promociones
                    </div>
                ),
                to: '/promociones'
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen inline-box side-margin" />
                        Editar
                    </div>
                ),
                to: '/promociones/editar/' + data.id
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
