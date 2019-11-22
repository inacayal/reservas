/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
/**
 * react calendar
 */
import CalendarioEventos from './CalendarioEventos';
import CalendarioFormulario from './CalendarioFormulario';
/**
 * input components
 */
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';
/**
 * functions
 */
import {
    generateHourArray,
    calculateOffset,
    generateAcceptedHours
} from './Handlers';


export default class EventoFrame extends Component {
    constructor(props){
        super(props);
        const date = new Date(),
            currentData =
                props.data.feriados.data[date.getDate()]
                ?
                    props.data.feriados.data[date.getDate()]
                :
                    props.data.horarios.data[date.getDay()+1];
        this.state = {
            date:date,
            current:currentData,
            min: calculateOffset(
                props.data.antelacion,
                new Date(),
                currentData
            ),
            horario: generateAcceptedHours({
                a: props.data.antelacion,
                g: currentData,
                i: props.data.intervalo.id,
                f: date,
                m: date
            })
        }
        this.changeDate = this.changeDate.bind(this);
    }

    changeDate(d){
        const date = new Date(d),
            props = this.props,
            generateData = props.data.feriados.data[date.getDate()]
                ? props.data.feriados.data[date.getDate()]
                : props.data.horarios.data[date.getDay() + 1];

        this.setState ({
            date:date,
            horario: generateAcceptedHours({
                a: props.data.antelacion,
                g: generateData,
                i: props.data.intervalo.id,
                f: date,
                m: this.state.min
            }),
            current:generateData
        });
    }

    render(){
        const
            props = this.props,
            showDate = this.state.date,
            minDate = this.state.min,
            horario = this.state.horario,
            currentData = this.state.current,
            dateString = DAYS[showDate.getDay()] + " " + showDate.getDate() + " de " + MONTHS[showDate.getMonth()] + " " + showDate.getFullYear(),
            ubicaciones = props.data.ubicaciones;
        return (
            <div className="container">
                <h3 className={props.displayTitles ? "bold highlight-title align-center" : "hidden"}>datos de la reserva</h3>
                <CalendarioEventos
                    data={props.data}
                    current = {currentData}
                    showDate={showDate}
                    minDate={minDate}
                    clickCallback={this.changeDate}
                    fetch = {props.fetch}/>
                <div className="row justify-content-end smaller-text top-padding">
                    {'Debes reservar con al menos ' + props.data.antelacion + ' horas de antelación.'}
                </div>
                <div className="row">
                    <CalendarioFormulario
                        date={showDate}
                        currentData={currentData}
                        ubicaciones={ubicaciones}
                        horario={horario}
                        fields={props.fields}
                        change={props.change}
                        errors={props.errors} />
                </div>
            </div>
        );
    }
}
