/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from '../../../basic/Button';

const generateEvents = (
    eventoArray
) => eventoArray.map(
    (el, ind) =>
        <div key={ind} className="row">
            <div className="col-sm-4 bold smaller-text">{el.nombre}</div>
            <div className="col-sm-8 text-right inline-block smaller-text">{el.descripcion}</div>
        </div>
)

const DynamicList = (
    props
) => {
    const [show, toggle] = useState(false),
        elements = generateEvents(props.data);
    return (
        <div className="relative" >
            {
                show
                    ?
                    <div style={{ maxHeight: "20vh", overflowY: "auto" }} className="container v-padding">
                        {elements}
                    </div>
                    :
                    <div className="container v-padding">
                        {elements.slice(0,props.max)}
                    </div>
            }
            <Button
                container={show ? "full-width v-padding" : "overlay-gradient full-cover"}
                class={show ? "box-transparent full-width text-center c-title gradient-background box-padding" : "full-cover box-transparent transparent-font c-title gradient-background"}
                click={(e) => { e.preventDefault(); toggle(!show) }}
                title={show
                    ?
                    <i className="fas fa-minus-circle highlight-title" />
                    :
                    <i className="fas fa-plus-circle" />
                } />
        </div>
    )
}

export default DynamicList;