/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import ButtonList from '../basic/ButtonList';
import Search from '../search/Search';

function BarraNavegacion(props) {
    let items = [
        {
            title: (
                <i className="fas fa-bars" />
            )
        }
    ];
    return (
        <div className="col-sm-8 relative v-padding">
            <h4 className="bold white-font">
                {user.nombre}
            </h4>
        </div>
    );
}
export default React.memo(BarraNavegacion);
