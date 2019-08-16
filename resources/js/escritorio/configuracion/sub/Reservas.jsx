/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import { Select, showOptions, selectOption } from '../../../componentes/input/Select';
import Actions from '../../../componentes/basic/Actions';

export default class Reservas extends Component {
    constructor(props){
        super(props);
        this.state = {
            select: {
                intervalo: {
                    name: "intervalo",
                    show: false,
                    selected: this.props.data.intervalo,
                    search: "",
                    input: React.createRef(),
                    list: {
                        1: "1 minuto",
                        2: "2 minutos",
                        3: "3 minutos",
                        5: "5 minutos",
                        4: "4 minutos",
                        6: "6 minutos",
                        10: "10 minutos",
                        12: "12 minutos",
                        15: "15 minutos",
                        20: "20 minutos",
                        30: "30 minutos"
                    }
                },
                caida: {
                    name: "caida",
                    show: false,
                    selected: this.props.data.caida,
                    search: "",
                    input: React.createRef(),
                    list: {
                        10: "10 minutos",
                        20: "20 minutos",
                        30: "30 minutos",
                        40: "40 minutos",
                        50: "50 minutos"
                    }
                }
            }
        };
        this.showOptions = showOptions.bind(this);
        this.selectOption = selectOption.bind(this);
        this.nav = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-arrow-left inline-box side-margin" />
                        Volver a configuración
                            </div>
                ),
                to: '/configuracion'
            }
        ];
    }
    
    componentDidMount() {
        console.log('configuracionReservasMount');
    }
    
    componentWillUnmount() {
        console.log('configuracionReservasUnmount');
    }
    
    guardarConfiguracion(e) {
        e.preventDefault();
        console.log('guardado');
    }   
    
    render(){
        return (
            <form className="full-width">
                <div className="container">
                    <div className="sub-title h-padding full-width border-bottom">
                        <span className="side-margin inline-block text-top" >
                            Reservaciones
                        </span >
                        <Actions
                            links={this.nav} />
                    </div>
                    <div className="row v-padding">
                        <div className="col-md-6">
                            <h6 className="highlight bold no-margin">
                                Defina el intervalo permitido para la reserva.
                            </h6>
                            <Select
                                {...this.state.select.intervalo}
                                titulo="selecciona el intervalo de la reserva"
                                toggle={this.showOptions}
                                change={this.selectOption} />
                        </div>
                        <div className="col-md-6">
                            <h6 className="highlight bold no-margin">
                                Defina la duración máxima de la reserva.
                            </h6>
                            <Select
                                {...this.state.select.caida}
                                titulo="selecciona la duración máxima de la reserva"
                                toggle={this.showOptions}
                                change={this.selectOption} />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}