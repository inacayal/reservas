import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from "../../input/Select.jsx";

function Local(props){
    return (
        <div className={(props.show) ? "" : "hidden"}>
            <h1 className="highlight-title">Seleccionar local</h1>
            <Select {...props.select} titulo="Selecciona el local donde vas a reservar" change={props.change} toggle={props.showToggle} />
        </div>
    );
}

export default Local;