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

function EventoFrame(
    props
) {
    const
        [showDate, changeDate] = useState(props.fecha),
        [minDate, changeMin] = useState(new Date()),
        [horario, changeHorario] = useState({}),
        currentData = props.data.feriados.data[showDate.getDate()] ? props.data.feriados.data[showDate.getDate()] : props.data.horarios.data[showDate.getDay()+1],
        dateString = DAYS[showDate.getDay()] + " " + showDate.getDate() + " de " + MONTHS[showDate.getMonth()] + " " + showDate.getFullYear(),
        ubicaciones = props.data.ubicaciones,
        renderCallback = () => {
            const
                date = minDate.getMonth() === showDate.getMonth() && minDate.getFullYear() === showDate.getFullYear()
                    ? calculateOffset(
                        props.data.antelacion,
                        minDate,
                        currentData,
                        changeMin
                    )
                    : showDate;
            clickCallback(date)(date);
        },
        clickCallback = (date) => {
            return (date) => {
                const generateData = props.data.feriados.data[date.getDate()]
                    ? props.data.feriados.data[date.getDate()]
                    : props.data.horarios.data[date.getDay() + 1];

                changeHorario (
                    generateAcceptedHours({
                        a: props.data.antelacion,
                        g: generateData,
                        i: props.data.intervalo.id,
                        f: date,
                        m: minDate
                    })
                );
                changeDate(date);
            }
        };

    useEffect(renderCallback,[]);

    return (
        <div className="container">
            <h3 className={props.displayTitles ? "bold highlight-title align-center" : "hidden"}>datos de la reserva</h3>
            <CalendarioEventos
                data={props.data}
                current = {currentData}
                showDate={showDate}
                minDate={minDate}
                clickCallback={clickCallback}
                fetch = {props.fetch}/>
            <div className="row justify-content-end smaller-text top-padding">
                {'Debes reservar con al menos ' + props.data.antelacion + ' horas de antelación.'}
            </div>
            <div className="row">
                <CalendarioFormulario
                    date={showDate}
                    currentData={currentData}
                    ubicaciones={ubicaciones}
                    horario={horario} />
            </div>
        </div>
    );
}
export default EventoFrame;
