/**
 * react basic
 */
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../componentes/basic/ButtonList';
import {CommaList} from '../componentes/basic/CommaList';
import { GenerateActions } from '../acciones/GenerateActions';
import CustomLink from '../componentes/basic/CustomLink';

export default function generatePromocionesCard(
    promociones,
    actions
) {
    return Object.keys(promociones).map(
        e => {
            const   acciones = GenerateActions.promociones(e,actions),
                    eventos = Object.values(promociones[e].eventos.list),
                    linkParam = {
                        to:`/promociones/${e}`,
                        params:{id:e},
                        route:'promociones'
                    };
            console.log(promociones[e])
            return {
                content: () => (
                    <>
                        <div className="container">
                            <div className="row">
                                <span className="sub-title text-super side-margin inline-block align-center bold">
                                    <CustomLink params={linkParam}>
                                        <span className="text mid-title">
                                            {promociones[e].nombre}
                                        </span>
                                    </CustomLink>
                                </span>
                                {acciones}
                            </div>
                            <div className="h-padding row justify-content-end bold m-font">
                                {promociones[e].estado}
                            </div>
                            <div className="row h-padding">
                                <div className="col-md-6">
                                    <div className="m-font light-danger">
                                        Descripción
                                    </div>
                                    <div>{promociones[e].descripcion}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="m-font light-danger top-padding">
                                        Eventos
                                    </div>
                                    <div>
                                        {`asociada a ${eventos.length} eventos`}
                                    </div>
                                    <div>
                                        {
                                            (eventos.length > 0)
                                                ?
                                                    <CommaList list={promociones[e].eventos.list} route="eventos"/>
                                                :
                                                    <div>No has asignado horarios a este evento</div>
                                        }
                                    </div>
                                    <div className="top-padding">
                                        <span  className="m-font light-danger ">
                                            Descuento
                                        </span>
                                        {
                                            promociones[e].descuento
                                            ?
                                                <span className="side-margin">
                                                    {promociones[e].descuento}
                                                    <span className="bold side-margin">
                                                        %
                                                    </span>
                                                </span>
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
