/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';

function noMemoNumeric(props) {
    const hasError = (props.errors||[]).length>0;
    return (
        <div className="full-width">
            <h6 className={props.description ? "highlight bold no-margin" : "highlight bold"}>{props.titulo}</h6>
            {props.description||""}
            <div className={hasError ? "light-input error-box error" : "light-input "}>
                <input
                    type="number"
                    name={props.name}
                    placeholder={props.holder}
                    className={hasError && props.errors[0].type!=='required' ? "full-width box-transparent error" : "full-width box-transparent"}
                    onChange={props.changeHandler}
                    value={props.value}/>
            </div>
            {
                hasError
                ?
                    <ul className="nav-list no-padding">
                        {
                            props.errors.map(
                                (e,i) => <li key={i} className="smaller-text error">{e.description}</li>
                            )
                        }
                    </ul>
                :
                    <></>
            }
        </div>
    );
}
export const Numeric = React.memo(noMemoNumeric);
