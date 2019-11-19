/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export const HorariosActions = {
    data: (
        key,
        actions
    ) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen inline-box side-margin" />
                        Editar
                    </div>
                ),
                to: `/horarios/editar/${key}`,
                params:{id:key}
            }
        ],
        buttons: [
            {
                title: (
                    <div className="smaller-text text bold text-center">
                        <i className="fas fa-trash inline-box side-margin" />
                        Eliminar
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
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar
                    </div>
                ),
                to: `/horarios/agregar/${key}`,
                params:{day:key}
            }
        ],
        buttons: []
    })
}
