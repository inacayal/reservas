import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//holds reservation state

function Text(props) {
    return (
        <div>
            <h6 className="highlight no-margin bold">{props.titulo}</h6>
            <div className={props.classes}>
                <input type="text" name={props.name} value={props.value}/>
            </div>
        </div>
    );
}
export default React.memo(Text);