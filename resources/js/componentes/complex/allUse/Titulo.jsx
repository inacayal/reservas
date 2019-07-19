import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonList from './ButtonList';


export default function Titulo (props){
    return (
        <div className="no-padding box-transparent highlight-title full-width text-left c-title">
            <span className="text-super">{props.title}</span>
            <ButtonList
                displayList="flex-row nav-list no-padding inline-block  align-center"
                container="side-margin inline-block"
                elems={props.navigation} />
        </div>
    );
}