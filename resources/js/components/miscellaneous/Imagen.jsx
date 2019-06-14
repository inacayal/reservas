import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Imagen(props) {
    return (
        <div>
            <img src={props.source} onClick={props.change} name={props.name} keyvalue={props.keyVal} className={props.class} />
        </div>
    );
}

export default Imagen;