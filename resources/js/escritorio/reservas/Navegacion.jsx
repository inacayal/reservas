/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const Navegacion = {
    formulario: (data) => {
        return {
            links: [
                {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-book inline-box side-margin" />
                            Reservaciones
                        </div>
                    ),
                    to: '/reservas'
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
            },{
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar nueva
                    </div>
                ),
                to: 'reservas/agregar'
            }
        ]
    }),
    singular: (data) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-book inline-box side-margin" />
                        Reservas
                    </div>
                ),
                to: '/reservas'
            }
        ],
        buttons: null
    })
}