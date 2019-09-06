/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * pasos de la reserva
 */
import Local from './pasos/Local.jsx';
import Evento from "./pasos/evento/Evento.jsx";
import Exito from "./pasos/Exito.jsx";
/**
 * control
 */
import Paginado from '../componentes/control/Paginado.jsx';
/**
 * handlers input
 */
import { showOptions, selectOption } from '../componentes/input/Select'
import { onTextChange } from '../componentes/input/Text'

//holds reservation state
export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            fecha: new Date(),
            navPanel: 0,
            select:{
                ubicacion:{
                    name:"ubicacion",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {}
                },
                evento: {
                    name: "evento",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {}
                },
                hora: {
                    name: "hora",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {}
                },
                personas: {
                    name: "personas",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {}
                }
            }
        };
        this.onCalendarChange = this.onCalendarChange.bind(this);
        this.clickNavigation = this.clickNavigation.bind(this);
        /** start Select */
        this.selectOption = selectOption.bind(this);
        this.showOptions = showOptions.bind(this);
        this.panels = {
            0:"Local",
            1:"Evento",
            2:"Exito"
        };
    };
    onCalendarChange (date) {
        this.setState({
            fecha:date
        });
    }

    getPanelTitle (panelId) {
        return this.panels[panelId];
    }

    clickNavigation(e){
        e.preventDefault();
        let navPanel = parseInt(e.currentTarget.getAttribute('data'));
        this.setState({navPanel});
    }

    render() {
        const selectHandlers = {
            showToggle:this.showOptions,
            change: this.selectOption
        };
        return (
            <div className="container">
                <div className="row">
                    <Local 
                        {...selectHandlers} 
                        select={this.state.select.local} 
                        current={this.state.navPanel === 0}/>
                    <Evento 
                        {...selectHandlers} 
                        displayTitles={true}
                        eventos={this.state.select.evento} 
                        persona={this.state.select.personas} 
                        hora={this.state.select.hora} 
                        ubicacion={this.state.select.ubicacion} 
                        current={this.state.navPanel === 1} 
                        fecha={this.state.fecha} 
                        tileDisabled={() => false}
                        dayChange = {this.onCalendarChange}
                        monthChange = {() => false}
                        navChange = {() => false}/>
                    <Exito 
                        current={this.state.navPanel === 2}/>
                </div>
                <Paginado 
                    leftData={this.state.navPanel-1}
                    rightData={this.state.navPanel+1}
                    current={this.state.navPanel} 
                    pages ={this.panels} 
                    click={this.clickNavigation}
                    enableMaxSides={true}/>
            </div>
        );
    }
}
    
if (document.getElementById('reserva-container')) {
    ReactDOM.render(<Main />, document.getElementById('reserva-container'));
}
