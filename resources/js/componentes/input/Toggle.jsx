/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import Button from '../basic/Button';
/**
 * element passed by button 
 * @param {*} e
 * handler 
 */
export function changeToggleSide(e) {
    e.preventDefault();
    this.setState({ right: !this.state.right });
}
/**
 * props 
 * @param {*} props 
 * component
 */
function noMemoToggle(props) {
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
export const Toggle = React.memo(noMemoToggle);