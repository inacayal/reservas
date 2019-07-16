import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

import Text from '../../../../componentes/input/Text';
import Button from '../../../../componentes/basic/Button';
import Select from '../../../../componentes/input/Select';
import Toggle from '../../../../componentes/basic/Toggle';

import { DAYS, MONTHS } from '../../../../constantes/DaysMonths';

export default function AgregarFormulario(props) {
    return (
        <div className="box-padding container">
            <div className="row">
                <Button
                    title={(
                        <div className="smaller-text text bold">
                            <i className="fas fa-arrow-left inline-box side-margin" />
                            Volver
                        </div>
                    )}
                    click={props.verFeriados}
                    class="box-transparent highlight-hover border-box button-border inline-block"
                    disabled={false} />
            </div>
            <form className="box-padding row">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 box-padding">
                            <Calendar
                                value={props.date}
                                onChange={props.calendarChange} />
                        </div>
                        <div className="col-md-6 box-padding">
                            <div className="container">
                                <div className="row sub-title">
                                    {(props.editar) ?
                                        "Editando " + DAYS[props.date.getDay()] + " " + props.date.getDate() + " " + MONTHS[props.date.getMonth()] + " " + props.date.getFullYear()
                                        : "Agregar día Feriado"
                                    }
                                </div>
                                <div className="row justify-content-end">
                                    <Toggle
                                        rightTitle="Laboral"
                                        leftTitle="No laboral"
                                        name="estado"
                                        right={props.toggleSide}
                                        changeSide={props.changeSide} />
                                </div>
                                <div className={props.toggleSide ? "row" : "hidden"}>
                                    <div className="no-padding col-md-12 bold light-danger">Apertura</div>
                                    <div className="col-sm-4 no-padding">
                                        <Select
                                            {...props.select.apertura_hora}
                                            titulo="horas"
                                            change={props.change}
                                            toggle={props.showToggle} />
                                    </div>
                                    <div className="col-sm-2 no-padding bold align-center">
                                        horas
                                    </div>
                                    <div className="col-sm-4 no-padding ">
                                        <Select
                                            {...props.select.apertura_minuto}
                                            titulo="minutos"
                                            change={props.change}
                                            toggle={props.showToggle} />
                                    </div>
                                    <div className="col-sm-2 no-padding bold align-center">
                                        minutos
                                    </div>
                                </div>
                                <div className={props.toggleSide ? "row" : "hidden"}>
                                    <div className="no-padding col-md-12 bold light-danger">Cierre</div>
                                    <div className="col-sm-4 no-padding ">
                                        <Select
                                            {...props.select.cierre_hora}
                                            titulo="horas"
                                            change={props.change}
                                            toggle={props.showToggle} />
                                    </div>
                                    <div className="col-sm-2 no-padding bold align-center">
                                        horas
                                    </div>
                                    <div className="col-sm-4 no-padding ">
                                        <Select
                                            {...props.select.cierre_minuto}
                                            titulo="minutos"
                                            change={props.change}
                                            toggle={props.showToggle} />
                                    </div>
                                    <div className="col-sm-2 no-padding bold align-center">
                                        minutos
                                    </div>
                                </div>
                                <div className="row" >
                                    <div className="col-md-12 no-padding">
                                        <Text
                                            changeValue={props.changeTextValue}
                                            titulo="Descripción"
                                            name="descripcion"
                                            value={props.text.descripcion.value}
                                            rows={4}
                                            classes="border-box input-text margin-box full-width" />
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <Button
                                        title={(
                                            <div className="smaller-text text bold">
                                                <i className="fas fa-times-circle inline-box side-margin" />
                                                Cancelar
                                            </div>
                                        )}
                                        type="submit"
                                        click={props.verFeriados}
                                        container="inline-block side-margin"
                                        class="box-transparent highlight-hover border-box button-border"
                                        disabled={false} />
                                    <Button
                                        title={(
                                            <div className="smaller-text text bold">
                                                <i className="fas fa-check-circle inline-box side-margin" />
                                                Guardar
                                            </div>
                                        )}
                                        type="submit"
                                        click={props.agregarFeriado}
                                        container="inline-block side-margin"
                                        class="box-transparent highlight-hover border-box button-border"
                                        disabled={false} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}