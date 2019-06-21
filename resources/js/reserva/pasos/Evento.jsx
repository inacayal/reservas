import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from "../../componentes/input/Select.jsx";
import Text from "../../componentes/input/Text.jsx";
import Calendar from 'react-calendar';

function Evento(props) {
    return (
        <div className={(props.current) ? "container" : "hidden"}>
            <h3 className="bold highlight-title align-center">datos de la reserva</h3>
            <div className="row box-padding justify-content-center">
                <div className="col-sm-5 box-padding">
                    <input type="date" value={props.value} className="hidden" />
                    <Calendar value={props.value} onChange={props.onCalendarChange} />
                </div>
                <div className="col-md-7 box-padding">
                    <div className="row">
                        <div className="col-md-12 text-left">
                            <h6 className="highlight bold no-margin">selecciona el evento</h6>
                            <Select {...props.ubicacion} titulo="selecciona tipo de evento de tu reserva" change={props.change} toggle={props.showToggle} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-left">
                            <h6 className="highlight bold no-margin">selecciona tu ubicación</h6>
                            <Select {...props.eventos} titulo="selecciona la ubicación donde quieres estar" change={props.change} toggle={props.showToggle} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 text-left">
                            <h6 className="highlight bold no-margin">selecciona las personas</h6>
                            <Select {...props.persona} titulo="selecciona la cantidad de personas" change={props.change} toggle={props.showToggle} />
                        </div>
                        <div className="col-md-6 text-left">
                            <h6 className="highlight bold no-margin">selecciona la hora</h6>
                            <Select {...props.hora} titulo="selecciona la hora de la reserva" change={props.change} toggle={props.showToggle} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h6 className="highlight bold no-margin text-left">
                                {"horario de atención del:"}<br/>
                                <span className="text">{""+props.fecha}</span>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row box-padding">
                <h3 className="bold highlight-title align-center">datos de contacto</h3>
            </div>
            <div className="row box-padding">
                <div className="col-sm-4">
                    <Text titulo="nombre  y apellido" name="name" value={props.nombre} classes={"border-box input-text margin-box"} />
                </div>
                <div className="col-sm-4">
                    <Text titulo="correo electrónico" name="email" value={props.correo} classes={"border-box input-text margin-box"} />
                </div>
                <div className="col-sm-4">
                    <Text titulo="teléfono" name="telefono" value={props.telefono} classes={"border-box input-text margin-box"} container="full-width" />
                </div>
            </div>
        </div>
    );
}

export default Evento;