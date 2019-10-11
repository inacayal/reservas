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
/**
 * funciones
 */
import { GenerateActions } from '../../../acciones/GenerateActions';

export default function generateUbicacionesCard(
    ubicaciones,
    actions
){
    return Object.keys(ubicaciones).map(
        e => {
            const acciones = GenerateActions.ubicaciones(
                e,
                actions
            );
            return {
                content:() => (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                imagen para mostrar
                            </div>
                            <div className="col-md-9 container">
                                <div className="row">
                                    <Link to={"ubicaciones/"+e}>
                                        <span className="bold sub-title side-margin text">{ubicaciones[e].nombre}</span>
                                    </Link>    
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