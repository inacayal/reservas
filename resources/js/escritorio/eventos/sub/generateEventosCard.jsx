/**
 * react basic
 */
import React, { Component,useContext } from 'react';
import ReactDOM from 'react-dom';
import {CommaList} from '../../../componentes/basic/CommaList';
import {DAYS} from '../../../constantes/DaysMonths';
import { GenerateActions } from '../../../acciones/GenerateActions';
import CustomLink from '../../../componentes/basic/CustomLink';

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
                [horarios,horariosLength] = assignHorarios(eventos[e].horarios.list),
                linkParam={
                    to:`/eventos/${e}`,
                    params:{id:e},
                    route:'eventos'
                };
            return {
                content: () => (
                    <>
                        <div className="row">
                            <div className="col-md-8 no-padding">
                                <CustomLink params={linkParam}>
                                    <span className="text sub-title bold">
                                        {eventos[e].nombre}
                                    </span>
                                </CustomLink>
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
                                            <CommaList list={horarios} endpoint='/horarios' />
                                        :
                                            <div>No has asignado horarios a este evento</div>
                                }
                                <div className="bold light-danger top-padding">Promociones</div>
                                {
                                    (promociones.length > 0)
                                        ?
                                            <CommaList list={eventos[e].promociones.list} endpoint="/promociones"/>
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
