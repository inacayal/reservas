import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

import Text from '../../../../componentes/input/Text';
import Button from '../../../../componentes/basic/Button';
import Select from '../../../../componentes/input/Select';
import Toggle from '../../../../componentes/basic/Toggle';
//Constants
import {DAYS,MONTHS,HOURS} from '../../../../constantes/DaysMonths';
import generateHoursFromInterval from '../../../../funciones/generateHoursFromInterval';
export default class AgregarFormulario extends Component {
    constructor(props){
        super(props);
        this.validMinutes = generateHoursFromInterval(10);
        this.state = {
            date: new Date(),
            right: true,
            text: {
                descripcion: {
                    value: ""
                }
            },
            editar:false,
            select: {
                apertura_hora: {
                    name: "apertura_hora",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: HOURS
                },
                apertura_minuto: {
                    name: "apertura_minuto",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: this.validMinutes
                },
                cierre_hora: {
                    name: "cierre_hora",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: HOURS
                },
                cierre_minuto: {
                    name: "cierre_minuto",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: this.validMinutes
                }
            }
        }

        this.agregarFeriado = this.agregarFeriado.bind(this);
        this.editarFeriado = this.editarFeriado.bind(this);

        this.onTextChange = this.onTextChange.bind(this);
        this.showOptions = this.showOptions.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.changeToggleSide = this.changeToggleSide.bind(this);
        this.calendarChange = this.calendarChange.bind(this);

    }

    onTextChange(e) {
        let input = e.currentTarget,
            name = input.getAttribute('name'),
            textInputs = this.state.text;

        textInputs[name].value = input.value;
        this.setState({ text: textInputs });
    }

    agregarFeriado() {
        let select = this.state.select,
            textInput = this.state.text;

        select.apertura_hora.selected = null;
        select.apertura_minuto.selected = null;
        select.cierre_hora.selected = null;
        select.cierre_minuto.selected = null;
        textInput.descripcion.value = "";

        this.setState({
            date: new Date(),
            select: select,
            text: textInput,
            right: true,
            editar:false
        });
    }

    showOptions(e) {
        let name = e.currentTarget.getAttribute('select'),
            select = this.state.select,
            trigger = select[name];

        trigger.show = !trigger.show;
        select[name] = trigger;
        this.setState({ select });
    }

    selectOption(e) {
        let value = e.target.getAttribute('keyvalue'),
            name = e.target.getAttribute('select'),
            select = this.state.select,
            trigger = select[name];
        trigger.selected = (value !== select[name].selected) ? value : null;
        select[name] = trigger;
        this.setState({ select });
    }

    editarFeriado(dateString) {
        let feriado = this.props.data[dateString],
            date = new Date(dateString),
            apertura = feriado.apertura.split(':'),
            cierre = feriado.cierre.split(':'),
            select = this.state.select,
            textInput = this.state.text;
        select.apertura_hora.selected = apertura[0];
        select.apertura_minuto.selected = apertura[1];
        select.cierre_hora.selected = cierre[0];
        select.cierre_minuto.selected = cierre[1];
        textInput.descripcion.value = feriado.descripcion;

        this.setState({
            select: select,
            date: date,
            right: feriado.estado === 1,
            text: textInput,
            editar:true
        });
    }

    changeToggleSide(e) {
        e.preventDefault();
        this.setState({ right: !this.state.right });
    }

    calendarChange(date) {
        this.setState({date: date});
    }

    componentDidUpdate(prevProps,prevState){
        if (prevProps.show)
            if (this.props.editar.enable)
                this.editarFeriado(this.props.editar.data);
        else if (!this.props.editar.enable) this.agregarFeriado();
    }

    render(){
        return (
            <div className="box-padding container">
                <form className="box-padding row">
                    <div className="container">
                        <div className="row">
                            <div className={this.props.showCalendar ? "col-md-6 box-padding" : "hidden"}>
                                <Calendar 
                                    value={this.state.date} 
                                    onChange={this.calendarChange} />
                            </div>
                            <div className={this.props.showCalendar ? "col-md-6 box-padding" : "col-md-12 box-padding"}>
                                <div className="container">
                                    <div className="row sub-title">
                                        {(this.props.editar.enable) ? 
                                            "Editando " + DAYS[this.state.date.getDay()] + " " + this.state.date.getDate() + " " + MONTHS[this.state.date.getMonth()] + " " + this.state.date.getFullYear()
                                            : "Agregar día Feriado"
                                        }
                                    </div>
                                    <div className="row justify-content-end">
                                        <Toggle
                                            rightTitle="Laboral"
                                            leftTitle="No laboral"
                                            name="estado"
                                            right={this.state.right}
                                            changeSide={this.changeToggleSide}/>
                                    </div>
                                    <div className={this.state.right ? "row" : "hidden"}>
                                        <div className="no-padding col-md-12 bold light-danger">Apertura</div>
                                        <div className="col-sm-4 no-padding">
                                            <Select
                                                {...this.state.select.apertura_hora}
                                                titulo  ="horas"
                                                change={this.selectOption}
                                                toggle={this.showToggle}  />
                                        </div>
                                        <div className="col-sm-2 no-padding bold align-center">
                                            horas
                                        </div>
                                        <div className="col-sm-4 no-padding ">
                                            <Select
                                                {...this.state.select.apertura_minuto}
                                                titulo="minutos"
                                                change={this.selectOption}
                                                toggle={this.showToggle} />
                                        </div>
                                        <div className="col-sm-2 no-padding bold align-center">
                                            minutos
                                        </div>
                                    </div>
                                    <div className={this.state.right ? "row" : "hidden"}>
                                        <div className="no-padding col-md-12 bold light-danger">Cierre</div>
                                        <div className="col-sm-4 no-padding ">
                                            <Select
                                                {...this.state.select.cierre_hora}
                                                titulo="horas"
                                                change={this.selectOption}
                                                toggle={this.showToggle}  />
                                        </div>
                                        <div className="col-sm-2 no-padding bold align-center">
                                            horas
                                        </div>
                                        <div className="col-sm-4 no-padding ">
                                            <Select
                                                {...this.state.select.cierre_minuto}
                                                titulo="minutos"
                                                change={this.selectOption}
                                                toggle={this.showToggle} />
                                        </div>
                                        <div className="col-sm-2 no-padding bold align-center">
                                            minutos
                                        </div>
                                    </div>
                                    <div className="row" >
                                        <div className="col-md-12 no-padding">
                                            <Text 
                                                changeValue={this.onTextChange}
                                                titulo="Descripción" 
                                                name="descripcion" 
                                                value={this.state.text.descripcion.value} 
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
                                            click={this.props.cancelar}
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
                                            click={this.props.guardarFeriado}
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
}