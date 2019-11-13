/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * progress constant
 */
import {progress} from './api';

export default function LoadBar (progress){
    return <div style={
        {
            width:`${progress.loaded}%`,
            backgroundColor:"var(--highlight-blue)",
            height:"4px",
        }
    }></div>;
}
