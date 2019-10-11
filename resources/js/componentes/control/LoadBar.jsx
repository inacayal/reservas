/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function LoadBar(props) {
    const style = {
        width:props.loaded+'%',
        height:'5px'
    };
    return (
        <div className="full-width">
            <div className="background-border" style={style}></div>
        </div>
    );
}
export default LoadBar;
