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

export default function generateEventosCard(
    eventos,
    actions
) {
    return Object.keys(eventos).map(
        e => {
            const acciones = GenerateActions.eventos(
                e,
                actions
            );
            return {
                title: {
                    data: (
                        <div className="full-width">
                            <span className="sub-title text-super side-margin inline-block align-center">{eventos[e].nombre}</span>
                            {acciones}
                        </div>
                    )
                },
                content: {
                    data: (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9">
                                    <div>{eventos[e].promocion}</div>
                                </div>
                                <div className="col-md-3 big-font text-right no-padding">
                                    <span className="big-font side-margin light-danger">{eventos[e].descuento}</span>
                                    <span className="side-margin">%</span>
                                </div>
                            </div>
                        </div>
                    ),
                },
                container: {
                    class: "box-padding border-bottom "
                }
            }
        }
    );
}