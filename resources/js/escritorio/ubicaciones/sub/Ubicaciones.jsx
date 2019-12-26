/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Titulo from '../../../componentes/basic/Titulo';
import generateUbicacionesCard from '../../../generators/generateUbicacionesCard';

export default function Ubicaciones (props) {
    const ubicaciones = generateUbicacionesCard(
            props.data,
            {eliminar:props.toggleModal}
        );
    return (
        <>
            <Titulo
                title="Ubicaciones"
                links={props.nav.links} />
            <div className="container-fluid">
                <div className="row">
                    <div className="m-font">
                        {`Mostrando ${ubicaciones.length} ubicaciones encontradas`}
                    </div>
                    <ul className="full-width nav-list no-padding">
                        {
                            ubicaciones.map(
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
