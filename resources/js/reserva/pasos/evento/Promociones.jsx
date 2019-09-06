/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
/**
 * react calendar
 */
import Calendar from 'react-calendar';
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
                                    eventos: eventos
                                };
                            }
                        }
                    )
                }
                return tot;
            },
            {}
        );
    return (
        <div className="row top-padding">
            <div className="bold highlight full-width">
                Promociones
            </div>
            <ul>
                {
                    Object.keys(showData).map(
                        (e,i) => {
                            const eventoArray = Object.values(showData[e].eventos);
                            return (
                                <li key={i}>
                                    <div>{showData[e].nombre}</div>
                                    {
                                        eventoArray.map(
                                            (el,ind) => 
                                                <div key = {ind} className="button-border">{el}</div>
                                        )
                                    }
                                </li>
                            )
                        }
                    )
                }
            </ul>
        </div>
    )
}