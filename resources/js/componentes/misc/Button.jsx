import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Button(props) {
    return (
        <div className={props.container}>
            <button data={(props.data) ? props.data : ""} onClick={props.click} className={props.class} disabled={props.disabled}>
                {(props.icon) ? <i className={props.icon}></i> : ""} 
                {(props.title) ? " "+props.title: ""}
            </button>
        </div>
    );
}
export default React.memo(Button);