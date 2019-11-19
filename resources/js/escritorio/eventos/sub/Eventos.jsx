/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Titulo from '../../../componentes/basic/Titulo';
import generateEventosCard from './generateEventosCard';

export function Eventos (props) {
    const eventos = generateEventosCard(
        props.data,
        {
            eliminar: props.toggleModal
        }
    );
    return (
        <>
            <Titulo
                title="Eventos"
                links={props.nav.links} />
            <div className="container">
                <div className="bold top-padding row">
                    {"Mostrando " + eventos.length + " eventos encontrados"}
                </div>
                <div className="row">
                    <ul className="nav-list no-padding">
                        {
                            eventos.map(
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
