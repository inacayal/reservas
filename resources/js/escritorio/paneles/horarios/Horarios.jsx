/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import Titulo from '../../../componentes/basic/Titulo';
import CardList from '../../../componentes/basic/CardList';
import ButtonList from '../../../componentes/basic/ButtonList';
import {closeModal,ConfirmarModal} from '../../../componentes/modal/Modal';
/**
 * sub elements
 */
import DiasFeriados from './subElements/DiasFeriados';
import AgregarFormulario from './subElements/AgregarFormulario';
/**
 * functions
 */
import generateWeek from '../../../componentes/calendario/procedimientos/generateWeek';
import { formNavigation, formActions } from '../../../funciones/dataActions';
/**
 * constantes
 */
import { DAYS, MONTHS, HOURS } from '../../../constantes/DaysMonths';
export class Horarios extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: "1",
            agregar: false, 
            editar: null, 
            formulario: false,
            open:false,
            atencion: {
                0: {
                    apertura: "15:00:00",
                    cierre: "17:30:00",
                    estado: "1"
                },
                1: {
                    apertura: "14:30:00",
                    cierre: "18:00:00",
                    estado: "1"
                },
                2: {
                    apertura: "16:30:00",
                    cierre: "20:30:00",
                    estado: "0"
                },
                3: {
                    apertura: "15:30:00",
                    cierre: "21:00:00",
                    estado: "1"
                },
                4: {
                    apertura: "16:00:00",
                    cierre: "19:30:00",
                    estado: "1"
                },
                5: {
                    apertura: "17:00:00",
                    cierre: "22:30:00",
                    estado: "1"
                },
                6: {
                    apertura: "21:30:00",
                    cierre: "23:00:00",
                    estado: "1"
                }
            },
            acciones: {
                outer:{
                    agregar: this.agregarHorario.bind(this),
                    editar: this.editarHorario.bind(this),
                    eliminar: this.eliminarHorario.bind(this)
                },
                inner:{}
            }
        };

        this.closeModal = closeModal.bind(this);
        this.verHorarios = this.verHorarios.bind(this);
        this.eliminarHorario = this.eliminarHorario.bind(this);

        this.editAddControls = formNavigation(this.verHorarios,this.eliminarHorario);
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
    
    eliminarHorario(e) {
        e.preventDefault();
        this.setState({
            open: true
        })
    }
    shouldComponentUpdate(nextProps) {
        return this.props.panel || nextProps.panel;
    }
    render() {
        const diasAtencion = generateWeek['horarios'](
                null, 
                this.state.atencion, 
                this.state.acciones, 
                null,
                'horarios'
            ),
            controls = this.state.editar ?
                this.editAddControls
                : this.state.agregar ? 
                    [this.editAddControls[0]]
                    : [{class:"hidden"}];
        return (
            <div className={(this.props.panel) ? "full-width container" : "hidden"}>
                <div className={this.props.currentSub !== "0" ? "row" : "hidden"}>
                    <Titulo
                        title={"Horarios de Atención"}
                        navigation={controls}/>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.closeModal}
                        title="Eliminar Horario"
                        content="¿estás seguro de eliminar este horario?" />
                    <div className={this.state.formulario ? "full-width" : "hidden"}>
                        <AgregarFormulario
                            title={
                                this.state.editar ? 
                                "Editar horario del "+DAYS[this.state.editar]
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
                <div className="row">
                    <DiasFeriados 
                        show={this.props.currentSub==="0"}
                        changePanel={this.props.changePanel}/>
                </div>
            </div>
        );
    }
}
export default Horarios;
