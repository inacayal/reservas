/**
 * react basic
 */
import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
/**
 * react calendar
 */
import CalendarioEventos from './CalendarioEventos';
/**
 * input components
 */
import { Select } from "../../../componentes/input/Select.jsx";
import { Text } from "../../../componentes/input/Text.jsx";
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';
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
        [horario, changeHorario] = useState({}),
        [eventoSelect, changeEventoList] = useState(props.select.eventos),
        horaSelect = props.select.hora,
        minutoSelect = props.select.minuto,
        ubicacionSelect = props.select.ubicaciones,
        ubicacion = props.data.ubicaciones[ubicacionSelect.selected]||{}, 
        currentData = props.data.feriados[showDate.getDate()] ? props.data.feriados[showDate.getDate()] : props.data.horarios[showDate.getDay()+1], 
        promociones = eventoSelect.selected ? currentData.eventos.data[eventoSelect.selected].promociones.data : null,
        dateString = DAYS[showDate.getDay()] + " " + showDate.getDate() + " de " + MONTHS[showDate.getMonth()] + " " + showDate.getFullYear(),
        resetSelect = () => {
            horaSelect.selected = null;
            minutoSelect.selected = null;
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
                auxEvento.list = props.data.feriados[date.getDate()] 
                    ? props.data.feriados[date.getDate()].eventos.list 
                    : props.data.horarios[date.getDay() + 1].eventos.list;
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
        };

    useEffect(renderCallback,[]);

    horaSelect.list = horario.hList||{};
    minutoSelect.list = horaSelect.selected 
        ? horario.hourArray[horaSelect.selected]
        : {};

    console.log(eventoSelect.selected,Object.values(promociones||{}))

    if (ubicacionSelect.selected)
        generateListByLocationCapacity({
            personas: props.select.personas, 
            ubicaciones: ubicacion
        }); 

    return (
        <div className={(props.current) ? "container" : "hidden"}>
            <h3 className={props.displayTitles ? "bold highlight-title align-center" : "hidden"}>datos de la reserva</h3>
            <CalendarioEventos 
                horarios={props.data.horarios}
                feriados={props.data.feriados}
                showDate={showDate}
                minDate={minDate}
                clickCallback={clickCallback}
                resetSelect={() => resetSelect}
                fetch = {props.fetch}/> 
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
                                            <div className="top-padding"><br /></div>
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
                                <div className="row">
                                    <p className="smaller-text no-margin">{dateString}</p>
                                </div>
                            </div>
                        </div>
                    </div>    
                    <div className="row v-padding">
                        <div className="col-md-6 text-left ">
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
                                            <div>{"Descripcion: " + currentData.eventos.data[eventoSelect.selected].descripcion}</div>
                                        </div>
                                    :
                                        <></>
                            }
                        </div>
                        <div className="col-md-6 text-left relative">
                            {
                                promociones 
                                ?
                                    <ul>
                                        {
                                            Object.values(promociones).map(
                                                (p,i) => 
                                                    <li key={i}>
                                                        <div>{p.nombre}</div>
                                                        <div>{p.descripcion}</div>
                                                        <div>{p.descuento}</div>
                                                    </li>
                                            )
                                        }
                                    </ul>
                                :
                                    <></>
                            }
                        </div>
                    </div>
                    <div className="row v-padding">
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