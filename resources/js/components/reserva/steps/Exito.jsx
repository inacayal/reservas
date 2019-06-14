import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from "../../input/Select.jsx";

function Exito(props) {
    return (
        <div className={(props.show) ? "half-width" : "hidden"}>
        </div>
    );
}

export default Exito;
//<Select {...props.select} titulo="Selecciona la ubicación donde quieres estar" change={props.change} toggle={props.showToggle} />