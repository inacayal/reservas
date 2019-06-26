import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Eventos(props) {
    return (
        <div className={props.classes}>
            Eventos
        </div>
    );
}
export default React.memo(Eventos);
