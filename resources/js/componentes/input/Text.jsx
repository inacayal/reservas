/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * 
 * @param {*} e 
 * handler
 */
export function onTextChange(e) {
    let input = e.currentTarget,
        name = input.getAttribute('name'),
        textInputs = this.state.text;

    textInputs[name] = input.value;
    this.setState({ text: textInputs });
}
/**
 * 
 * @param {*} props 
 * component
 */
function noMemoText(props) {
    return (
        <div className={props.container ? props.container : ""}>
            <h6 className="highlight no-margin bold">{props.titulo}</h6>
            <div className={props.classes}>
                <textarea 
                    name={props.name} 
                    rows={props.rows} 
                    readOnly = {props.readOnly}
                    className="full-width box-transparent"
                    onChange={props.changeValue}
                    value={props.value}/>
            </div>
        </div>
    );
}
export const Text = React.memo(noMemoText);