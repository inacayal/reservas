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
        reserva:{
            apertura: "15:30",
            cierre: "19:30"
        },
        atencion:{
            apertura: "15:30",
            cierre: "19:30"
        },
        descripcion: "descripcion1",
        estado: 'laboral'
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
        estado: 'laboral'
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
        estado: 'laboral'
    },
    1561518000000: {
        id:12,
        atencion:{
            apertura: "20:20",
            cierre: "23:30"
        },
        reserva:{
            apertura: "20:20",
            cierre: "23:30"
        },
        descripcion: "descripcion4",
        estado: 'laboral'
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
        estado: 'laboral'
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
        estado: 'no_laboral'
    }
}

export default class Feriados extends Component {
    constructor(props){
        super(props);
        this.state= {
            feriados: formattedFeriados,
            show:"2",
            date:new Date(),
            intervalo:10,
            controls : NO_DAY_CONTROL
        };
        
        this.actions = {
            outer:{
                editar: () => false,
                eliminar: ()=>false
            },
            inner:{}
        };

        this.verFeriado = this.verFeriado.bind(this);
        this.eliminarFeriado = this.eliminarFeriado.bind(this);
        this.closeModal = closeModal.bind(this);

        this.nav = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar nuevo
                    </div>
                ),
                to: '/horarios/feriados/agregar'
            }
        ];
    }

    verFeriado(e) {
        e.preventDefault();
        let dateString = parseInt(e.currentTarget.getAttribute('data'));
        this.setState({show:"2",date:new Date(dateString)});
    }
    
    eliminarFeriado(e) {
        e.preventDefault();
        this.setState({
            open: true
        });
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
                : this.editAddControls;
        return (
            <>
                <Titulo
                    title="Feriados"
                    links={this.nav} />
                <div className="container">
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.closeModal}
                        title="Eliminar Feriado"
                        content="¿estás seguro de eliminar este feriado?" />        
                    <Calendar
                        show={this.state.show}
                        date={this.state.date} 
                        type="feriados"
                        actions={this.actions}
                        controls={this.state.controls}
                        data={this.state.feriados}/>
                </div>
            </>
        );
    }
}
/**
 * 
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
 */
