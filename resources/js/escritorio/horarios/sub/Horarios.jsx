/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import Calendar from '../../../componentes/agenda/Agenda';
import ButtonList from '../../../componentes/basic/ButtonList';
import CardList from '../../../componentes/basic/CardList';
import Titulo from '../../../componentes/basic/Titulo';
/**
 * sub elements
 */
import AgregarFormulario from './AgregarFormulario';
/**
 * function
 */
import generateWeek from '../../../componentes/agenda/procedimientos/generateWeek';
import { closeModal, ConfirmarModal } from '../../../componentes/modal/Modal';
/**
 * constants
 */
import { NO_DAY_CONTROL } from '../../../constantes/CalendarControls';
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';

export default class Horarios extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: "1",
            open: false,
            atencion: {
                0: {
                    reserva: {
                        apertura: "15:00",
                        cierre: "17:30",
                    },
                    atencion: {
                        apertura: "15:00",
                        cierre: "17:30",
                    },
                    estado: "laboral"
                },
                1: {
                    reserva: {
                        apertura: "14:30",
                        cierre: "18:00",
                    },
                    atencion: {
                        apertura: "14:00",
                        cierre: "19:30",
                    },
                    estado: "laboral"
                },
                2: {
                    reserva: {
                        apertura: "16:30",
                        cierre: "20:00",
                    },
                    atencion: {
                        apertura: "14:00",
                        cierre: "23:30",
                    },
                    estado: "no_laboral"
                },
                3: {
                    reserva: {
                        apertura: "14:30",
                        cierre: "18:00",
                    },
                    atencion: {
                        apertura: "14:00",
                        cierre: "19:30",
                    },
                    estado: "laboral"
                },
                4: {
                    reserva: {
                        apertura: "14:30",
                        cierre: "18:00",
                    },
                    atencion: {
                        apertura: "14:00",
                        cierre: "19:30",
                    },
                    estado: "laboral"
                },
                5: {
                    reserva: {
                        apertura: "14:30",
                        cierre: "18:00",
                    },
                    atencion: {
                        apertura: "14:00",
                        cierre: "19:30",
                    },
                    estado: "laboral"
                },
                6: {
                    reserva: {
                        apertura: "14:30",
                        cierre: "18:00",
                    },
                    atencion: {
                        apertura: "14:00",
                        cierre: "19:30",
                    },
                    estado: "laboral"
                }
            }
        };

        this.closeModal = closeModal.bind(this);
        this.eliminarHorario = this.eliminarHorario.bind(this);
        this.actions = {
            eliminar: this.eliminarHorario 
        }
    }

    closeModal(e) {
        this.setState({ open: false });
    }

    componentDidMount() {
        console.log('horariosMount');
    }

    componentWillUnmount() {
        console.log('horariosUnmount');
    }

    eliminarHorario(e) {
        e.preventDefault();
        this.setState({
            open: true
        })
    }

    render(){
        const diasAtencion = generateWeek['horarios'](
            this.state.atencion,
            this.actions
        );
        return (
            <>
                <Titulo
                    title="Horarios"
                    links={this.nav}/>
                <div className="container">
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.closeModal}
                        title="Eliminar Horario"
                        content="¿estás seguro de eliminar este horario?" />
                    <CardList
                        displayList="justify no-padding full-width flex-column nav-list h-center"
                        elems={diasAtencion}/>
                </div>
            </>
        );
    }
}