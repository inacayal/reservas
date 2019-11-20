/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import { Select } from '../../componentes/input/Select';

const SelectData = {
    intervalo: {
        name: "intervalo",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {
            1: "1 minuto",
            2: "2 minutos",
            3: "3 minutos",
            5: "5 minutos",
            4: "4 minutos",
            6: "6 minutos",
            10: "10 minutos",
            12: "12 minutos",
            15: "15 minutos",
            20: "20 minutos",
            30: "30 minutos"
        }
    },
    caida: {
        name: "caida",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {
            10: "10 minutos",
            20: "20 minutos",
            30: "30 minutos",
            40: "40 minutos",
            50: "50 minutos"
        }
    },
    antelacion: {
        name: "antelacion",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {
            1: "1 horas",
            2: "2 horas",
            3: "3 horas",
            4: "4 horas",
            5: "5 horas",
            6: "6 horas",
            7: "7 horas",
            8: "8 horas",
            9: "9 horas",
            12: "12 horas",
            24: "24 horas",
            36: "36 horas"
        }
    }
};

export const FormularioReservas = (props)  => {

    SelectData.intervalo.selected = (props.data.intervalo||{}).id||"";
    SelectData.antelacion.selected = props.data.antelacionReserva||"";
    SelectData.caida.selected = props.data.caida||"";

    return (
        <>
            <div className="row v-padding">
                <div className="col-md-6">
                    <h6 className="highlight no-margin bold">Antelación de la reserva</h6>
                    <Select
                        select={SelectData.antelacion}
                        titulo="selecciona la antelación de la reserva" />
                </div>
                <div className="col-md-6">
                    <h6 className="highlight no-margin bold">Intervalo de la reserva</h6>
                    <Select
                        select={SelectData.intervalo}
                        titulo="selecciona el intervalo de reservas" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 v-padding">
                    <h6 className="highlight no-margin bold">Caída de la reserva</h6>
                    <Select
                        select={SelectData.caida}
                        titulo="selecciona el tiempo de caída de la reserva" />
                </div>
            </div>
        </>
    )
}
