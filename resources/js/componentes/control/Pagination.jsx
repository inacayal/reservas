import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../buttons/Button.jsx';

function Pagination(props) {
    let panels = [];
    for (let key = 0; key < props.panels.length; key++) {
        panels.push(<li onClick={props.jumpTo} key={key} className={(props.show === key) ? "box-padding pointer highlight-nav" : "pointer highlight-hover box-padding"} jump={key}>{key + 1}</li>);
    }
    return (
        <div className="row justify-content-center">
            <div className="col-sm-4 nav-list flex-row">
                <Button tab="0"
                    icon="fa fa-angle-double-left"
                    class= "nav-reserva pointer"
                    container= "box-padding"
                    type="first" click={props.click} disabled={props.show===0}/>
                <Button tab={props.show - 1}
                    icon="fa fa-angle-left"
                    class="nav-reserva pointer"
                    container="box-padding"
                    type="prev" click={props.click} disabled={props.show === 0}/>
                <ul className="nav-list flex-row">
                    {panels}
                </ul>
                <Button tab={props.show + 1}
                    icon="fa fa-angle-right"
                    class="nav-reserva pointer"
                    container="box-padding"
                    type="next" click={props.click} disabled={props.show === props.panels.length-1}/>
                <Button tab={props.panels[props.panels.length - 1]}
                    icon="fa fa-angle-double-right"
                    class="nav-reserva pointer"
                    container="box-padding"
                    type="last" click={props.click} disabled={props.current === props.panels.length - 1}/>
            </div>
        </div>  
    );
}
export default Pagination;

