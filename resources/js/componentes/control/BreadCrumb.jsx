import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function BreadCrumb(props) {
    return (
        <ul className="option-list no-border flex-row">
            <li className="option"> Opcion 1</li>
            <li className="option"> Opcion 2</li>
            <li className="option"> Opcion 3</li>
            <li className="option"> Opcion 4</li>
            <li className="option"> Opcion 5</li>
        </ul>
    );
}
export default React.memo(BreadCrumb);
