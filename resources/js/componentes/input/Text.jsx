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
const noMemoText = (props) => {
    const 
        [text,changeText] = useState(props.value);
    return (
        <div className={props.container ? props.container : ""}>
            <h6 className="highlight no-margin bold">{props.titulo}</h6>
            <div className={props.classes}>
                <textarea 
                    name={text.name} 
                    rows={props.rows} 
                    readOnly = {props.readOnly}
                    className="full-width box-transparent"
                    onChange={() => changeText(e.currentTarget.value)}
                    value={text.value}/>
            </div>
        </div>
    );
}
export const Text = React.memo(noMemoText);