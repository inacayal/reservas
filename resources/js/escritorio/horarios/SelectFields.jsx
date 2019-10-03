/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
/**
 * CONSTANTS
 */
import { DAYS, MONTHS, HOURS } from '../../constantes/DaysMonths';
/**
 * input
 */
import {Select} from '../../componentes/input/Select';
import {Text} from '../../componentes/input/Text';

const SelectData = {
    apertura_reserva_hora: {
        name: "apertura_reserva_hora",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: HOURS
    },
    apertura_reserva_minuto: {
        name: "apertura_reserva_minuto",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {}
    },
    cierre_reserva_hora: {
        name: "cierre_reserva_hora",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: HOURS
    },
    cierre_reserva_minuto: {
        name: "cierre_reserva_minuto",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {}
    },
    apertura_atencion_hora: {
        name: "apertura_atencion_hora",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: HOURS
    },
    apertura_atencion_minuto: {
        name: "apertura_atencion_minuto",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {}
    },
    cierre_atencion_hora: {
        name: "cierre_atencion_hora",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: HOURS
    },
    cierre_atencion_minuto: {
        name: "cierre_atencion_minuto",
        show: false,
        selected: null,
        search: "",
        input: React.createRef(),
        list: {}
    }
}

export const SelectFields = (props) => {
    const 
        aAM = SelectData.apertura_atencion_minuto,
        aAH = SelectData.apertura_atencion_hora,
        aRM = SelectData.apertura_reserva_minuto,
        aRH = SelectData.apertura_reserva_hora,
        cAM = SelectData.cierre_atencion_minuto,
        cAH = SelectData.cierre_atencion_hora,
        cRM = SelectData.cierre_reserva_minuto,
        cRH = SelectData.cierre_reserva_hora;

    aAM.list = props.minutos;
    aRM.list = props.minutos;
    cAM.list = props.minutos;
    cRM.list = props.minutos;

    if (props.editar){
        aAH.selected = props.data.apertura.atencion.hora;
        aAM.selected = props.data.apertura.atencion.minuto;
        cAH.selected = props.data.cierre.atencion.hora;
        cAM.selected = props.data.cierre.atencion.minuto;
        aRH.selected = props.data.apertura.reserva.hora;
        aRM.selected = props.data.apertura.reserva.minuto;
        cRH.selected = props.data.cierre.reserva.hora;
        cRM.selected = props.data.cierre.reserva.minuto;
    } else {
        aAH.selected = null;
        aAM.selected = null;
        cAH.selected = null;
        cAM.selected = null;
        aRH.selected = null;
        aRM.selected = null;
        cRH.selected = null;
        cRM.selected = null;
    }

    return (
        <>
            <div className="col-md-12">
                <div className="row ">
                    <div className="bold light-danger full-width">Atención</div>
                    <div className="left-padding col-md-12 bold">Apertura</div>
                    <div className="col-sm-5 h-padding text-left" style={{paddingLeft:"20px"}}>
                        <Select
                            select={aAH}
                            titulo="hora" />
                    </div>
                    <div className="col-sm-1 text-center v-align-center h-padding">
                        <h6 className="c-title" style={{ color: "#bfbfbf" }}>:</h6>
                    </div>
                    <div className="col-md-6 text-left relative visible h-padding">
                        <Select
                            select={aAM}
                            titulo="minutos" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-padding col-md-12 bold">Cierre</div>
                    <div className="col-sm-5 h-padding text-left" style={{ paddingLeft: "20px" }}>
                        <Select
                            select={cAH}
                            titulo="hora" />
                    </div>
                    <div className="col-sm-1 text-center v-align-center h-padding">
                        <h6 className="c-title" style={{ color: "#bfbfbf" }}>:</h6>
                    </div>
                    <div className="col-md-6 text-left relative visible h-padding">
                        <Select
                            select={cAM}
                            titulo="minutos"/>
                    </div>
                </div>
                <div className="row v-padding">
                    <div className="bold light-danger full-width">Reserva</div>
                    <div className="left-padding col-md-12 bold">Apertura</div>
                    <div className="col-sm-5 h-padding text-left left-padding" style={{ paddingLeft: "20px" }}>
                        <Select
                            select={aRH}
                            titulo="hora" />
                    </div>
                    <div className="col-sm-1 text-center v-align-center h-padding">
                        <h6 className="c-title" style={{ color: "#bfbfbf" }}>:</h6>
                    </div>
                    <div className="col-md-6 text-left h-padding">
                        <Select
                            select={aRM}
                            titulo="minutos" />
                    </div>
                </div>
                <div className="row">
                    <div className="left-padding col-md-12 bold">Cierre</div>
                    <div className="col-sm-5 h-padding text-left" style={{ paddingLeft: "20px" }}>
                        <Select
                            select={cRH}
                            titulo="hora" />
                    </div>
                    <div className="col-sm-1 text-center v-align-center h-padding">
                        <h6 className="c-title" style={{ color: "#bfbfbf" }}>:</h6>
                    </div>
                    <div className="col-md-6 text-left relative visible h-padding">
                        <Select
                            select={cRM}
                            titulo="minutos" />
                    </div>
                </div>
            </div>
        </>
    );
}
