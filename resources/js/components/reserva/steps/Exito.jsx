import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from "../../input/Select.jsx";

function Exito(props) {
    return (
        <div className={(props.show) ? "full-width" : "hidden"}>
            <h1 class="highlight-title">¡Has reservado exitosamente!</h1>
            <img src ="/checkmark-2.png" width="30%" />
        </div>
    );
}

export default Exito;
//<Select {...props.select} titulo="Selecciona la ubicación donde quieres estar" change={props.change} toggle={props.showToggle} />