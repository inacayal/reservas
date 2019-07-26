/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import ButtonList from '../../../../componentes/basic/ButtonList';
import Evento from '../../../../reserva/pasos/Evento';

export default function agregarFormulario(props){
    return (
        <div>
            <form className="text-right">
                <div className="container">
                    <div className="row">
                        <Evento
                            showToggle={props.showOptions}
                            change={props.selectOption}
                            displayTitles={false}
                            eventos={props.select.evento}
                            persona={props.select.personas}
                            hora={props.select.hora}
                            ubicacion={props.select.ubicacion}
                            current={true}
                            fecha={props.date}
                            onCalendarChange={props.onCalendarChange} />
                    </div>
                    <div className="row justify-content-end">
                        <ButtonList
                            displayList="flex-row nav-list no-padding inline-block  align-center"
                            container="side-margin inline-block"
                            elems={props.formControls} />
                    </div>
                </div>
            </form>
        </div>
    );
}