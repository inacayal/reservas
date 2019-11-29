/**
 * react basic
 */
import React, {
    Component,
    useState,
    useEffect
} from 'react';
import {
    DAYS,
    MONTHS,
    HOURS
} from '../../../constantes/DaysMonths';
import ReactDOM from 'react-dom';
import {Select} from '../../../componentes/input/Select';
import {Text} from '../../../componentes/input/Text';

export const SelectFields = (props) => {
    const   fields = props.fields,
            select = {
                apertura_reserva_hora: {
                    name: "apertura_reserva_hora",
                    selected: fields.apertura_reserva_hora,
                    list: HOURS
                },
                apertura_reserva_minuto: {
                    name: "apertura_reserva_minuto",
                    selected: fields.apertura_reserva_minuto,
                    list: props.minutos
                },
                cierre_reserva_hora: {
                    name: "cierre_reserva_hora",
                    selected: fields.cierre_reserva_hora,
                    list: HOURS,
                },
                cierre_reserva_minuto: {
                    name: "cierre_reserva_minuto",
                    selected: fields.cierre_reserva_minuto,
                    list: props.minutos
                },
                apertura_atencion_hora: {
                    name: "apertura_atencion_hora",
                    selected: fields.apertura_atencion_hora,
                    list: HOURS
                },
                apertura_atencion_minuto: {
                    name: "apertura_atencion_minuto",
                    selected: fields.apertura_atencion_minuto,
                    list: props.minutos
                },
                cierre_atencion_hora: {
                    name: "cierre_atencion_hora",
                    selected: fields.cierre_atencion_hora,
                    list: HOURS
                },
                cierre_atencion_minuto: {
                    name: "cierre_atencion_minuto",
                    selected: fields.cierre_atencion_minuto,
                    list: props.minutos
                }
            };
    return (
        <>
            <div className="col-md-12">
                <div className="row ">
                    <div className="sub-title light-danger full-width">
                        Reserva
                    </div>
                    <div className="left-padding col-md-12 mid-font">
                        Apertura
                    </div>
                    <div className="col-sm-5 h-padding text-left"
                         style={{paddingLeft:"20px"}}>
                         <Select titulo="Hora"
                                 changeSelect={props.change}
                                 errors={props.errors.apertura_reserva_hora}
                                 {...select.apertura_reserva_hora}/>
                    </div>
                    <div className="col-sm-1 text-center v-align-center h-padding">
                        <h6 className="c-title"
                            style={{ color: "#bfbfbf" }}>
                            :
                        </h6>
                    </div>
                    <div className="col-md-5 text-left relative visible h-padding">
                        <Select titulo="Minuto"
                                changeSelect={props.change}
                                errors={props.errors.apertura_reserva_minuto}
                                {...select.apertura_reserva_minuto}/>
                    </div>
                    <div className="col-sm-1 text-center v-align-center h-padding">
                        <h6 className="text">
                            horas
                        </h6>
                    </div>
                </div>
                <div className="row">
                    <div className="left-padding col-md-12 mid-font">
                        Cierre
                    </div>
                    <div className="col-sm-5 h-padding text-left">
                        <Select titulo="Hora"
                                changeSelect={props.change}
                                errors={props.errors.cierre_reserva_hora}
                                {...select.cierre_reserva_hora}/>
                    </div>
                    <div className="col-sm-1 text-center v-align-center h-padding">
                        <h6 className="c-title"
                            style={{ color: "#bfbfbf" }}>
                            :
                        </h6>
                    </div>
                    <div className="col-md-5 text-left relative visible h-padding">
                        <Select titulo="Minutos"
                                changeSelect={props.change}
                                errors={props.errors.cierre_reserva_minuto}
                                {...select.cierre_reserva_minuto}/>
                    </div>
                    <div className="col-sm-1 text-center v-align-center h-padding">
                        <h6 className="text">
                            horas
                        </h6>
                    </div>
                </div>
                <div className="row v-padding">
                    <div className="sub-title light-danger full-width">
                        Atención
                    </div>
                    <div className="left-padding col-md-12 mid-font">
                        Apertura
                    </div>
                    <div className="col-sm-5 h-padding text-left left-padding">
                        <Select titulo="Hora"
                                changeSelect={props.change}
                                errors={props.errors.apertura_atencion_hora}
                                {...select.apertura_atencion_hora}/>
                    </div>
                    <div className="col-sm-1 text-center v-align-center h-padding">
                        <h6 className="c-title"
                            style={{ color: "#bfbfbf" }}>
                            :
                        </h6>
                    </div>
                    <div className="col-md-5 text-left h-padding">
                        <Select titulo="Minutos"
                                changeSelect={props.change}
                                errors={props.errors.apertura_atencion_minuto}
                                {...select.apertura_atencion_minuto}/>
                    </div>
                    <div className="col-sm-1 text-center v-align-center h-padding">
                        <h6 className="text">
                            horas
                        </h6>
                    </div>
                </div>
                <div className="row">
                    <div className="left-padding col-md-12 mid-font">
                        Cierre
                    </div>
                    <div    className="col-sm-5 h-padding text-left"
                            style={{ paddingLeft: "20px" }}>
                        <Select titulo="Horas"
                                changeSelect={props.change}
                                errors={props.errors.cierre_atencion_hora}
                                {...select.cierre_atencion_hora}/>
                    </div>
                    <div className="col-sm-1 text-center v-align-center h-padding">
                        <h6 className="c-title"
                            style={{ color: "#bfbfbf" }}>
                            :
                        </h6>
                    </div>
                    <div className="col-md-5 text-left relative visible h-padding">
                        <Select titulo="Minutos"
                                changeSelect={props.change}
                                errors={props.errors.cierre_atencion_minuto}
                                {...select.cierre_atencion_minuto}/>
                    </div>
                    <div className="col-sm-1 text-center v-align-center h-padding">
                        <h6 className="text">
                            horas
                        </h6>
                    </div>
                </div>
            </div>
        </>
    );
}
