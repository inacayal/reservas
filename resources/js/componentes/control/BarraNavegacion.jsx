import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonList from '../complex/allUse/ButtonList';

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
        <div className="container border-bottom">
            <div className="row">
                <div className="col-sm-8">
                    <h4>
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
        </div>
    );
}
export default React.memo(BarraNavegacion);
