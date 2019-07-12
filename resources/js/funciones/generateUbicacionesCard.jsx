import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../componentes/complex/allUse/ButtonList';
import { generateActions } from './generateActions';

export default function generateUbicacionesCard(
    ubicaciones,
    actions
){
    return ubicaciones.map(
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
                title:{
                    data:e.nombre,
                    class:"text-center full-width box-padding c-title light-danger"
                },
                content:{
                    data:(
                        <div className="content">
                            <div className="inline-block big-font">{e.capacidad}</div>
                            <div className="inline-block margin-box full-width bold">capacidad máxima</div>
                            <div className="inline-block">{e.descripcion}</div>
                            <ButtonList
                                displayList="flex-row full-width nav-list h-center no-h-padding v-padding"
                                container="side-margin half"
                                elemClass="full-width box-transparent highlight-hover border-box button-border"
                                elems={acciones} />
                        </div>
                    ),
                },
                container:{
                    class:"box-padding border-box margin-box col-sm"
                }
            }
        }
    );
}