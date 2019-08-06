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
import Titulo from '../../../componentes/basic/Titulo';
/**
 * sub elements
 */
import AgregarFormulario from './AgregarFormulario';
/**
 * function
 */
import generateMonth from '../../../componentes/calendario/procedimientos/generateMonth';
import { formActions, formNavigation, panelNavigation } from '../../../funciones/dataActions';
import {closeModal,ConfirmarModal} from '../../../componentes/modal/Modal';
/**
 * constants
 */
import {NO_DAY_CONTROL} from '../../../constantes/CalendarControls';
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';

//Feriados should be on this format when doing ajax request
var formattedFeriados = {
    1559358000000: {
        id:1,
        reservas:{
            apertura: "15:30",
            cierre: "19:30"
        },
        atencion:{
            apertura: "15:30",
            cierre: "19:30"
        },
        descripcion: "descripcion1",
        estado: 1
    },
    1560481200000: {
        id: 2,
        reserva:{
            apertura: "16:30",
            cierre: "20:00",
        },
        atencion: {
            apertura: "15:30",
            cierre: "19:30"
        },
        descripcion: "descripcion2",
        estado: 1
    },
    1561345200000: {
        id: 3,
        reserva:{
            apertura: "18:10",
            cierre: "21:00"
        },
        atencion: {
            apertura: "15:30",
            cierre: "19:30"
        },
        descripcion: "descripcion3",
        estado: 1
    },
    1561518000000: {
        atencion:{
            apertura: "20:20",
            cierre: "23:30"
        },
        reserva:{
            apertura: "20:20",
            cierre: "23:30"
        },
        descripcion: "descripcion4",
        estado: 1
    },
    1561690800000: {
        id: 4,
        reserva: {
            apertura: "20:20",
            cierre: "23:30"
        },
        atencion:{
            apertura: "17:00",
            cierre: "19:50"
        },
        descripcion: "descripcion4",
        estado: 1
    },
    1561777200000: {
        id: 14,
        reserva: {
            apertura: "20:20",
            cierre: "23:30"
        },
        atencion:{
            apertura: "18:40",
            cierre: "23:50"
        },
        descripcion: "descripcion5",
        estado: 0
    }
}

export default class DiasFeriados extends Component {
    constructor(props){
        super(props);
        this.state= {
            feriados: formattedFeriados,
            show:"2",
            formulario:false,
            date:new Date(),
            intervalo:10,
            editar: null,
            agregar:false,
            controls : NO_DAY_CONTROL
        };
        
        this.actions = {
            outer:{
                editar: this.editarFeriado.bind(this),
                eliminar: this.eliminarFeriado.bind(this)
            },
            inner:{}
        };

        this.guardarFeriado = this.guardarFeriado.bind(this);
        this.verFeriado = this.verFeriado.bind(this);
        this.eliminarFeriado = this.eliminarFeriado.bind(this);
        this.editarFeriado = this.editarFeriado.bind(this);
        this.agregarFeriado = this.agregarFeriado.bind(this);
        this.verCalendario = this.verCalendario.bind(this); 
        this.closeModal = closeModal.bind(this);

        this.editAddControls = panelNavigation(this.props.changePanel, this.agregarFeriado, "2");
        this.formNavigation = formNavigation(this.verCalendario, this.eliminarFeriado);
        this.formActions = formActions(this.verCalendario, this.guardarFeriado);

    }

    guardarFeriado(e){
        e.preventDefault();
        console.log("culo");
    }

    verFeriado(e) {
        e.preventDefault();
        let dateString = parseInt(e.currentTarget.getAttribute('data'));
        this.setState({show:"2",date:new Date(dateString)});
    }
    
    editarFeriado(e) {
        e.preventDefault();
        let dateString = parseInt(e.currentTarget.getAttribute('data'));
        this.setState({ agregar: null, editar: new Date(dateString), formulario: true });
    }

    agregarFeriado(e) {
        e.preventDefault();
        this.setState({ agregar: true, editar: null, formulario: true });
    }

    verCalendario(e) {
        e.preventDefault();
        this.setState({ agregar: null, editar: null, formulario: false });
    }
    
    eliminarFeriado(e) {
        e.preventDefault();
        this.setState({
            open: true
        })
    }

    componentDidMount() {
        console.log('feriadosMount');
    }

    componentWillUnmount() {
        console.log('feriadosUnmount');
    }

    render(){
        const controls = this.state.editar ?
            this.formNavigation 
            : this.state.agregar?
                [this.formNavigation[0]]
                : this.editAddControls
        return (
            <div className={(this.props.show) ? "full-width" : "hidden"}>
                <Titulo
                    title="Días Feriados"
                    navigation={controls} />
                <ConfirmarModal
                    open={this.state.open}
                    closeModal={this.closeModal}
                    title="Eliminar Feriado"
                    content="¿estás seguro de eliminar este feriado?" />        
                <div className={(this.state.formulario) ? "full-width" : "hidden"}>
                    <AgregarFormulario
                        title={this.state.editar ?
                            "Editar feriado del " + DAYS[this.state.editar.getDay()] + " " + this.state.editar.getDate() + " " +MONTHS[this.state.editar.getMonth()]
                            : "Agregar Feriado"
                        }
                        formActions={this.formActions}
                        show={this.state.formulario}
                        showCalendar={true}
                        data={this.state.feriados}
                        editar={this.state.editar ? this.state.editar.getTime() : null}
                        agregar={this.state.agregar} />
                </div>
                <div className={(this.state.formulario) ? "hidden" : "full-width"}>
                    <Calendar
                        show={this.state.show}
                        date={this.state.date} 
                        type="feriados"
                        actions={this.actions}
                        controls={this.state.controls}
                        data={this.state.feriados}/>
                </div>
            </div>
        );
    }
}
