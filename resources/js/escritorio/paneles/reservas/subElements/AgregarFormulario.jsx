/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import { showOptions, selectOption } from '../../../../componentes/input/Select';
import ButtonList from '../../../../componentes/basic/ButtonList';
import Evento from '../../../../reserva/pasos/Evento';
export default class AgregarFormulario extends Component{
    constructor(props){
        super(props);
        this.state = {
            date:new Date(),
            select: {
                local: {
                    name: "local",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        1: "Local 1",
                        2: "Local 2",
                        3: "Local 3"
                    }
                },
                ubicacion: {
                    name: "ubicacion",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        1: "Terraza",
                        2: "Salón",
                        3: "Vereda"
                    }
                },
                evento: {
                    name: "evento",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        1: "Cumpleaños",
                        2: "Cita",
                        3: "Amigos",
                        4: "Boda"
                    }
                },
                hora: {
                    name: "hora",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        1: "Hora 1",
                        2: "Hora 2",
                        3: "Hora 3",
                        4: "Hora 4"
                    }
                },
                personas: {
                    name: "personas",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        1: "Persona 1",
                        2: "Persona 2",
                        3: "Persona 3",
                        4: "Persona 4"
                    }
                }
            }
        };
        this.showOptions = showOptions.bind(this);
        this.selectOption = selectOption.bind(this);
    }

    guardarNuevaReserva() {
        console.log('guardar');
    }

    componentDidMount() {
        console.log('formularioReservasMount');
    }

    componentWillUnmount() {
        console.log('formularioReservasUnmount');
    }

    render(){
        return (
            <div>
                <form className="text-right">
                    <div className="container">
                        <div className="row">
                            <Evento
                                showToggle={this.showOptions}
                                change={this.selectOption}
                                displayTitles={false}
                                eventos={this.state.select.evento}
                                persona={this.state.select.personas}
                                hora={this.state.select.hora}
                                ubicacion={this.state.select.ubicacion}
                                current={true}
                                fecha={this.state.date}
                                onCalendarChange={this.state.onCalendarChange} />
                        </div>
                        <div className="row justify-content-end">
                            <ButtonList
                                displayList="flex-row nav-list no-padding inline-block  align-center"
                                container="side-margin inline-block"
                                elems={this.props.formControls} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}