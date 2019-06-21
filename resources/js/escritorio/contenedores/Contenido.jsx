import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BreadCrumb from '../../componentes/control/BreadCrumb';
function Contenido (props) {
    return (
        <div className="container">
            <div className="row">
                <div className="row box-margin box-padding">
                    <BreadCrumb />
                </div>
                <div className="col-md-12">
                    Contenido
                </div>
            </div>
        </div>
    );
}
export default React.memo(Contenido);
