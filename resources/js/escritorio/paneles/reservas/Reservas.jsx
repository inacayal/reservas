import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Reservas(props) {
    return (
        <div className={props.classes}>
            Reservas
        </div>
    );
}
export default React.memo(Reservas);
