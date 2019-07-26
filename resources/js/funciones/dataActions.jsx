/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * 
 * @param {*} volver 
 * @param {*} eliminar 
 * @param {*} data 
 */
export function formNavigation(
    volver,
    eliminar,
    data
) {
    return [
        {
            title: (
                <div className="smaller-text text bold">
                    <i className="fas fa-arrow-left inline-box side-margin" />
                    Volver
                </div>
            ),
            click: volver,
            class: "box-transparent highlight-hover border-box button-border inline-block",
            disabled: false,
            data: data
        },
        {
            title: (
                <div className="smaller-text text bold">
                    <i className="fas fa-trash inline-box side-margin" />
                    Eliminar
                </div>
            ),
            click: eliminar,
            class: "box-transparent highlight-hover border-box button-border inline-block",
            disabled: false
        }
    ];
}
/**
 * 
 * @param {*} volver 
 * @param {*} agregar 
 * @param {*} panel 
 */
export function panelNavigation(
    volver,
    agregar,
    panel
) {
    return [
        {
            title: (
                <div className="smaller-text text bold">
                    <i className="fas fa-arrow-left inline-box side-margin" />
                    Volver
                </div>
            ),
            click: volver,
            data: panel,
            class: "box-transparent highlight-hover border-box button-border inline-block",
            disabled: false
        },
        {
            title: (
                <div className="smaller-text text bold">
                    <i className="fas fa-plus-circle inline-box side-margin" />
                    Agregar
                </div>
            ),
            click: agregar,
            class: "box-transparent highlight-hover border-box button-border inline-block",
            disabled: false
        }
    ];
}
/**
 * 
 * @param {*} cancelar 
 * @param {*} guardar 
 * @param {*} panel 
 */
export function formActions(
    cancelar,
    guardar,
    panel
) {
    return [
        {
            title: (
                <div className="smaller-text text bold">
                    <i className="fas fa-times-circle inline-box side-margin" />
                    Cancelar
                </div>
            ),
            click: cancelar,
            data: panel,
            class: "box-transparent highlight-hover border-box button-border inline-block",
            disabled: false
        },
        {
            title: (
                <div className="smaller-text text bold">
                    <i className="fas fa-check-circle inline-box side-margin" />
                    Guardar
                </div>
            ),
            click: guardar,
            class: "box-transparent highlight-hover border-box button-border inline-block",
            disabled: false
        }
    ];
}

export function generateConfigurationActions(action) {
    return [
        {
            title: (
                <>
                    <div className="x-big-font border-font">
                        <i className="fas fa-user-tie" />
                    </div>
                    Encargado
                </>
            ),
            data: "0",
            click: action
        },
        {
            title: (
                <>
                    <div className="x-big-font border-font">
                        <i className="fas fa-info-circle" />
                    </div>
                    Información
                </>
            ),
            data: "1",
            click: action
        },
        {
            title: (
                <>
                    <div className="x-big-font border-font">
                        <i className="fas fa-user" />
                    </div>
                    Usuario
                </>
            ),
            data: "2",
            click: action
        }
    ]
}