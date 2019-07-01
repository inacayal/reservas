//React Components
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//Complex Components
import Calendar from '../../../../componentes/complex/calendar/Calendar';
//Constants
import {DAYS,MONTHS} from '../../../../constantes/DaysMonths';
//Functions
import generateMonth from '../../../../funciones/generateMonth';

//Feriados should be on this format when doing ajax request
var formattedFeriados = {
    1559358000000: {
        apertura: "apertura1",
        cierre: "cierre1",
        descripcion: "descripcion1",
        estado: 1
    },
    1560481200000: {
        apertura: "apertura2",
        cierre: "cierre2",
        descripcion: "descripcion2",
        estado: 1
    },
    1561345200000: {
        apertura: "apertura3",
        cierre: "cierre3",
        descripcion: "descripcion3",
        estado: 1
    },
    1561518000000: {
        apertura: "apertura4",
        cierre: "cierre4",
        descripcion: "descripcion4",
        estado: 1
    },
    1561690800000: {
        apertura: "apertura4",
        cierre: "cierre4",
        descripcion: "descripcion4",
        estado: 1
    },
    1561777200000: {
        apertura: "apertura5",
        cierre: "cierre5",
        descripcion: "descripcion5",
        estado: 0
    }
}
export default class DiasFeriados extends Component {
    constructor(props){
        super(props);
        this.state= {
            feriados: formattedFeriados
        };
        this.actions = {
            agregar: this.eliminarFeriado.bind(this),
            editar: this.editarFeriado.bind(this),
            ver: this.verFeriado.bind(this),
            eliminar: this.eliminarFeriado.bind(this)
        };
    }

    agregarFeriado(e){
        console.log("this.agregarFeriado");
    }

    editarFeriado(e){
        console.log("this.editarFeriado");
    }

    verFeriado(e) {
        console.log("this.verFeriado");
    }

    eliminarFeriado(e) {
        console.log("this.eliminarFeriado");
    }
    
    render(){
        return (
            <div className={(this.props.show) ? "full-width" : "hidden"}>
                <Calendar 
                    changeView={this.changeView}
                    views={this.buttons}
                    actions={this.actions}
                    controls={this.state.calendarControl}
                    data={this.state.feriados}/>
            </div>
        );
    }
}
