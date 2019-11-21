/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 *
 * @param {*} props
 * component
 */
const noMemoText = (props) => {
    return (
        <div className="full-width">
            <h6 className="highlight no-margin bold">{props.titulo}</h6>
            <div className="border-box input-text margin-box">
                <textarea
                    name={props.name}
                    rows={props.rows}
                    readOnly = {props.readOnly}
                    className="full-width box-transparent"
                    onChange={props.changeHandler}
                    value={props.value}/>
            </div>
        </div>
    );
}
export const Text = React.memo(noMemoText);
