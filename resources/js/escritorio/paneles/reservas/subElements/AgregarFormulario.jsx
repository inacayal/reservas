import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../../../../componentes/basic/Button';
import Evento from '../../../../reserva/pasos/Evento';

export default function agregarFormulario(props){
    const selectHandlers = {
        showToggle: props.showOptions,
        change: props.selectOption
    };
    return (
        <div>
            <div>
                <Button
                    title={(
                        <div className="smaller-text text bold">
                            <i className="fas fa-eye inline-box side-margin" />
                            Ver reservas
                        </div>
                    )}
                    click={props.verCalendario}
                    class="box-transparent highlight-hover border-box button-border inline-block"
                    disabled={false} />
            </div>
            <form className="text-right">
                <Evento
                    {...selectHandlers}
                    displayTitles={false}
                    eventos={props.select.evento}
                    persona={props.select.personas}
                    hora={props.select.hora}
                    ubicacion={props.select.ubicacion}
                    current={true}
                    fecha={props.date}
                    onCalendarChange={props.onCalendarChange} />
                <Button
                    title={(
                        <div className="smaller-text text bold">
                            <i className="fas fa-check-circle inline-box side-margin" />
                            Guardar
                        </div>
                    )}
                    type="submit"
                    click={props.agregarReserva}
                    class="box-transparent highlight-hover border-box button-border inline-block"
                    disabled={false} />
            </form>
        </div>
    );
}