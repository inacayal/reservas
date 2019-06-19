import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from "../../componentes/input/Select.jsx";

function Local(props){
    return (
        <div className={(props.show) ? "" : "hidden"}>
            <h3 className="bold highlight-title">Seleccionar local</h3>
            <Select {...props.select} hideSearch={props.hideSearch} titulo="Selecciona el local donde vas a reservar" change={props.change} toggle={props.showToggle} />
        </div>
    );
}

export default Local;