/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
/**
 * elements
 */
import ButtonList from '../../../componentes/basic/ButtonList';
import { Toggle } from '../../../componentes/input/Toggle';
import LoadBar from '../../../componentes/control/LoadBar';
/**
 * input elements and handlers
 */
import { Select } from '../../../componentes/input/Select';
import { Text } from '../../../componentes/input/Text';
/**
 * constants
 */
import {DAYS,MONTHS,HOURS} from '../../../constantes/DaysMonths';
import generateHoursFromInterval from '../../../funciones/generateHoursFromInterval';
/**
 * api
 */
import { GET } from '../../../utils/api';
export default class AgregarFormulario extends Component {
    constructor(props){
        super(props);
        this.validMinutes = generateHoursFromInterval(10);
        this.state = {
            date: new Date(),
            right: true,
            isLoading: true,
            loadFinished: false,
            text: {
                descripcion: ""
            },
            select: {
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
                    list: this.validMinutes
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
                    list: this.validMinutes
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
                    list: this.validMinutes
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
                    list: this.validMinutes
                }
            }
        }
        
        this.calendarChange = this.calendarChange.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this)
        this.fetchData = this.fetchData.bind(this)
    }

    calendarChange(date) {
        this.setState({date: date});
    }

    downloadHandler(pEvent) {
        let
            loading = Math.round((pEvent.loaded * 100) / pEvent.total),
            state = loading !== 100 ?
                { loading, loadFinished: false }
                : { loading, loadFinished: true };
        this.setState(state);
    }

    fetchData(date) {
        this.setState({
            data: null,
            isLoading: true,
            loadFinished: false
        });
        const request = GET({
            endpoint: '/feriados/27/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ date: date, data: response.data.data || {}, intervalo: response.data.intervalo.id });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }

    componentDidMount() {
        this.fetchData(this.state.date);
    }

    render(){
        if (this.state.data && this.state.loadFinished)
            return (
                <form className="full-width">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <Calendario
                                    showDate={props.showDate}
                                    minDate={props.minDate}
                                    data={props.data}
                                    changeHover={changeHover}
                                    fetch={props.fetch}
                                    clickCallback={props.clickCallback}/>
                                <span className="bold smaller-text text-center">* Los días inhabilitados ya tienen feriados asignados</span>
                            </div>
                            <div className="col-lg-6">
                                <div className="container">
                                    <div className="row sub-title border-bottom">
                                        {this.props.title}
                                    </div>
                                    <div className="row justify-content-end">
                                        <Toggle
                                            rightTitle="Laboral"
                                            leftTitle="No laboral"
                                            name="estado"/>
                                    </div>
                                    <div className="container row full-width no-margin no-padding">
                                        <div className="col-md-12 no-padding no-margin">
                                            <div className="container row no-padding no-margin">
                                                <div className={this.state.right ? "col-md-12 box-padding" : "hidden"}>
                                                    <div className="row">
                                                        <div className="bold light-danger border-bottom full-width">Horarios de Reserva</div>
                                                        <div className="no-padding col-md-12 bold">Apertura</div>
                                                        <div className="col-sm-4 no-padding">
                                                            <Select
                                                                {...this.state.select.apertura_reserva_hora}
                                                                titulo="horas"
                                                                change={this.selectOption}
                                                                toggle={this.showOptions} />
                                                        </div>
                                                        <div className="col-sm-2 no-padding align-center">
                                                            horas
                                                        </div>
                                                        <div className="col-sm-4 no-padding ">
                                                            <Select
                                                                {...this.state.select.apertura_reserva_minuto}
                                                                titulo="minutos"
                                                                change={this.selectOption}
                                                                toggle={this.showOptions} />
                                                        </div>
                                                        <div className="col-sm-2 no-padding align-center">
                                                            minutos
                                                        </div>              
                                                    </div>
                                                    <div className="row">
                                                        <div className="no-padding col-md-12 bold">Cierre</div>
                                                        <div className="col-sm-4 no-padding ">
                                                            <Select
                                                                {...this.state.select.cierre_reserva_hora}
                                                                titulo="horas"
                                                                change={this.selectOption}
                                                                toggle={this.showOptions} />
                                                        </div>
                                                        <div className="col-sm-2 no-padding align-center">
                                                            horas
                                                        </div>
                                                        <div className="col-sm-4 no-padding ">
                                                            <Select
                                                                {...this.state.select.cierre_reserva_minuto}
                                                                titulo="minutos"
                                                                change={this.selectOption}
                                                                toggle={this.showOptions} />
                                                        </div>
                                                        <div className="col-sm-2 no-padding align-center">
                                                            minutos
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="bold light-danger border-bottom top-padding full-width">Horarios de Atención</div>
                                                        <div className="no-padding col-md-12 bold">Apertura</div>
                                                        <div className="col-sm-4 no-padding">
                                                            <Select
                                                                {...this.state.select.apertura_atencion_hora}
                                                                titulo="horas"
                                                                change={this.selectOption}
                                                                toggle={this.showOptions} />
                                                        </div>
                                                        <div className="col-sm-2 no-padding align-center">
                                                            horas
                                                        </div>
                                                        <div className="col-sm-4 no-padding ">
                                                            <Select
                                                                {...this.state.select.apertura_atencion_minuto}
                                                                titulo="minutos"
                                                                change={this.selectOption}
                                                                toggle={this.showOptions} />
                                                        </div>
                                                        <div className="col-sm-2 no-padding align-center">
                                                            minutos
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="no-padding col-md-12 bold">Cierre</div>
                                                        <div className="col-sm-4 no-padding ">
                                                            <Select
                                                                {...this.state.select.cierre_atencion_hora}
                                                                titulo="horas"
                                                                change={this.selectOption}
                                                                toggle={this.showOptions} />
                                                        </div>
                                                        <div className="col-sm-2 no-padding align-center">
                                                            horas
                                                        </div>
                                                        <div className="col-sm-4 no-padding ">
                                                            <Select
                                                                {...this.state.select.cierre_atencion_minuto}
                                                                titulo="minutos"
                                                                change={this.selectOption}
                                                                toggle={this.showOptions} />
                                                        </div>
                                                        <div className="col-sm-2 no-padding align-center">
                                                            minutos
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 no-padding">
                                                    <Text
                                                        changeValue={this.onTextChange}
                                                        titulo="Descripción"
                                                        name="descripcion"
                                                        value={this.state.text.descripcion}
                                                        rows={4}
                                                        classes="border-box input-text margin-box full-width" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            );
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}