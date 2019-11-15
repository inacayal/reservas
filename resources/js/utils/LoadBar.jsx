/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * progress constant
 */
import {progress} from './api';

export function downloadHandler(pEvent) {
    let
        loading = Math.round((pEvent.loaded * 100) / pEvent.total),
        state = loading !== 100 ?
            { loading, loadFinished: false }
            : { loading };
    this.setState(state);
}
export function LoadBar (progress){
    return <div style={
        {
            width:`${progress.loaded}%`,
            backgroundColor:"var(--highlight-blue)",
            height:"4px",
        }
    }></div>;
}
