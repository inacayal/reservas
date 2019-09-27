/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import {CommaList} from '../../../componentes/basic/CommaList';
/**
 * funciones
 */
import { GenerateActions } from '../../../acciones/GenerateActions';

export default function generateEventosCard(
    eventos,
    actions
) {
    return Object.keys(eventos).map(
        e => {
            const acciones = GenerateActions.eventos(
                e,
                actions
                ),
                promociones = Object.values(eventos[e].promociones.list);
            return {
                content: () => (
                    <>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <span className="sub-title text-super side-margin inline-block align-center bold">
                                        {eventos[e].nombre}
                                    </span>
                                    {acciones}
                                </div>
                                <div className="col-md-4 border-bottom text-right no-margin no-padding">
                                    {eventos[e].estado}
                                </div>
                            </div>
                            <div className="row box-padding">
                                <div className="col-md-6">
                                    <div className="bold light-danger">Descripción</div>
                                    <div>{eventos[e].descripcion}</div>
                                    <div className="bold light-danger top-padding">Promociones</div>
                                    {
                                        (promociones.length>0)
                                        ?
                                            <CommaList data={promociones} /> 
                                        :
                                            <div>No has asignado promociones a este evento</div>
                                    }
                                </div>
                                <div className="col-md-6">
                                    <div className="bold light-danger">Horarios</div>
                                    <div className="bold light-danger top-padding">Feriados</div>
                                </div>
                            </div>
                        </div>
                    </>
                ),
                class: "box-padding"
            }
        }
    );
}