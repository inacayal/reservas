import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Text from '../../../../componentes/input/Text';
import Button from '../../../../componentes/basic/Button';
import Select from '../../../../componentes/input/Select';
import Calendar from 'react-calendar';

export default function AgregarFormulario(props) {
    return (
        <div className="box-padding container">
            <div className="row">
                <Button
                    title={(
                        <div className="smaller-text text bold">
                            <i className="fas fa-eye inline-box side-margin" />
                            Ver Feriados
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
                                <div className="row">
                                    <div className="no-padding col-md-12 bold light-danger">Apertura</div>
                                    <div className="col-md-6">
                                            <Select
                                                {...props.select.apertura_hora}
                                                titulo  ="horas"
                                                change={props.change}
                                                toggle={props.showToggle} />
                                    </div>
                                    <div className="col-md-6">
                                            <Select
                                                {...props.select.apertura_minuto}
                                                titulo="minutos"
                                                change={props.change}
                                                toggle={props.showToggle} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="no-padding col-md-12 bold light-danger">Cierre</div>
                                    <div className="col-md-6">
                                        <Select
                                            {...props.select.cierre_hora}
                                            titulo="horas"
                                            change={props.change}
                                            toggle={props.showToggle} />
                                    </div>
                                    <div className="col-md-6">
                                        <Select
                                            {...props.select.cierre_minuto}
                                            titulo="minutos"
                                            change={props.change}
                                            toggle={props.showToggle} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 no-padding">
                                        <Text 
                                            titulo="Descripción" 
                                            name="descripcion" 
                                            value={props.nombre} 
                                            rows={4}
                                            classes="border-box input-text margin-box full-width" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <Button
                            title={(
                                <div className="smaller-text text bold">
                                    <i className="fas fa-check-circle inline-box side-margin" />
                                    Guardar
                                </div>
                            )}
                            type="submit"
                            click={props.agregarFeriado}
                            container="inline-block" 
                            class="box-transparent highlight-hover border-box button-border"
                            disabled={false} />
                    </div>
                </div>
            </form>
        </div>
    );
}