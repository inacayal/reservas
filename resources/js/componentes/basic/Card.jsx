import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Card(props) {
    //buttons is an array of the actions to perform in the current box
    return (
        <div className={props.containerClass} data={props.data} onClick={props.containerClick ? props.containerClick : e => false}>
            <div className={props.titleClass}>
                {props.title}
            </div>
            <div className={props.contentClass}>
                {props.content}
            </div>
        </div>
    );
}
export default React.memo(Card);