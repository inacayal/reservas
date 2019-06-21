import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BarraLateral from '../../componentes/control/BarraLateral';

function Lateral(props) {
    return (
        <div>
            <BarraLateral />
        </div>
    );
}
export default React.memo(Lateral);
