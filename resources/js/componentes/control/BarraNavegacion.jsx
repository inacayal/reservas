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
            title:(
                <i className="fas fa-bell"/>
            ),
            class: "btn highlight-title reduce-padding margin-box"
        },
        {
            title: (
                <i className="fas fa-power-off" />
            ),
            class:"btn light-danger margin-box reduce-padding"
        }
    ];
    return (
        <div className="row border-bottom dark-background add-padding">
            <div className="col-sm-8">
                <h4 className="bold">
                    Nombre de usuario
                </h4>
            </div>
            <div className="col-sm-4 no-padding">
                <ButtonList
                    clickHandler={props.func}
                    displayList="flex-row h-end nav-list"
                    elemClass="light-danger nav-reserva pointer"
                    elems={items} />
            </div>
        </div>
    );
}
export default React.memo(BarraNavegacion);
