import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const type = {
    success:{backgroundColor:'var(--success)',color:'white'},
    warning:{backgroundColor:'var(--warning)',color:'white'},
    failure:{backgroundColor:'var(--danger)',color:'white'}
}

export default function Message (props){
    const style = {
        position:"fixed",
        top:"20px",
        right:"20px",
        zIndex:"5",
        borderRadius:"3px",
        ...type[props.message.type]
    };
    if (props.show){
        return (
            <div className="extra-box-padding" style={style}>
                {props.message.data}
            </div>
        )
    } else
        return (
            <></>
        )
}
