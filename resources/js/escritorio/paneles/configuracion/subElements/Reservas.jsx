/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input components
 */
import { Select } from '../../../../componentes/input/Select';
/**
 * components
 */
import ButtonList from '../../../../componentes/basic/ButtonList';
export default function Reservas (props) {
    return (
        <form className={props.show ? "full-width" : "hidden"}>
            <div className="container">
                <div className="row v-padding">
                    <div className="col-md-6">
                        <h6 className="highlight bold no-margin">
                            Defina el intervalo permitido para la reserva.
                            </h6>
                        <Select
                            {...props.intervalo}
                            titulo="selecciona el intervalo de la reserva"
                            toggle={props.showOptions}
                            change={props.selectOption} />
                    </div>
                    <div className="col-md-6">
                        <h6 className="highlight bold no-margin">
                            Defina la duración máxima de la reserva.
                            </h6>
                        <Select
                            {...props.caida}
                            titulo="selecciona la duración máxima de la reserva"
                            toggle={props.showOptions}
                            change={props.selectOption} />
                    </div>
                </div>
            </div>
        </form>
    );
}