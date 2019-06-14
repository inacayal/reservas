import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Button(props) {
    return (
        <div className={props.container}>
            <button type={props.type} tab={(props.tab) ? props.tab : ""} onClick={props.click} className={props.class} disabled={props.disabled}>
                {(props.icon) ? <i className={props.icon}></i> : ""} 
                {props.title}
            </button>
        </div>
    );
}
export default Button;