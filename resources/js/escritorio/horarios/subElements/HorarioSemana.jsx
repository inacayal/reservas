/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import Calendar from '../../../componentes/calendario/Calendar';
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
import generateWeek from '../../../componentes/calendario/procedimientos/generateWeek';
import generateMonth from '../../../componentes/calendario/procedimientos/generateMonth';
import { formActions, formNavigation, panelNavigation } from '../../../funciones/dataActions';
import { closeModal, ConfirmarModal } from '../../../componentes/modal/Modal';
/**
 * constants
 */
import { NO_DAY_CONTROL } from '../../../constantes/CalendarControls';
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';

export default class HorarioSemana extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: "1",
            agregar: false,
            editar: null,
            formulario: false,
            open: false,
            atencion: {
                0: {
                    reserva: {
                        apertura: "15:00:00",
                        cierre: "17:30:00",
                    },
                    atencion: {
                        apertura: "15:00:00",
                        cierre: "17:30:00",
                    },
                    estado: "1"
                },
                1: {
                    reserva: {
                        apertura: "14:30:00",
                        cierre: "18:00:00",
                    },
                    atencion: {
                        apertura: "14:00:00",
                        cierre: "19:30:00",
                    },
                    estado: "1"
                },
                2: {
                    reserva: {
                        apertura: "16:30:00",
                        cierre: "20:00:00",
                    },
                    atencion: {
                        apertura: "14:00:00",
                        cierre: "23:30:00",
                    },
                    estado: "0"
                },
                3: {
                    reserva: {
                        apertura: "14:30:00",
                        cierre: "18:00:00",
                    },
                    atencion: {
                        apertura: "14:00:00",
                        cierre: "19:30:00",
                    },
                    estado: "1"
                },
                4: {
                    reserva: {
                        apertura: "14:30:00",
                        cierre: "18:00:00",
                    },
                    atencion: {
                        apertura: "14:00:00",
                        cierre: "19:30:00",
                    },
                    estado: "1"
                },
                5: {
                    reserva: {
                        apertura: "14:30:00",
                        cierre: "18:00:00",
                    },
                    atencion: {
                        apertura: "14:00:00",
                        cierre: "19:30:00",
                    },
                    estado: "1"
                },
                6: {
                    reserva: {
                        apertura: "14:30:00",
                        cierre: "18:00:00",
                    },
                    atencion: {
                        apertura: "14:00:00",
                        cierre: "19:30:00",
                    },
                    estado: "1"
                }
            },
            acciones: {
                outer: {
                    agregar: this.agregarHorario.bind(this),
                    editar: this.editarHorario.bind(this),
                    eliminar: this.eliminarHorario.bind(this)
                },
                inner: {}
            }
        };

        this.closeModal = closeModal.bind(this);
        this.verHorarios = this.verHorarios.bind(this);
        this.eliminarHorario = this.eliminarHorario.bind(this);

        this.editAddControls = formNavigation(this.verHorarios, this.eliminarHorario);
        this.formActions = formActions(this.verHorarios, this.guardarHorario);
    }


    guardarHorario(e) {
        console.log("this.guardarHorario");
    }

    editarHorario(e) {
        e.preventDefault();
        let dateString = e.currentTarget.getAttribute('data');
        this.setState({ agregar: null, editar: dateString, formulario: true });
    }

    agregarHorario(e) {
        e.preventDefault();
        let dateString = e.currentTarget.getAttribute('data');
        this.setState({ agregar: dateString, editar: null, formulario: true });
    }

    verHorarios(e) {
        e.preventDefault();
        this.setState({ agregar: null, editar: null, formulario: false });
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
                null,
                this.state.atencion,
                this.state.acciones,
                null
            ),
            controls = this.state.editar ?
                this.editAddControls
                : this.state.agregar ?
                    [this.editAddControls[0]]
                    : [{ class: "hidden" }];
        return (
            <div className={(this.props.show) ? "full-width container" : "hidden"}>
                <div className="row">
                    <Titulo
                        title={"Horarios"}
                        navigation={controls} />
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.closeModal}
                        title="Eliminar Horario"
                        content="¿estás seguro de eliminar este horario?" />
                    <div className={this.state.formulario ? "full-width" : "hidden"}>
                        <AgregarFormulario
                            title={
                                this.state.editar ?
                                    "Editar horario del " + DAYS[this.state.editar]
                                    : "Agregar horario para el " + DAYS[this.state.agregar]
                            }
                            formActions={this.formActions}
                            show={this.state.formulario}
                            showCalendar={false}
                            data={this.state.atencion}
                            editar={this.state.editar}
                            agregar={this.state.agregar} />
                    </div>
                    <div className={this.state.formulario ? "hidden" : "full-width flex-row nav-list h-center"}>
                        <CardList
                            displayList="justify no-padding full-width flex-column nav-list h-center"
                            elems={diasAtencion} />
                    </div>
                </div>
            </div>
        );
    }
}