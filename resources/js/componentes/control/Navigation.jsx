import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../buttons/Button.jsx';

function Navigation(props) {
    let panels = [];
    for (let key = 0; key < props.panels.length; key++) {
        panels.push(<li onClick={props.jumpTo} key={key} className={(props.current === key) ? "box-padding pointer highlight-nav" : "pointer highlight-hover box-padding"} jump={key}>{key + 1}</li>);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 nav-list flex-row">
                    <Button {...props.first} click={props.click} disabled={props.current===0}/>
                    <Button {...props.left} click={props.click} disabled={props.current === 0}/>
                    <ul className="nav-list flex-row">
                        {panels}
                    </ul>
                    <Button {...props.right} click={props.click} disabled={props.current === props.panels.length-1}/>
                    <Button {...props.last} click={props.click} disabled={props.current === props.panels.length - 1}/>
                </div>
            </div>
        </div>
    );
}
export default Navigation;

