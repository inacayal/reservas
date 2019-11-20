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
            )
        }
    ];
    return (
        <>
            <div className="col-sm-8 relative">
                <h4 className="bold align-bottom white-font" style={{color:"white"}}>
                    {user.nombre}
                </h4>
            </div>
            <div className="col-sm-4 no-padding ">
                <ButtonList
                    selected = {false}
                    clickHandler={props.func}
                    displayList="full-width no-padding text-right nav-list align-bottom"
                    elemClass="light-danger inline-block btn c-title light-danger reduce-padding"
                    elems={items} />
            </div>
        </>
    );
}
export default React.memo(BarraNavegacion);
