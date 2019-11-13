/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import ButtonList from '../basic/ButtonList';

function BarraNavegacion(props) {
    let items = [
        {
            title: (
                <i className="fas fa-bars" />
            ),
            class:"btn c-title light-danger margin-box reduce-padding"
        }
    ];
    return (
        <>
            <div className="col-sm-8 relative">
                <h4 className="bold align-bottom">
                    {user.nombre}
                </h4>
            </div>
            <div className="col-sm-4 no-padding relative">
                <ButtonList
                    clickHandler={props.func}
                    displayList="full-width no-padding text-right nav-list align-bottom"
                    elemClass="light-danger nav-reserva pointer inline-block"
                    elems={items} />
            </div>
        </>
    );
}
export default React.memo(BarraNavegacion);
