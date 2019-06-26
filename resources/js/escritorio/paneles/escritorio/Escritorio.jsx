import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Escritorio(props) {
    return (
        <div className={props.classes}>
            Escritorio
        </div>
    );
}
export default React.memo(Escritorio);
