import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List from '../misc/List';

function BarraLateral(props) {
    
    return (

        <ul className="option-list">
            <li className="option"> Opcion 1</li>
            <li className="option"> Opcion 2</li>
            <li className="option"> Opcion 3</li>
            <li className="option"> Opcion 4</li>
            <li className="option"> Opcion 5</li>
        </ul>
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
export default React.memo(BarraLateral);
