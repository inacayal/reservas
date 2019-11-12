/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
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
                        <div className="row">
                            <div className="col-md-8 no-padding">
                                <Link to={'/eventos/'+e}>
                                    <span className="text sub-title bold">
                                        {eventos[e].nombre}
                                    </span>
                                </Link>
                                {acciones}
                            </div>
                            <div className="col-md-4 border-bottom text-right no-margin no-padding">
                                {eventos[e].estado}
                            </div>
                        </div>
                        <div className="row v-padding">
                            <div className="col-md-6 no-padding">
                                <div className="bold light-danger">Descripción</div>
                                <div>{eventos[e].descripcion}</div>

                            </div>
                            <div className="col-md-6 no-padding">
                                <div className="bold light-danger">Horarios</div>
                                {
                                    (horariosLength > 0)
                                        ?
                                            <ul className="no-padding nav-list"><CommaList list={horarios} endpoint='/horarios' /></ul>
                                        :
                                            <div>No has asignado horarios a este evento</div>
                                }
                                <div className="bold light-danger top-padding">Promociones</div>
                                {
                                    (promociones.length > 0)
                                        ?
                                            <ul className="no-padding nav-list"><CommaList list={eventos[e].promociones.list} endpoint="/promociones"/></ul>
                                        :
                                            <div>No has asignado promociones a este evento</div>
                                }
                            </div>
                        </div>
                    </>
                ),
                class: "v-padding container"
            }
        }
    );
}
