/**
 * react basic
 */
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import Button from '../basic/Button';

/**
 * props 
 * @param {*} props 
 * component
 */
function noMemoToggle(props) {
    const [side,changeSide] = useState(false);
    return (
        <div className="inline-block">
            <span className="margin-box smaller-text">{(side) ? props.rightTitle : props.leftTitle}</span>
            <div className="inline-block">
                <Button 
                    container={(side) ? "inline-block toggle text-right" : "inline-block toggle text-left"}
                    data={side ? 1 : 2}
                    class="circle"
                    click= { (e) => {e.preventDefault();changeSide(!side)}}/>
                <input 
                    className="hidden"
                    type="checkbox"
                    name={props.name}
                    value={side ? 1 : 2} />
            </div>
        </div>
    );
}
export const Toggle = React.memo(noMemoToggle);