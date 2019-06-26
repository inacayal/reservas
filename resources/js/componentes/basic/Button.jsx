import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Button(props) {
    return (
        <div>
            <button 
                data={(props.data) ? props.data : ""} 
                onClick={props.click} 
                className={props.class} 
                disabled={props.disabled}>
                {(props.title) ? props.title: ""}
            </button>
        </div>
    );
}
export default React.memo(Button);