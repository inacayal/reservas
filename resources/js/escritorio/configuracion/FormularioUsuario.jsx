/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elem
 */
import { Text } from '../../componentes/input/Text';

export const FormularioUsuario = (props) => {
    const data = props.data;
    return (
        <>
            <div className="top-padding row sub-title bold">
                Usuario
            </div>
            <div className="row v-padding">
                <div className="col-md-4">
                    <Text
                        rows={1}
                        titulo="Nombre de usuario"
                        name="username"
                        value={data.username}
                        classes={"border-box input-text margin-box"}
                        container="full-width" />
                </div>
                <div className="col-md-4">
                    <Text
                        rows={1}
                        titulo="Email"
                        name="email"
                        value={data.email}
                        classes={"border-box input-text margin-box"}
                        container="full-width" />
                </div>
                <div className="col-md-4">
                    <Text
                        rows={1}
                        titulo="Contraseña"
                        name="password"
                        value=""
                        classes={"border-box input-text margin-box"}
                        container="full-width" />
                    <span className="smaller-text">Ingresa un nuevo valor para cambiarla</span>
                </div>
            </div>
        </>
    );
}