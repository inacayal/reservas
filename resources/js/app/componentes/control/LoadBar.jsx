/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {progress} from '../../utils/api';

export function downloadHandler(pEvent) {
    let
        loading = Math.round((pEvent.loaded * 100) / pEvent.total),
        state = loading !== 100 ?
            { loading, loadFinished: false }
            : { loading };
    this.setState(state);
}
export function LoadBar (progress){
    return (
        <div className="col-md-12 no-padding no-margin">
            <div className="" style={
                {
                    width:`${progress.loaded}%`,
                    backgroundColor:"var(--highlight-blue)",
                    height:"6px",
                    zIndex:6
                }
            }/>
        </div>
    )
}