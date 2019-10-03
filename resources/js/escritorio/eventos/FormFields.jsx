
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input components
 */

import { Numeric } from '../../componentes/input/Numeric';
import { Text } from '../../componentes/input/Text';
import { MultipleSelect } from '../../componentes/input/MultipleSelect';

const SelectData = {
    promociones: {
        name: "promociones",
        show: false,
        selected: [],
        search: "",
        input: React.createRef(),
        list: {}
    },
    feriados: {
        name: "feriados",
        show: false,
        selected: [],
        search: "",
        input: React.createRef(),
        list: {}
    },
    horarios: {
        name: "horarios",
        show: false,
        selected: [],
        search: "",
        input: React.createRef(),
        list: {}
    }
};

export const FormFields = (props) => {
    const promociones = SelectData.promociones,
        horarios = SelectData.horarios,
        feriados = SelectData.feriados;

    if (props.editar) {
        promociones.selected = Object.keys(props.selected.promociones.list) || [];
        promociones.list = props.all.promociones.list;
        horarios.selected = Object.keys(props.selected.horarios.list) || [];
        horarios.list = props.all.horarios.list;
        feriados.selected = Object.keys(props.selected.feriados.list) || [];
        feriados.list = props.all.feriados.list;
    } else {
        promociones.selected = [];
        promociones.list = props.promociones.list;
        horarios.selected = [];
        horarios.list = props.horarios.list;
        feriados.selected = [];
        feriados.list = props.feriados.list;
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
                <div className="col-md-6">
                    <div>
                        <h6 className="highlight no-margin bold">Promociones</h6>
                        <MultipleSelect
                            select={promociones}
                            titulo="selecciona las promociones"
                            optionData={promociones.list} />
                    </div>
                    <div className="v-padding">
                        <h6 className="highlight no-margin bold">Horarios</h6>
                        <MultipleSelect
                            select={horarios}
                            titulo="selecciona los horarios"
                            optionData={horarios.list} />
                    </div>
                    <div className="v-padding">
                        <h6 className="highlight no-margin bold">Feriados</h6>
                        <MultipleSelect
                            select={feriados}
                            titulo="selecciona los feriados"
                            optionData={feriados.list} />
                    </div>
                </div>
            </div>
        </div>
    )
}