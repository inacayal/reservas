/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const Navegacion = {
    formulario:(data,editar) => {
        return editar
        ?
            {
                links: [
                    {
                        title: (
                            <div className="smaller-text text bold">
                                <i className="fas fa-store inline-box side-margin" />
                                Locales
                            </div>
                        ),
                        to: '/locales'
                    },{
                        title: (
                            <div className="smaller-text text bold">
                                <i className="fas fa-eye" />
                                Ver
                        </div>
                        ),
                        to: '/locales/' + data.id
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
            }
        :
            {
                links: [
                    {
                        title: (
                            <div className="smaller-text text bold">
                                <i className="fas fa-store inline-box side-margin" />
                                Locales
                    </div>
                        ),
                        to: '/locales'
                    }
                ],
                buttons: null
            };
    },
    listado: (data) => ({
        links:[
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
                to: '/locales/agregar'
            }
        ]
    }),
    singular: (data) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-store inline-box side-margin" />
                        Locales
                    </div>
                ),
                to: '/locales'
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen inline-box side-margin" />
                        Editar
                                </div>
                ),
                to: '/locales/editar/' + data.id
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
