/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
/**
 * 
 * @param {*} e 
 * handler
 */
export function onNumberChange(e) {
    let input = e.currentTarget,
        name = input.getAttribute('name'),
        numberInput = this.state.input;

    numberInput[name] = input.value;
    this.setState({ numeric: numberInput });
}
/**
 * 
 * @param {*} props 
 * component
 */
function noMemoNumeric(props) {
    const
        [number, changeNumber] = useState(props.value||0);
    return (
        <div className={props.container ? props.container : ""}>
            <h6 className="highlight no-margin bold">{props.titulo}</h6>
            <div className={props.classes}>
                <input
                    type="number"
                    name={props.name}
                    className="full-width box-transparent"
                    onChange={(e) => changeNumber(e.currentTarget.value)}
                    value={number} />
            </div>
        </div>
    );
}
export const Numeric = React.memo(noMemoNumeric);