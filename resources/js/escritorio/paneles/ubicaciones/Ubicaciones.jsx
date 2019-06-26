import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Ubicaciones(props) {
    return (
        <div className={props.classes}>
            Ubicaciones
        </div>
    );
}
export default React.memo(Ubicaciones);
