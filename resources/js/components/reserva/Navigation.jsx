import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../buttons/Button.jsx';

function Navigation(props) {
    let len = props.panels.length - 1;
    return (
        <div className="flex h-center flex-row contained">
            <Button {...props.first} click={props.click} disabled={props.current===0}/>
            <Button {...props.left} click={props.click} disabled={props.current === 0}/>
            <ul className="nav-list flex flex-row h-center large">
                {
                    props.panels.map((ind, key) => <li onClick={props.jumpTo} key={key} className={(props.current === key) ? "small box-padding pointer highlight-nav":"small pointer highlight-hover box-padding"} jump={key}>{key+1}</li>)
                }
            </ul>
            <Button {...props.right} click={props.click} disabled={props.current === len}/>
            <Button {...props.last} click={props.click} disabled={props.current === len}/>
        </div>
    );
}
export default Navigation;

