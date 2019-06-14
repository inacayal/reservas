import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from "../../input/Select.jsx";
import Text from "../../input/Text.jsx";

function Datos(props) {
    return (
        <div className={(props.show) ? "align-center flex flex-column v-center" : "hidden"}>
            <h1 className="highlight-title">Déjanos tus datos</h1>
            <div className="flex flex-row h-center full-width">
                <Text titulo="Nombre" name="nombre" value={props.nombre} classes={"border-box input-text margin-box"} container="half"/>
                <Text titulo="Apellido" name="apellido" value={props.apellido} classes={"border-box input-text margin-box"} container="half"/>
            </div>
            <div className="flex flex-row h-center full-width">
                <Text titulo="Correo Electrónico" name="correo" value={props.correo} classes={"border-box input-text margin-box"} container="full-width"/>
            </div>
            <div className="flex flex-row h-center full-width">
                <Text titulo="Teléfono" name="telefono" value={props.telefono} classes={"border-box input-text margin-box"} container="full-width"/>
            </div>
            <div className="flex flex-row h-center full-width">
                <Text titulo="Número de Documento" name="dni" value={props.dni} classes={"border-box input-text margin-box"} container="full-width"/>
            </div>
        </div>
    );
}

export default Datos;
//<Select {...props.select} titulo="Selecciona la ubicación donde quieres estar" change={props.change} toggle={props.showToggle} />