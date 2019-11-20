import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default function Message (props){
    if (props.show){
        console.log("show")
        return (
            <div className="extra-box-padding round-border background-border" style={{position:"fixed",top:"20px",right:"20px",zIndex:"5"}}>
                {props.message.data}
            </div>
        )
    } else
        return (
            <></>
        )
}
