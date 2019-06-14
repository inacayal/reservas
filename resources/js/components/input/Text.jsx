import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//holds reservation state

function Text(props) {
    return (
        <div className={props.container}>
            <h4 className="highlight h3 no-margin full-width">{props.titulo}</h4>
            <div className={props.classes}>
                <input type="text" name={props.name} value={props.value}/>
            </div>
        </div>
    );
}
export default Text;