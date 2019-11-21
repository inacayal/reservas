/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Titulo from '../../../componentes/basic/Titulo';
import {Numeric} from '../../../componentes/input/Numeric';
import {Text} from '../../../componentes/input/Text';
import Validator from '../../../hocs/Validator';

export function Formulario (props) {
    if (props.editar)
        props.nav.buttons[0].click = props.toggleModal;
    const data = props.data||{};
    return (
        <>
            <Titulo
                title={props.editar
                ? data.nombre
                : "Agregar ubicación"}
                links={props.nav.links}
                buttons={props.nav.buttons} />
            <div className="container">
                <div className="row">
                    <div className="col-md-4 bold">
                        foto de la ubicacion
                    </div>
                    <div className="col-md-8 container">
                        <div className="row">
                            <Text
                                rows={1}
                                titulo="Nombre de la ubicación"
                                name="nombre"
                                value={props.fields.nombre}
                                changeHandler={props.change}/>
                        </div>
                        <div className="row v-padding">
                            <Text
                                rows={4}
                                titulo="Descripcion"
                                name="descripcion"
                                value={props.fields.descripcion}
                                changeHandler={props.change}/>
                        </div>
                    </div>
                </div>
                <div className="row v-padding">
                    <div className="col-md-6">
                        <Numeric
                            titulo="Capacidad máxima"
                            name="capacidad_maxima"
                            value={props.fields.capacidad_maxima}
                            changeHandler={props.change}/>
                        <span className="smaller-text">Máximo de personas en la ubicación</span>
                    </div>
                    <div className="col-md-6">
                        <Numeric
                            titulo="Máximo personas"
                            name="maximo_personas"
                            value={props.fields.maximo_personas}
                            changeHandler={props.change}/>
                        <span className="smaller-text">Máximo de personas en una reservación</span>
                    </div>
                </div>
            </div>
        </>
    );
}
