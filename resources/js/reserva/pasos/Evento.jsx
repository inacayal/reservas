/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
/**
 * react calendar
 */
import Calendar from 'react-calendar';
/**
 * input components
 */
import { Select } from "../../componentes/input/Select.jsx";
import { Text } from "../../componentes/input/Text.jsx";
import {DAYS,MONTHS} from '../../constantes/DaysMonths';
/**
 * functions
 */
import {
    generateListByLocationCapacity,
    generateHourArray,
    calculateOffset,
    generateAcceptedHours
} from './handlers';

function Evento(props) {
    const
        [showDate, changeDate] = useState(props.fecha),
        [minDate, changeMin] = useState(new Date()),
        [auxDate, changeAux] = useState(showDate),
        [horario, changeHorario] = useState({}),
        [eventoSelect, changeEventoList] = useState(props.select.eventos),
        horaSelect = props.select.hora,
        minutoSelect = props.select.minuto,
        ubicacionSelect = props.select.ubicaciones,
        ubicacion = props.data.ubicaciones[ubicacionSelect.selected]||{},
        weekDay = props.data.horarios[showDate.getDay()+1],
        dateObj = {
            dia: DAYS[auxDate.getDay()],
            fecha: auxDate.getDate(),
            mes: MONTHS[auxDate.getMonth()],
            year: auxDate.getFullYear()
        },
        atencionString = weekDay.apertura.atencion.hora + ":" + (weekDay.apertura.atencion.minuto < 10 ? "0" + weekDay.apertura.atencion.minuto : weekDay.apertura.atencion.minuto) + " - " + weekDay.cierre.atencion.hora + ":" + (weekDay.cierre.atencion.minuto < 10 ? "0" + weekDay.cierre.atencion.minuto : weekDay.apertura.atencion.minuto),
        reservaString = weekDay.apertura.reserva.hora + ":" + (weekDay.apertura.reserva.minuto < 10 ? "0" + weekDay.apertura.reserva.minuto : weekDay.apertura.reserva.minuto) + " - " + weekDay.cierre.reserva.hora + ":" + (weekDay.cierre.reserva.minuto < 10 ? "0" + weekDay.cierre.reserva.minuto : weekDay.cierre.reserva.minuto),
        dateString =  dateObj.dia + " " +dateObj.fecha+ " de "+ dateObj.mes + " " +dateObj.year,
        feriado = props.data.feriados[auxDate.getDate()], 
        tileDisabled = ({ activeStartDate, date, view }) => {
            const disableByDate = view === 'month'
                ? date.getMonth() < activeStartDate.getMonth() || date.getMonth() > activeStartDate.getMonth()
                : date.getMonth() < activeStartDate.getMonth();
            return disableByDate;
        },
        dayChange = (date) => {
            horaSelect.selected = null;
            minutoSelect.selected = null;
            clickCallback(date)(date);
            changeAux(date);
        },
        monthChange = (date) => {
            horaSelect.selected = null;
            minutoSelect.selected = null;
            props.fetch(date);
        },
        navChange = ({ activeStartDate, view }) => {
            horaSelect.selected = null;
            minutoSelect.selected = null;
            props.fetch(activeStartDate);
        },
        renderCallback = () => {
            const 
                feriados = props.data.feriados,
                horarios = props.data.horarios,
                date = minDate.getMonth() === showDate.getMonth() && minDate.getFullYear() === showDate.getFullYear()
                    ? calculateOffset(
                        props.data.antelacion,
                        minDate,
                        feriados[minDate.getDate()]
                            ? feriados[minDate.getDate()]
                            : horarios[minDate.getDay() + 1],
                        changeMin
                    )
                    : showDate;
                    
            clickCallback(date)(date);
        },
        clickCallback = (date) => {
            return (date) => {
                let auxEvento = eventoSelect;
                auxEvento.selected = null;
                auxEvento.list = props.data.horarios[date.getDay() + 1].eventos.list;
                changeHorario (
                    generateAcceptedHours({
                        antelacion: props.data.antelacion,
                        feriado: props.data.feriados[date.getDate()],
                        horario: props.data.horarios[date.getDay()+1],
                        intervalo: props.data.intervalo.id,
                        fecha: date,
                        min: minDate
                    })
                );
                changeEventoList(auxEvento);
                changeDate(date);
            }
        },
        tileContent = ({ date, view }) => {
            const index = date.getDate();
            return props.data.feriados[index] !== undefined
                ? 
                    <p 
                        style={{width: '100%', height: "100%" }} 
                        onMouseOver={(e) => {changeAux(date)}} 
                        onMouseLeave={(e)=>{changeAux(showDate)}}
                        onClick={clickCallback}
                        className="no-margin smaller-text bold">
                        <i className="line-v-middle fas fa-angle-right highlight-title"/>
                        {
                            props.data.feriados[index].nombre.substr(0,5)+"..."
                        }
                    </p>
                : null;
        };

    useEffect(renderCallback,[]);

    horaSelect.list = horario.hList||{};
    minutoSelect.list = horaSelect.selected 
        ? horario.hourArray[horaSelect.selected]
        : {};

    if (ubicacionSelect.selected)
        generateListByLocationCapacity({
            personas: props.select.personas, 
            ubicaciones: ubicacion
        });
    return (
        <div className={(props.current) ? "container" : "hidden"}>
            <h3 className={props.displayTitles ? "bold highlight-title align-center" : "hidden"}>datos de la reserva</h3>
            <div className="row justify-content-center top-padding">
                <div className="col-md-8 no-padding">
                    <input type="date" value={showDate} readOnly className="hidden" />
                    <Calendar 
                        showNeighboringMonth = {false}
                        value={showDate} 
                        minDate = {minDate}
                        onClickDay = {dayChange}
                        onClickMonth = {monthChange}
                        tileDisabled={tileDisabled}
                        tileContent = {tileContent}
                        onActiveDateChange = {navChange} />
                </div>
                <div className="col-md-4 text-left">
                    <i className="line-v-middle fas fa-angle-right highlight-title" />
                    <div className="text-left">
                        {
                            feriado
                            ? 
                                <div className="medium-left-padding">
                                    <div>
                                        <h6 className="highlight bold no-margin">
                                            {"Feriado del "+dateString}
                                        </h6>
                                        <div style={{border:"solid 2px var(--highlight-blue)", margin:"10px 0px", borderRadius:"3px"}} className="thirty"></div>
                                        <p className="bold no-margin">
                                            {feriado.nombre}
                                        </p>
                                    </div>
                                    <p className="no-margin">
                                        {feriado.nombre}
                                    </p>
                                    <div style={{ border: "solid 2px var(--border)", margin: "10px 0px", borderRadius: "3px" }} className="thirty"></div>
                                    <p className="no-margin">
                                        {"atencion: " + feriado.apertura.atencion.hora + ":" + (feriado.apertura.atencion.minuto < 10 ? "0"+feriado.apertura.atencion.minuto : feriado.apertura.atencion.minuto)  + " - " + feriado.cierre.atencion.hora + ":" + (feriado.cierre.atencion.minuto < 10 ? "0"+feriado.cierre.atencion.minuto : feriado.cierre.atencion.minuto)}
                                    </p>
                                    <p>
                                        {"reservas: " +feriado.apertura.reserva.hora + ":" + (feriado.apertura.reserva.minuto  < 10 ? "0"+feriado.apertura.reserva.minuto  : feriado.apertura.reserva.minuto ) + " - " + feriado.cierre.reserva.hora + ":" + (feriado.cierre.reserva.minuto < 10 ? "0"+feriado.cierre.reserva.minuto : feriado.cierre.reserva.minuto)}
                                    </p>
                                </div>
                            : 
                                <div className="medium-left-padding">
                                    <h6 className="highlight bold no-margin">
                                        {dateString}
                                    </h6>
                                    <div style={{ border: "solid 2px var(--highlight-blue)", margin: "10px 0px", borderRadius: "3px" }} className="thirty"></div>
                                    <p className="no-margin">
                                        {"atención: " + atencionString}
                                    </p>
                                    <p className="no-margin">
                                        {"reservas: " + reservaString}
                                    </p>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className="row justify-content-end smaller-text top-padding">{'Debes reservar con al menos ' + props.data.antelacion + ' horas de antelación.'}</div>
            <div className="row v-padding">
                <div className="no-padding top-padding col-md-3">
                    <i className="line-v-middle fas fa-angle-left highlight-title" />
                    <div className="text-left right-padding">
                        foto relacionada <br/>a la ubicacion
                    </div>
                </div>
                <div className="top-padding col-md-9">
                    <div className="row">
                        <div className="col-md-6 text-left">
                            <h6 className="highlight bold no-margin">Ubicación</h6>
                            <Select 
                                {...ubicacionSelect} 
                                titulo="selecciona la ubicación" 
                                change={props.change} 
                                toggle={props.showToggle} />
                        </div>
                        <div className="col-md-6 text-left">
                            <div className="container">
                                <div className="row">
                                    <h6 className="highlight bold no-margin">Hora de reserva</h6>
                                    <p className="smaller-text no-margin">{dateString}</p>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4 no-padding text-left">
                                        <Select 
                                            {...horaSelect} 
                                            titulo="hora" 
                                            change={props.change} 
                                            toggle={props.showToggle} />
                                    </div>
                                    <div className="col-sm-1 text-center v-align-center no-padding">
                                        <h6 className="c-title" style={{ color: "#bfbfbf" }}>:</h6>
                                    </div>
                                    <div className="col-md-5 text-left relative">
                                        <div
                                            className={horaSelect.selected ? "hidden" : "full-width overlay"}
                                            style={{ opacity: "0.5", backgroundColor: "white", zIndex: 1 }}>
                                            <div className="top-padding"><br /><br /></div>
                                        </div>
                                        <div className="overlay" style={horaSelect.selected ? { zIndex: 2 } : { zIndex: 0 }}>
                                            <Select 
                                                {...minutoSelect} 
                                                titulo="minutos" 
                                                change={props.change} 
                                                toggle={props.showToggle}
                                                readOnly = {horaSelect.selected ? true : false}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                    <div className="row top-padding">
                        <div className="col-md-6 text-left">
                            <h6 className="highlight bold no-margin">Ocasión</h6>
                            <Select 
                                {...eventoSelect} 
                                titulo="selecciona tipo de evento de tu reserva" 
                                change={props.change} 
                                toggle={props.showToggle} />
                            {
                                eventoSelect.selected 
                                    ?
                                        <div className="smaller-text">
                                            <div>{"Descripcion: " + props.data.horarios[showDate.getDay() + 1].eventos.data[eventoSelect.selected].descripcion}</div>
                                            <div>{"Promo: " + props.data.horarios[showDate.getDay() + 1].eventos.data[eventoSelect.selected].promocion}</div>
                                        </div>
                                    :
                                        <></>
                            }
                        </div>
                        <div className ="col-md-6 text-left relative">
                            <div 
                                className={ubicacionSelect.selected ? "hidden" : "full-width overlay"} 
                                style={{ opacity: "0.5", backgroundColor:"white",zIndex:1}}>
                                <div className="top-padding"><br /><br /><br /></div>
                            </div>
                            <div className="overlay" style={ubicacionSelect.selected ? { zIndex: 2}: { zIndex: 0 } }>
                                <h6 className="highlight bold no-margin">Personas</h6>
                                <Select 
                                    {...props.select.personas} 
                                    titulo="selecciona la cantidad de personas" 
                                    change={props.change} 
                                    toggle={props.showToggle}
                                    readOnly={ubicacionSelect.selected ? true : false} />
                                <div className="smaller-text">{ubicacionSelect.selected ? "Máximo "+ ubicacion.maximo + " personas para " + ubicacion.nombre : "Debes seleccionar una ubicación"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row box-padding">
                <h3 className={props.displayTitles ? "bold highlight-title align-center" : "hidden"}>datos de contacto</h3>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <Text rows={1} titulo="nombre  y apellido" name="name" value={props.nombre} classes={"border-box input-text margin-box"} />
                </div>
                <div className="col-sm-4">
                    <Text rows={1} titulo="correo electrónico" name="email" value={props.correo} classes={"border-box input-text margin-box"} />
                </div>
                <div className="col-sm-4">
                    <Text rows={1} titulo="teléfono" name="telefono" value={props.telefono} classes={"border-box input-text margin-box"} container="full-width" />
                </div>
            </div>
        </div>
    );
}

export default Evento;