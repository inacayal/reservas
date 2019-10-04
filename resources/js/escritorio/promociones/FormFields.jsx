
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input components
 */

import { Numeric } from '../../componentes/input/Numeric';
import { Text } from '../../componentes/input/Text';
import { MultipleSelect } from '../../componentes/input/MultipleSelect';

const SelectData = {
    eventos: {
        name: "eventos",
        show: false,
        selected: [],
        search: "",
        input: React.createRef(),
        list: {}
    }
};

export const FormFields = (props) => {
    const eventos = SelectData.eventos;
    if (props.editar) {
        eventos.selected = Object.keys(props.selected.eventos.list) || [];
        eventos.list = props.all.eventos.list;
    } else {
        eventos.selected = [];
        eventos.list = props.eventos.list;
    }
    return (
        <div className="container no-padding">
            <div className="row v-padding">
                <div className="col-md-6">
                    <div className="container">
                        <div className="row v-padding">
                            <Text rows={1} titulo="Nombre" name="nombre" value={props.editar ? props.selected.nombre : ""} classes={"border-box input-text margin-box"} container="full-width" />
                        </div>
                        <div className="row v-padding">
                            <Text rows={4} titulo="Descripción" name="descripcion" value={props.editar ? props.selected.descripcion : ""} classes={"border-box input-text margin-box"} container="full-width" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 top-padding">
                    <div>
                        <h6 className="highlight no-margin bold">Eventos</h6>
                        <MultipleSelect
                            select={eventos}
                            titulo="selecciona los eventos"
                            optionData={eventos.list} />
                    </div>
                    <div className="v-padding">
                        <Numeric titulo="Descuento" name="nombre" value={props.editar ? props.selected.descuento : ""} classes={"border-box input-text margin-box"} container="full-width" />
                    </div>
                </div>
            </div>
        </div>
    )
}