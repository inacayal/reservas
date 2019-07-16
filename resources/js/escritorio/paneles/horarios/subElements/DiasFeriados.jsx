//React Components
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//Complex Components
import Calendar from '../../../../componentes/complex/calendar/Calendar';
import Button from '../../../../componentes/basic/Button';
import AgregarFormulario from './AgregarFormulario';
//Functions
import generateMonth from '../../../../funciones/generateMonth';

//Feriados should be on this format when doing ajax request
var formattedFeriados = {
    1559358000000: {
        id:1,
        apertura: "15:30",
        cierre: "19:30",
        descripcion: "descripcion1",
        estado: 1
    },
    1560481200000: {
        id: 2,
        apertura: "16:30",
        cierre: "20:00",
        descripcion: "descripcion2",
        estado: 1
    },
    1561345200000: {
        id: 3,
        apertura: "18:10",
        cierre: "21:00",
        descripcion: "descripcion3",
        estado: 1
    },
    1561518000000: {
        apertura: "20:20",
        cierre: "23:30",
        descripcion: "descripcion4",
        estado: 1
    },
    1561690800000: {
        id: 4,
        apertura: "17:00",
        cierre: "19:50",
        descripcion: "descripcion4",
        estado: 1
    },
    1561777200000: {
        id: 14,
        apertura: "18:40",
        cierre: "23:50",
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
            editar: {
                enable:false,
                data:""
            },
            controls :[
                {
                    title: "Anual",
                    data: "0",
                    class: "box-transparent highlight-hover h-padding small-v-padding bordered transparent-border"
                },
                {
                    title: "Mensual",
                    data: "1",
                    class: "box-transparent highlight-hover bordered h-padding small-v-padding transparent-border"
                },
                {
                    title: "Semanal",
                    data: "2",
                    class: "blue-background highlight-border h-padding small-v-padding"
                }
            ]
        };
        
        this.actions = {
            outer:{
                editar: this.editarFeriado.bind(this),
                eliminar: this.eliminarFeriado.bind(this)
            },
            inner:{}
        };

        this.toggleEditAdd = this.toggleEditAdd.bind(this);
        this.guardarFeriado = this.guardarFeriado.bind(this);
        this.toggleEditAdd = this.toggleEditAdd.bind(this);
        this.verFeriado = this.verFeriado.bind(this);
        this.eliminarFeriado = this.eliminarFeriado.bind(this);
        this.editarFeriado = this.editarFeriado.bind(this);
        this.agregarFeriado = this.agregarFeriado.bind(this);
        this.verCalendario = this.verCalendario.bind(this);

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
    
    eliminarFeriado(e) {
        console.log("this.eliminarFeriado");
    }

    editarFeriado(e) {
        e.preventDefault();
        let dateString = parseInt(e.currentTarget.getAttribute('data'));
        this.toggleEditAdd(true,true,dateString);
    }
    
    agregarFeriado(e) {
        e.preventDefault();
        this.toggleEditAdd(false,true,null);
    }

    verCalendario(e) {
        e.preventDefault();
        this.toggleEditAdd(false,false,null);
    }

    toggleEditAdd(editarBool,formBool,data){
        let editar = this.state.editar;
        editar.enable = editarBool;
        editar.data= data ? data : "";
        this.setState({editar:editar,formulario:formBool});
    }

    render(){
        //console.log(this.state.editar,this.state.agregar);
        return (
            <div className={(this.props.show) ? "full-width" : "hidden"}>
                <div className={(this.state.formulario) ? "full-width" : "hidden"}>
                    <Button
                        title={(
                            <div className="smaller-text text bold">
                                <i className="fas fa-arrow-left inline-box side-margin" />
                                Volver
                            </div>
                        )}
                        click={this.verCalendario}
                        class="box-transparent highlight-hover border-box button-border inline-block"
                        disabled={false} />
                    <AgregarFormulario
                        show={this.state.formulario}
                        showCalendar={true}
                        data={this.state.feriados}
                        editar={this.state.editar}
                        cancelar={this.verCalendario}
                        guardarFeriado={this.guardarFeriado}/>
                </div>
                <div className={(this.state.formulario) ? "hidden" : "full-width"}>
                    <Button
                        title={(
                            <div className="smaller-text text bold">
                                <i className="fas fa-arrow-left inline-box side-margin" />
                                Volver
                            </div>
                        )}
                        data="2"
                        click={this.props.changePanel}
                        container="inline-block side-margin"
                        class="box-transparent highlight-hover border-box button-border"
                        disabled={false} />
                    <Button
                        title={(
                            <div className="smaller-text text bold">
                                <i className="fas fa-plus-circle inline-box side-margin" />
                                Agregar feriados
                            </div>
                        )}
                        click={this.agregarFeriado}
                        container="inline-block side-margin"
                        class="box-transparent highlight-hover border-box button-border inline-block"
                        disabled={false} />
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
