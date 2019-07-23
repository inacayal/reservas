import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Text from '../../../../componentes/input/Text';
import Select from '../../../../componentes/input/Select';

export default function AperturaCierre(props) {
    return(
        <div className={props.show ? "row justify-content-end" : "hidden"}>
            <div className="sub-title h-padding full-width border-bottom">Apertura y cierre del local</div>
            <div className="col-sm-7 box-padding">
                <h6 className="bold light-danger">Día de la semana</h6>
                <Select
                    {...props.select.apertura_dia}
                    titulo="Selecciona el día de apertura"
                    change={props.selectOption}
                    toggle={props.showOptions} />
            </div>
            <div className="col-sm-5 box-padding">
                <h6 className="bold light-danger">Apertura</h6>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Select
                                {...props.select.apertura_hora}
                                titulo="horas"
                                change={props.selectOption}
                                toggle={props.showOptions} />
                        </div>
                        <div className="col-md-6">
                            <Select
                                {...props.select.apertura_minuto}
                                titulo="minutos"
                                change={props.selectOption}
                                toggle={props.showOptions} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-5">
                <h6 className="bold light-danger">Cierre</h6>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Select
                                {...props.select.cierre_hora}
                                titulo="horas"
                                change={props.selectOption}
                                toggle={props.showOptions} />
                        </div>
                        <div className="col-md-6">
                            <Select
                                {...props.select.cierre_minuto}
                                titulo="minutos"
                                change={props.selectOption}
                                toggle={props.showOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}