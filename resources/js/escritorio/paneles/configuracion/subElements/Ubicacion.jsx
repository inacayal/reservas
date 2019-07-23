import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Text from '../../../../componentes/input/Text';
import Select from '../../../../componentes/input/Select';

export default function Ubicacion(props) {
    return (
        <div className={props.show ? "row" : "hidden"}>
            <div className="sub-title full-width h-padding border-bottom">Ubicación del local</div>
            <div className="col-sm-6 box-padding">
                <h6 className="bold light-danger"> Provincia </h6>
                <Select
                    {...props.select.id_provincia}
                    titulo="Selecciona la provincia"
                    change={props.selectOption}
                    toggle={props.showOptions} />
            </div>
            <div className="col-sm-6 box-padding">
                <Text
                    container="full-width"
                    changeValue={props.onTextChange}
                    titulo="Dirección"
                    name="direccion_local"
                    rows={1}
                    value={props.text.direccion_local}
                    classes="border-box input-text margin-box full-width" />
            </div>
        </div>
    );
}