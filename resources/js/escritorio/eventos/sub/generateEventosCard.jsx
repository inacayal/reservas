/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import {CommaList} from '../../../componentes/basic/CommaList';
import {DAYS} from '../../../constantes/DaysMonths';
/**
 * funciones
 */
import { GenerateActions } from '../../../acciones/GenerateActions';

export const assignHorarios = (hList) => {
    const keys = Object.keys(hList),
        res = keys.reduce(
            (final, curr) => {
                const el = hList[curr];
                final[el] = DAYS[curr-1];
                return final;
            }, {}
        );
    return [res,keys.length];
}

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
                promociones = Object.values(eventos[e].promociones.list),
                [horarios,horariosLength] = assignHorarios(eventos[e].horarios.list);
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
                                    
                                </div>
                                <div className="col-md-6">
                                    <div className="bold light-danger">Horarios</div>
                                    {
                                        (horariosLength > 0)
                                            ?
                                            <CommaList data={horarios} />
                                            :
                                            <div>No has asignado promociones a este evento</div>
                                    }
                                    <div className="bold light-danger top-padding">Promociones</div>
                                    {
                                        (promociones.length > 0)
                                            ?
                                            <CommaList data={eventos[e].promociones.list} />
                                            :
                                            <div>No has asignado horarios a este evento</div>
                                    }
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