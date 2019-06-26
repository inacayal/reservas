import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

function Toggle(props) {
    return (
        <div>
            <span className="margin-box">{(props.right) ? "Mostrando calendario semanal" : "Mostrando calendario mensual"}</span>
            <div className={(props.right) ? "inline-block toggle text-right" : "inline-block toggle text-left"} >
                <Button 
                    container={(props.right) ? "inline-block toggle text-right" : "inline-block toggle text-left"}
                    data={props.belongs}
                    class="circle"
                    click= {props.changeSide}
                    />
            </div>
        </div>
    );
}
export default React.memo(Toggle);