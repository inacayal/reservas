/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Titulo from '../../../componentes/basic/Titulo';

export default function Escritorio (props) {
    const data = props.data;
    return (
        <>
            <Titulo
                title={"Bienvenido, "+data.username} />
            <div className="container">
                <div className="row">
                    <div className="col-md-4 bold">
                        foto de local
                    </div>
                    <div className="col-md-8 container">
                        <div className="row">
                            <div className="col-md-6">
                                {data.nombre}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
