import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List from '../misc/List';

function Paginado(props) {
    let s = parseInt(props.current);
    let panels = Object.keys(props.panels);
    let leftOperators = [
        { 
            icon: "fa fa-angle-double-left",
            data: "0",
            disabled: s === 0
        },
        { 
            icon: "fa fa-angle-left", 
            data: (s - 1).toString(), 
            disabled: s === 0 
        }
    ];
    let rightOperators = [
        { 
            icon: "fa fa-angle-right", 
            data: (s + 1).toString(), 
            disabled: s === panels.length - 1 
        },
        { 
            icon: "fa fa-angle-double-right", 
            data: panels.length - 1, 
            disabled: s === panels.length-1 
        }
    ];
    let panelList = panels.map(
        function(e, i){
            return {
                title: props.panels[e].toString(),
                data: panels[e].toString(),
                class: (props.current == e) ? "box-padding pointer highlight-nav nav-reserva" : "pointer highlight-hover box-padding nav-reserva text"
            }
        }
    );
    return (
        <div>
            <List 
                clickHandler={props.click} 
                displayList="nav-list flex-row" 
                elemClass="light-danger nav-reserva pointer" 
                elems={[...leftOperators, ...panelList, ...rightOperators]} />
        </div>
    );
}
export default React.memo(Paginado);
