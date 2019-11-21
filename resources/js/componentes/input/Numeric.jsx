/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';

function noMemoNumeric(props) {
    return (
        <div className="full-width">
            <h6 className="highlight no-margin bold">{props.titulo}</h6>
            <div className="border-box input-text">
                <input
                    type="number"
                    name={props.name}
                    className="full-width box-transparent"
                    onChange={props.changeHandler}
                    value={props.value}/>
            </div>
        </div>
    );
}
export const Numeric = React.memo(noMemoNumeric);
