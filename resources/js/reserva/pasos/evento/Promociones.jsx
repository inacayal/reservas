/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
/**
 * react calendar
 */
import Calendar from 'react-calendar';
import {CommaList} from '../../../componentes/basic/CommaList';
/**
 * CONSTANTS
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';

export default function Promociones (props) {
    const 
        data = props.data,
        list = props.list,
        showData = Object.keys(props.data).reduce(
            (tot,curr, i) => {
                const promo = props.data[curr].promociones;
                if ( promo && promo.data ){
                    Object.keys(promo.data).map(
                        (e,i) => {
                            const eventos = promo.data[e].eventos.list;
                            if (tot[e]){
                                Object.assign(tot[e].eventos, eventos);
                            } else {
                                tot[e] = {
                                    nombre: promo.data[e].nombre,
                                    eventos: eventos,
                                    descripcion: promo.data[e].descripcion,
                                    descuento: promo.data[e].descuento,
                                };
                            }
                        }
                    )
                }
                return tot;
            },
            {}
        ),
        dataArray = Object.keys(showData);
    
    return (
        <div className="row border-box" style={{padding:"10px 0px 0px 10px"}}>
            <div className="bold highlight full-width ">
                Promociones
            </div>
            <ul className="nav-list no-padding full-width" style={{ maxHeight: "35vh", overflowY: "auto"}}>
                {
                    dataArray.length>0
                    ?
                        dataArray.map(
                            (e,i) => {
                                const eventoArray = Object.values(showData[e].eventos);
                                return (
                                    <li key={i} 
                                        className="v-padding" 
                                        keyvalue={e}
                                        style={{ paddingRight: "10px" }}>
                                        <div className="smaller-text">
                                            <div className="bold half inline-block">
                                                {showData[e].nombre}
                                            </div>
                                            <div className="half text-right inline-block">
                                                {showData[e].descuento !== 0 ? showData[e].descuento + "% descuento" : "sin descuento"}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="smaller-text">{showData[e].descripcion}</div>
                                            <div className="smaller-text inline-block side-margin">en los eventos:</div>
                                            <CommaList data = {eventoArray} /> 
                                        </div>
                                    </li>
                                )
                            }
                        )
                    :
                        <div style={{padding:"0px 10px 10px 0px"}}> Sin promociones para mostrar</div>
                }
            </ul>
        </div>
    )
}