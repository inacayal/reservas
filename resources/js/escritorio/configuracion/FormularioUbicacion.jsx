/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import { Text } from '../../componentes/input/Text';
import { Select } from '../../componentes/input/Select';

const SelectData = {
    ubicacion: {
        name: "ubicacion",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {
            1: "Provincia de Buenos Aires",
            2: "Capital Federal",
            3: "Catamarca",
            4: "Chaco",
            5: "Chubut",
            6: "Córdoba",
            7: "Corrientes",
            8: "Entre Ríos",
            9: "Formosa",
            10: "Jujuy",
            11: "La Pampa",
            12: "La Rioja",
            13: "Mendoza",
            14: "Misiones",
            15: "Neuquén",
            16: "Río Negro",
            17: "Salta",
            18: "San Juan",
            19: "San Luis",
            20: "Santa Cruz",
            21: "Santa Fé",
            22: "Santiago del Estero",
            23: "Tierra del Fuego",
            24: "Tucumán"
        }
    }
};

export const FormularioUbicacion = (props)  => {
    SelectData.ubicacion.selected = (props.data.provincia||{}).id||"";
    const ubicacion = SelectData.ubicacion;
    return (
        <div className="row v-padding">
            <div className="col-md-6">
                <h6 className="highlight no-margin bold">Provincia</h6>
                <Select
                    select={ubicacion}
                    titulo="selecciona la provincia" />
            </div>
            <div className="col-md-6">
                <Text
                    rows={4}
                    titulo="Dirección del local"
                    name="direccion"
                    value={props.data.direccionLocal}
                    classes={"border-box input-text margin-box"}
                    container="full-width" />
            </div>
        </div>
    )
}