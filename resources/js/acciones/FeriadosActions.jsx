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
        ) => ({}),
        data: (
            key,
            actions
        ) => ({
            links: [
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
            links: [
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
