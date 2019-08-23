/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
                title:{
                    data:(
                        <div className="full-width ">
                            <span className="sub-title text-super side-margin inline-block align-center">{ubicaciones[e].nombre}</span>
                            {acciones}
                        </div>
                    ),
                    class:""
                },
                content:{
                    data:(
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9">
                                    <div>{ubicaciones[e].descripcion}</div>
                                </div>
                                <div className="col-md-3 big-font text-right no-padding">
                                    <div className="big-font">
                                        <span className="smaller-text side-margin bold">capacidad</span>
                                        <span className="big-font side-margin light-danger">{ubicaciones[e].capacidad} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ),
                },
                container:{
                    class:"box-padding border-bottom margin-box"
                }
            }
        }
    );
}