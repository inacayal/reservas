import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DiasFeriados from './subElements/DiasFeriados';
import ButtonList from '../../../componentes/complex/allUse/ButtonList';

import CardList from '../../../componentes/complex/allUse/CardList';
import generateWeek from '../../../funciones/generateWeek';


export class Horarios extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: "1",
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
                    cierre: "21:30:00",
                    apertura: "23:00:00",
                    estado: "1"
                }
            },
            acciones: {
                outer:{
                    agregar: this.eliminarAtencion.bind(this),
                    editar: this.editarAtencion.bind(this),
                    eliminar: this.eliminarAtencion.bind(this)
                },
                inner:{}
            }
        };
    }
    agregarAtencion(e) {
        console.log("this.agregarAtencion");
    }

    editarAtencion(e) {
        console.log("this.editarAtencion");
    }

    eliminarAtencion(e) {
        console.log("this.eliminarAtencion");
    }
    render() {
        let diasAtencion = generateWeek(null, this.state.atencion, this.state.acciones, null, "horarios");
        return (
            <div className={(this.props.panel) ? "full-width container" : "hidden"}>
                <div className={this.props.currentSub !== "0" ? "row" : "hidden"}>
                    <div className="full-width flex-row nav-list h-center">
                        <CardList
                            displayList="justify no-padding full-width flex-column nav-list h-center"
                            elems={diasAtencion} />
                    </div>
                </div>
                <div className="row">
                    <DiasFeriados show={this.props.currentSub==="0"}/>
                </div>
            </div>
        );
    }
}
export default Horarios;
