//React Components
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//Complex Components
import Calendar from '../../../../componentes/complex/calendar/Calendar';
import Button from '../../../../componentes/basic/Button';
import AgregarFormulario from './AgregarFormulario';
//Constants
import {DAYS,MONTHS,HOURS} from '../../../../constantes/DaysMonths';
//Functions
import generateHoursFromInterval from '../../../../funciones/generateHoursFromInterval';
import generateMonth from '../../../../funciones/generateMonth';

//Feriados should be on this format when doing ajax request
var formattedFeriados = {
    1559358000000: {
        apertura: "apertura1",
        cierre: "cierre1",
        descripcion: "descripcion1",
        estado: 1
    },
    1560481200000: {
        apertura: "apertura2",
        cierre: "cierre2",
        descripcion: "descripcion2",
        estado: 1
    },
    1561345200000: {
        apertura: "apertura3",
        cierre: "cierre3",
        descripcion: "descripcion3",
        estado: 1
    },
    1561518000000: {
        apertura: "apertura4",
        cierre: "cierre4",
        descripcion: "descripcion4",
        estado: 1
    },
    1561690800000: {
        apertura: "apertura4",
        cierre: "cierre4",
        descripcion: "descripcion4",
        estado: 1
    },
    1561777200000: {
        apertura: "apertura5",
        cierre: "cierre5",
        descripcion: "descripcion5",
        estado: 0
    }
}

export default class DiasFeriados extends Component {
    constructor(props){
        super(props);
        this.validMinutes = generateHoursFromInterval(10);
        this.state= {
            feriados: formattedFeriados,
            date:new Date(),
            agregarFeriado:false,
            agregarFecha:new Date(),
            controls :[
                {
                    title: "Anual",
                    data: "0",
                    class: "box-transparent highlight-hover h-padding small-v-padding bordered transparent-border"
                },
                {
                    title: "Mensual",
                    data: "1",
                    class: "box-transparent highlight-hover bordered h-padding small-v-padding transparent-border"
                },
                {
                    title: "Semanal",
                    data: "2",
                    class: "blue-background highlight-border h-padding small-v-padding"
                }
            ],
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
        };

        this.calendarChange = this.calendarChange.bind(this);
        this.guardarNuevoFeriado = this.guardarNuevoFeriado.bind(this);
        this.agregarFeriado = this.agregarFeriado.bind(this);
        this.verCalendario = this.verCalendario.bind(this);
        this.showOptions = this.showOptions.bind(this);
        this.selectOption = this.selectOption.bind(this);

        this.actions = {
            outer:{
                agregar: this.agregarFeriado.bind(this),
                editar: this.editarFeriado.bind(this),
                ver: this.verFeriado.bind(this),
                eliminar: this.eliminarFeriado.bind(this)
            },
            inner:{}
        };
    }

    guardarNuevoFeriado(e){
        e.preventDefault();
        console.log("culo");
    }

    calendarChange(date) {
        this.setState({
            fecha: date
        });
    }

    verCalendario(e){
        e.preventDefault();
        this.setState({agregarFeriado:!this.state.agregarFeriado});
    }

    agregarFeriado(e){
        e.preventDefault();
        this.setState({agregarFeriado:!this.state.agregarFeriado})
    }

    editarFeriado(e){
        console.log("this.editarFeriado");
    }

    verFeriado(e) {
        console.log("this.verFeriado");
    }

    eliminarFeriado(e) {
        console.log("this.eliminarFeriado");
    }

    showOptions(e) {
        let name = e.currentTarget.getAttribute('select');
        let select = this.state.select;
        let trigger = select[name];
        trigger.show = !trigger.show;
        select[name] = trigger;
        this.setState({ select });
    }

    selectOption(e) {
        let value = e.target.getAttribute('keyvalue');
        let name = e.target.getAttribute('select');
        let select = this.state.select;
        let trigger = select[name];
        trigger.selected = (value !== select[name].selected) ? value : null;
        select[name] = trigger;
        this.setState({ select });
    }
    
    render(){
        return (
            <div className={(this.props.show) ? "full-width" : "hidden"}>
                <div className={(this.state.agregarFeriado) ? "full-width" : "hidden"}>
                    <AgregarFormulario
                        change={this.selectOption}
                        showToggle={this.showOptions}
                        select={this.state.select}
                        verFeriados={this.verCalendario}
                        calendarChange={this.calendarChange}
                        date={this.state.agregarFecha}
                        agregarFeriado={this.guardarNuevoFeriado}/>
                </div>
                <div className={(this.state.agregarFeriado) ? "hidden" : "full-width"}>
                    <Button
                        title={(
                            <div className="smaller-text text bold">
                                <i className="fas fa-plus-circle inline-box side-margin" />
                                Agregar feriados
                            </div>
                        )}
                        click={this.actions.outer.agregar}
                        class="box-transparent highlight-hover border-box button-border inline-block"
                        disabled={false} />
                    <Calendar
                        show={"2"}
                        date={this.state.date} 
                        type="feriados"
                        actions={this.actions}
                        controls={this.state.controls}
                        data={this.state.feriados}/>
                </div>
            </div>
        );
    }
}
