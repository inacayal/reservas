//React Components
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
//Complex Components
import WeekCalendar from '../../../../componentes/complex/WeekCalendar';
import MonthCalendar from '../../../../componentes/complex/MonthCalendar';
//Basic Components
import Toggle from '../../../../componentes/basic/Toggle';
//Constants
import {DAYS,MONTHS} from '../../../../constantes/DaysMonths';

export default class DiasFeriados extends Component {
    constructor(props){
        super(props);
        this.state= {
            side: true,
            date: new Date(),
            weekOffset: 0,
            feriados: [
                {
                    fecha: new Date("06/01/2019"),
                    apertura: "apertura1",
                    cierre: "cierre1",
                    descripcion: "descripcion1",
                    estado: 1
                },
                {
                    fecha: new Date("06/28/2019"),
                    apertura: "apertura2",
                    cierre: "cierre2",
                    descripcion: "descripcion2",
                    estado: 1
                },
                {
                    fecha: new Date("06/26/2019"),
                    apertura: "apertura3",
                    cierre: "cierre3",
                    descripcion: "descripcion3",
                    estado: 1
                },
                {
                    fecha: new Date("06/14/2019"),
                    apertura: "apertura4",
                    cierre: "cierre4",
                    descripcion: "descripcion4",
                    estado: 1
                },
                {
                    fecha: new Date("06/24/2019"),
                    apertura: "apertura4",
                    cierre: "cierre4",
                    descripcion: "descripcion4",
                    estado: 1
                },
                {
                    fecha: new Date("06/29/2019"),
                    apertura: "apertura5",
                    cierre: "cierre5",
                    descripcion: "descripcion5",
                    estado: 0
                }
            ]
        }
        this.changeToggleSide = this.changeToggleSide.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.changeCurrentWeek = this.changeCurrentWeek.bind(this);
        this.paintSelectedDay = this.paintSelectedDay.bind(this);
        this.estados = { 1: "Apertura", 2: "Cerrado" };
        this.feriadosSemana = {};
        this.feriadosMes = this.formatFeriados();
    }
    paintSelectedDay(e) {
        e.preventDefault();
        console.log('paint');
    }
    changeCurrentWeek(e) {
        e.preventDefault();
        let weekOffset = e.currentTarget.getAttribute('data');
        this.setState({ weekOffset });
    }
    onDateChange(e) {
        console.log("dateChange")
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextProps.show || nextProps.show || nextState.side !== this.state.side || nextState.weekOffset !== this.state.weekOffset;
    }

    changeToggleSide(e) {
        this.setState({ side: !this.state.side });
    }

    formatFeriados() {
        return this.state.feriados.map(
            e => {
                let elem = {
                    title: (e.estado) ? (
                        <div className="text-left container">
                            <span className="bold highlight">fecha </span>
                            <span>{DAYS[e.fecha.getDay()] + " " + e.fecha.getDate() + " " + MONTHS[e.fecha.getMonth()]}</span>
                            <span className="bold highlight"> apertura </span>
                            <span>{e.apertura}</span>
                            <span className="bold highlight"> cierre </span>
                            <span>{e.cierre}</span>
                            <span className="bold highlight"> descripcion </span>
                            <span>{e.descripcion}</span>
                        </div>
                    ) : (
                            <div className="text-left container">
                                <span className="bold highlight">fecha </span>
                                <span>{DAYS[e.fecha.getDay()] + " " + e.fecha.getDate() + " " + MONTHS[e.fecha.getMonth()]}</span>
                                <span className="bold highlight"> Sin Apertura</span>
                            </div>
                        ),
                    class: "box-transparent highlight-hover text-left full-width"
                };
                this.feriadosSemana[e.fecha.setHours(0, 0, 0, 0).toString()] = elem;
                return elem;
            }, this);
    }

    render(){
        return (
            <div className={(this.props.show) ? "full-width" : "hidden"}>
                <div className="row justify-content-end box-padding">
                    <Toggle
                        right={this.state.side}
                        changeSide={this.changeToggleSide}
                        belongs="horarios" />
                </div>
                <WeekCalendar
                    show={this.state.side}
                    date={this.state.date}
                    clickInfo={this.paintSelectedDay}
                    click={this.onDateChange}
                    changeCurrentWeek={this.changeCurrentWeek}
                    data={this.feriadosSemana}
                    dataTitle={"Días feriados de " + MONTHS[this.state.date.getMonth()] + " " + this.state.date.getFullYear()}
                    offset={this.state.weekOffset} />    
                <MonthCalendar 
                    show={this.state.side}
                    info={this.feriadosMes}
                    date={this.state.date}
                    dateChange={this.onDateChange}
                    daySelection={this.paintSelectedDay}/>
            </div>
        );
    }
}
