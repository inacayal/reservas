/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
/**
 * elements
 */
import ButtonList from '../../../../componentes/basic/ButtonList';
import { changeToggleSide, Toggle } from '../../../../componentes/input/Toggle';
/**
 * input elements and handlers
 */
import { Select, showOptions, selectOption } from '../../../../componentes/input/Select';
import { Text, onTextChange } from '../../../../componentes/input/Text';
/**
 * constants
 */
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
                descripcion: ""
            },
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

        this.onTextChange = onTextChange.bind(this);
        this.showOptions = showOptions.bind(this);
        this.selectOption = selectOption.bind(this);
        this.changeToggleSide = changeToggleSide.bind(this);
        
        this.calendarChange = this.calendarChange.bind(this);

    }

    agregarFeriado() {
        let select = this.state.select,
            textInput = this.state.text;

        select.apertura_hora.selected = null;
        select.apertura_minuto.selected = null;
        select.cierre_hora.selected = null;
        select.cierre_minuto.selected = null;
        textInput.descripcion = "";

        this.setState({
            date: new Date(),
            select: select,
            text: textInput,
            right: true
        });
    }

    editarFeriado(dateString) {
        let feriado = this.props.data[dateString],
            date = new Date(parseInt(dateString)),
            apertura = feriado.apertura.split(':'),
            cierre = feriado.cierre.split(':'),
            select = this.state.select,
            textInput = this.state.text;
        select.apertura_hora.selected = apertura[0];
        select.apertura_minuto.selected = apertura[1];
        select.cierre_hora.selected = cierre[0];
        select.cierre_minuto.selected = cierre[1];
        textInput.descripcion = feriado.descripcion;

        this.setState({
            select: select,
            date: date,
            right: feriado.estado == 1,
            text: textInput
        });
    }

    
    calendarChange(date) {
        this.setState({date: date});
    }

    componentDidUpdate(prevProps,prevState){
        if (this.props.show){
            if (this.props.editar && (this.props.editar !== prevProps.editar))
                return this.editarFeriado(this.props.editar);
            if (this.props.agregar!==prevProps.agregar)
                return this.agregarFeriado();
        }
    }

    render(){
        const classes = this.props.showCalendar ? {
            calendar:"col-md-6",
            form: "col-lg-6",
            inputSelect:"col-md-12 box-padding",
            inputText:"col-md-12 no-padding"
        } : {
            calendar: "hidden",
            form: "col-lg-12",
            inputSelect: "col-md-6 box-padding",
            inputText: "col-md-6 box-padding"
        }
        return (
            <form className="full-width">
                <div className="container">
                    <div className="row">
                        <div className={classes.calendar}>
                            <Calendar 
                                value={this.state.date} 
                                onChange={this.calendarChange} />
                        </div>
                        <div className={classes.form}>
                            <div className="container">
                                <div className="row sub-title border-bottom">
                                    {this.props.title}
                                </div>
                                <div className="row justify-content-end">
                                    <Toggle
                                        rightTitle="Laboral"
                                        leftTitle="No laboral"
                                        name="estado"
                                        right={this.state.right}
                                        changeSide={this.changeToggleSide}/>
                                </div>
                                <div className="container row full-width no-margin no-padding">
                                    <div className="col-md-12 no-padding no-margin">
                                        <div className="container row no-padding no-margin">
                                            <div className={this.state.right ? classes.inputSelect : "hidden"}>
                                                <div className="row">
                                                    <div className="no-padding col-md-12 bold light-danger">Apertura</div>
                                                    <div className="col-sm-4 no-padding">
                                                        <Select
                                                            {...this.state.select.apertura_hora}
                                                            titulo="horas"
                                                            change={this.selectOption}
                                                            toggle={this.showOptions} />
                                                    </div>
                                                    <div className="col-sm-2 no-padding bold align-center">
                                                        horas
                                                    </div>
                                                    <div className="col-sm-4 no-padding ">
                                                        <Select
                                                            {...this.state.select.apertura_minuto}
                                                            titulo="minutos"
                                                            change={this.selectOption}
                                                            toggle={this.showOptions} />
                                                    </div>
                                                    <div className="col-sm-2 no-padding bold align-center">
                                                        minutos
                                                    </div>              
                                                </div>
                                                <div className="row">
                                                    <div className="no-padding col-md-12 bold light-danger">Cierre</div>
                                                    <div className="col-sm-4 no-padding ">
                                                        <Select
                                                            {...this.state.select.cierre_hora}
                                                            titulo="horas"
                                                            change={this.selectOption}
                                                            toggle={this.showOptions} />
                                                    </div>
                                                    <div className="col-sm-2 no-padding bold align-center">
                                                        horas
                                                    </div>
                                                    <div className="col-sm-4 no-padding ">
                                                        <Select
                                                            {...this.state.select.cierre_minuto}
                                                            titulo="minutos"
                                                            change={this.selectOption}
                                                            toggle={this.showOptions} />
                                                    </div>
                                                    <div className="col-sm-2 no-padding bold align-center">
                                                        minutos
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={classes.inputText}>
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
                                    <div className="container">
                                        <div className="row justify-content-end">
                                            <ButtonList
                                                displayList="flex-row nav-list no-padding inline-block  align-center"
                                                container="side-margin inline-block"
                                                elems={this.props.formActions} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}