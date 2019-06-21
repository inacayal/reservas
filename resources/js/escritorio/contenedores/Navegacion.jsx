import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BarraNavegacion from '../../componentes/control/BarraNavegacion';

//holds reservation state
function Navegacion (props){
    return (
        <div className="container add-padding">
            <div className="row">
                <div className="col-md-12">
                    <BarraNavegacion />
                </div>
            </div>
        </div>
    );
}
export default React.memo(Navegacion);
