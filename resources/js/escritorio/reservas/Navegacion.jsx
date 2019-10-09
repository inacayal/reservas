/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const Navegacion = {
    listado: () => ({
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
    reservas: () => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-cog inline-box side-margin" />
                        Configuración
                </div>
                ),
                to: '/configuracion'
            }
        ]
    }),
    usuario: (data) => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-cog inline-box side-margin" />
                        Configuración
                </div>
                ),
                to: '/configuracion'
            }
        ]
    }),
    establecimiento: () => ({
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-cog inline-box side-margin" />
                        Configuración
                    </div>
                ),
                to: '/configuracion'
            }
        ]
    })

}