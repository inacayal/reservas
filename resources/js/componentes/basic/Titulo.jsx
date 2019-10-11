/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import ButtonList from './ButtonList';
import Actions from './Actions';

export default function Titulo (props){
    return (
        <div className={props.container ? props.container :"no-padding box-transparent highlight-title full-width text-left c-title"}>
            <span className={props.class? props.class : "text-super side-margin"}>{props.title}</span>
            <Actions 
                links={props.links}
                buttons={props.buttons}/>
        </div>
    );
}