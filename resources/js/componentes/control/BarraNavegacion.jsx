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
        <>
            <div className="col-sm-8 relative">
                <h4 className="bold align-bottom white-font">
                    {user.nombre}
                </h4>
            </div>
            <div className="col-sm-4">
                <ButtonList selected = {false}
                            clickHandler={props.func}
                            displayList="full-width h-padding text-right nav-list align-bottom"
                            elemClass="inline-block btn reduce-padding white-font"
                            elems={items} />
            </div>
        </>
    );
}
export default React.memo(BarraNavegacion);
