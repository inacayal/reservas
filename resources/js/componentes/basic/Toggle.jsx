import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

function Toggle(props) {
    return (
        <div className="inline-block">
            <span className="margin-box smaller-text">{(props.right) ? props.rightTitle : props.leftTitle}</span>
            <div className="inline-block">
                <Button 
                    container={(props.right) ? "inline-block toggle text-right" : "inline-block toggle text-left"}
                    data={props.belongs ? props.belongs : 0}
                    class="circle"
                    click= {props.changeSide}/>
                <input 
                    className="hidden"
                    type="checkbox"
                    name={props.name}
                    value={props.right ? 1 : 0} />
            </div>
        </div>
    );
}
export default React.memo(Toggle);