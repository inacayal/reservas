/**
 * react basic
 */
import React, { Component,useContext } from 'react';
import ReactDOM from 'react-dom';
import {CommaList} from '../componentes/basic/CommaList';
import {DAYS} from '../constantes/DaysMonths';
import { GenerateActions } from '../acciones/GenerateActions';
import CustomLink from '../componentes/basic/CustomLink';

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
            const   acciones = GenerateActions.eventos(
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
                            <CustomLink params={linkParam}>
                                <span className="text mid-title">
                                    {eventos[e].nombre}
                                </span>
                            </CustomLink>
                            {acciones}
                        </div>
                        <div className="row bold m-font justify-content-end">
                            {eventos[e].estado}
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="m-font light-danger">
                                    Horarios
                                </div>
                                <div>
                                    {`Evento asociado a ${horariosLength} días de la semana`}
                                </div>
                                <div className="top-padding">
                                {
                                    (horariosLength > 0)
                                        ?
                                            <CommaList list={horarios} endpoint='/horarios' />
                                        :
                                            <div>No has asignado horarios a este evento</div>
                                }
                                </div>
                                <div className="m-font light-danger top-padding">
                                    Promociones
                                </div>
                                <div>
                                    {`${promociones.length} promociones asociadas a este evento`}
                                </div>
                                <div className="top-padding">
                                {
                                    (promociones.length > 0)
                                        ?
                                            <CommaList list={eventos[e].promociones.list} endpoint="/promociones"/>
                                        :
                                            <div>No has asignado promociones a este evento</div>
                                }
                                </div>
                            </div>
                            <div className="col-md-6 no-padding">
                                <div className="m-font light-danger">
                                    Descripción
                                </div>
                                <div>
                                    {eventos[e].descripcion}
                                </div>
                            </div>
                        </div>
                    </>
                ),
                class: "v-padding container"
            }
        }
    );
}
