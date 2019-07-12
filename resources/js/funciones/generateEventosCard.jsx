import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../componentes/complex/allUse/ButtonList';
import { generateActions } from './generateActions';

export default function generateEventosCard(
    eventos,
    actions
) {
    return eventos.map(
        e => {
            let acciones = generateActions(
                true,
                actions,
                e.id,
                true,
                'feriados',
                false
            );
            return {
                title: {
                    data: e.nombre,
                    class: "text-center full-width box-padding c-title light-danger"
                },
                content: {
                    data: (
                        <div className="content">
                            <div className="margin-box full-width bold">promoción</div>
                            <div>{e.promocion}</div>
                            <div className="inline-block">{e.descripcion}</div>
                            <ButtonList
                                displayList="flex-row full-width nav-list h-center no-h-padding v-padding"
                                container="side-margin half"
                                elemClass="full-width box-transparent highlight-hover border-box button-border"
                                elems={acciones} />
                        </div>
                    ),
                },
                container: {
                    class: "box-padding border-box margin-box col-sm"
                }
            }
        }
    );
}