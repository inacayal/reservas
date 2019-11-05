/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
/**
 * componentes
 */
import ButtonList from '../../../componentes/basic/ButtonList';
import {CommaList} from '../../../componentes/basic/CommaList';
/**
 * funciones
 */

import { GenerateActions } from '../../../acciones/GenerateActions';

export default function generatePromocionesCard(
    promociones,
    actions
) {
    return Object.keys(promociones).map(
        e => {
            const acciones = GenerateActions.promociones(
                e,
                actions
                ),
                eventos = Object.values(promociones[e].eventos.list);
            console.log(promociones[e])
            return {
                content: () => (
                    <>
                        <div className="container no-padding">
                            <div className="row">
                                <div className="col-md-8">
                                    <span className="sub-title text-super side-margin inline-block align-center bold">
                                        <Link to={"/promociones/"+e}>
                                            <span className="text bold">{promociones[e].nombre}</span>
                                        </Link>
                                    </span>
                                    {acciones}
                                </div>
                                <div className="col-md-4 border-bottom text-right no-margin no-padding">
                                    {promociones[e].estado}
                                </div>
                            </div>
                            <div className="row h-padding">
                                <div className="col-md-6">
                                    <div className="bold light-danger">Descripción</div>
                                    <div>{promociones[e].descripcion}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="bold light-danger top-padding">Eventos</div>
                                    <div>
                                        {
                                            (eventos.length > 0)
                                                ?
                                                <CommaList data={promociones[e].eventos.list} />
                                                :
                                                <div>No has asignado horarios a este evento</div>
                                        }
                                    </div>
                                    <div>
                                        <span className="bold light-danger top-padding">Descuento</span>
                                        {
                                            promociones[e].descuento
                                            ?
                                                <span className="side-margin">{promociones[e].descuento}<span className="bold side-margin">%</span></span>
                                            :
                                                <span className="bold"> Sin descuento asignado </span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ),
                class: "v-padding"
            }
        }
    );
}
