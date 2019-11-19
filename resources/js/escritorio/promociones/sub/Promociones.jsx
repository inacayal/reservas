/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
/**
 * funciones
 */
import generatePromocionesCard from './generatePromocionesCard';
/**
 * api
 */
import { GET } from '../../../utils/api';

export function Promociones (props) {
    const promociones = generatePromocionesCard(
        props.data,
        {eliminar: props.toggleModal}
    );
    return (
        <>
            <Titulo
                title="Promociones"
                links={props.nav.links} />
            <div className="container">
                <div className="row">
                    <div className="bold top-padding">
                    {"Mostrando " + promociones.length + " promociones encontradas"}
                    </div>
                </div>
                <div className="row">
                    <ul className="nav-list no-padding full-width">
                        {
                            promociones.map(
                                (elem, index) =>
                                    <li key={index} className={elem.class}><elem.content /></li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}
