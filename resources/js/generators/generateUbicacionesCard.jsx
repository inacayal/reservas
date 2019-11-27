/**
 * react basic
 */
import React, { Component, useContext } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import ButtonList from '../componentes/basic/ButtonList';
import { GenerateActions } from '../acciones/GenerateActions';
import CustomLink from '../componentes/basic/CustomLink';

export default function generateUbicacionesCard(
    ubicaciones,
    actions
){
    return Object.keys(ubicaciones).map(
        e => {
            const acciones = GenerateActions.ubicaciones(
                    e,
                    actions
                ),
                linkParam = {
                    to:`/ubicaciones/${e}`,
                    params:{id:e},
                    route:'ubicaciones'
                };
            return {
                content:() => (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                imagen para mostrar
                            </div>
                            <div className="col-md-9 container">
                                <div className="row">
                                    <CustomLink params={linkParam}>
                                        <span className="bold sub-title side-margin text">
                                            {ubicaciones[e].nombre}
                                        </span>
                                    </CustomLink>
                                    {acciones}
                                </div>
                                <div className="row v-padding">
                                    <div className="col-md-6">
                                        <div className="bold light-danger">Descripción</div>
                                        <div>{ubicaciones[e].descripcion}</div>
                                        <div className="bold light-danger top-padding">Capacidad máxima</div>
                                        <div>
                                            <span className="side-margin bold inline-block">{ubicaciones[e].capacidad}</span>
                                            <span className="side-margin inline-block">personas</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="bold light-danger">Máximo reservas</div>
                                        <span className="side-margin bold inline-block">{ubicaciones[e].maximo}</span>
                                        <span className="side-margin inline-block">personas</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ),
                class: "box-padding margin-box"
            }
        }
    );
}
