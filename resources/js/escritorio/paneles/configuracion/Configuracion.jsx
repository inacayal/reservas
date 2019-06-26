import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Configuracion(props) {
    return (
        <div className={props.classes}>
            Configuracion
        </div>
    );
}
export default React.memo(Configuracion);
