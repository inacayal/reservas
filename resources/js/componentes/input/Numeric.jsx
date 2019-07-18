import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//holds reservation state

function Numeric(props) {
    return (
        <div className={props.container ? props.container : ""}>
            <h6 className="highlight no-margin bold">{props.titulo}</h6>
            <div className={props.classes}>
                <input
                    type="number"
                    name={props.name}
                    className="full-width box-transparent"
                    onChange={props.changeValue}
                    value={props.value} />
            </div>
        </div>
    );
}
export default React.memo(Numeric);