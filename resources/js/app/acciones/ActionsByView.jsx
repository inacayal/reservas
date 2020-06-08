/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const Navegacion = {
    agregar: (root) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-bars inline-box side-margin" />
                        Listado
                    </div>
                ),
                to:`/${root}`
            }
        ]
    }),
    listado: (root) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar
                    </div>
                ),
                to: `/${root}/agregar`
            }
        ]
    }),
    formulario:(
        eliminar,
        key,
        root
    ) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-bars inline-box side-margin" />
                        Listado
                    </div>
                ),
                to:`/${root}`
            }, {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-eye" />
                        Ver
                    </div>
                ),
                to:`/${root}/${key}`
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
                click: () => false,
                data:1
            },
        ]
    }),
    singular: (
        eliminar,
        key,
        root
    ) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-bars inline-box side-margin" />
                        Listado
                    </div>
                ),
                to:`/${root}`,
                params:{},
                route:root
            }, {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen" />
                        Editar
                    </div>
                ),
                to:`/${root}/editar/${key}`
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
};

export const FormActions = (
    sendHandler,cancelHandler
) => [
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-times-circle inline-box side-margin" />
                Cancelar
            </div>
        ),
        click: cancelHandler
    },
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-check-circle inline-box side-margin" />
                Guardar
            </div>
        ),
        click: sendHandler
    },
];
