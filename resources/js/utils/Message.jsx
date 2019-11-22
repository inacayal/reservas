import React, { Component,useState } from 'react';
import ReactDOM from 'react-dom';

const type = {
    success:{backgroundColor:'var(--success-transparent)',color:'white'},
    warning:{backgroundColor:'var(--warning-transparent)',color:'white'},
    failure:{backgroundColor:'var(--danger-transparent)',color:'white'}
}

export default function Message (props){
    const style = {
        position:"fixed",
        top:"20px",
        right:"20px",
        zIndex:"5",
        borderRadius:"3px",
        maxWidth:"400px",
        minWidth:"200px",
        ...type[props.message.type]
    };
    if (props.show){
        return (
            <div className="extra-box-padding" style={style}>
                <div className="relative">
                    <button
                        style={{
                            position:"absolute",
                            right:"-5px",
                            top:"-5px",
                            color:"white"
                        }}
                        onClick={props.hide}
                        className="box-transparent">
                        <i className="fas fa-times"/>
                    </button>
                    <div className="text bold" style={{color:"white"}}>
                        {props.message.title}
                    </div>
                    {props.message.data}
                </div>
            </div>
        )
    } else
        return (
            <></>
        )
}
