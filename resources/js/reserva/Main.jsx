import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Local from './pasos/Local.jsx';
import Evento from "./pasos/Evento.jsx";
import Exito from "./pasos/Exito.jsx";
import Navigation from '../componentes/control/Navigation.jsx';

//holds reservation state
export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            fecha: new Date(),
            navPanel: 0,
            select:{
                local:{
                    name:"local",
                    show:false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        1: "Local 1",
                        2: "Local 2",
                        3: "Local 3"
                    }
                },
                ubicacion:{
                    name:"ubicacion",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        1: "Terraza",
                        2: "Salón",
                        3: "Vereda"
                    }
                },
                evento: {
                    name: "evento",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        1: "Cumpleaños",
                        2: "Cita",
                        3: "Amigos",
                        4: "Boda"
                    }
                },
                hora: {
                    name: "hora",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        1: "Hora 1",
                        2: "Hora 2",
                        3: "Hora 3",
                        4: "Hora 4"
                    }
                },
                personas: {
                    name: "personas",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        1: "Persona 1",
                        2: "Persona 2",
                        3: "Persona 3",
                        4: "Persona 4"
                    }
                },
            }
        };
        this.onCalendarChange = this.onCalendarChange.bind(this);
        this.clickNavigation = this.clickNavigation.bind(this);
        /** start Select */
        this.selectOption = this.selectOption.bind(this);
        this.showOptions = this.showOptions.bind(this);
        /** start Select */
        this.jumpPanel = this.jumpPanel.bind(this);
        this.panels = [0,1,2];
    }
    
    onCalendarChange (date) {
        this.setState({
            fecha:date
        });
    }
    /** start select functions */
    showOptions(e){
        let name = e.currentTarget.getAttribute('select');
        let select = this.state.select;
        let trigger = select[name];
        trigger.show = !trigger.show;
        select[name] = trigger;
        this.setState({select});
    }
    selectOption(e){
        let value = e.target.getAttribute('keyvalue');
        let name = e.target.getAttribute('select');
        let select = this.state.select;
        let trigger = select[name];
        trigger.selected = (value !== select[name].selected) ? value : null;
        trigger.input
        select[name] = trigger;
        this.setState({select});
    }
    /** end select functions */

    getPanelTitle (panelId) {
        return this.panels[panelId];
    }

    clickNavigation(e){
        e.preventDefault();
        let elem = e.currentTarget.getAttribute('type');
        let navPanel=this.state.navPanel;
        switch (elem){
            case "next":
                navPanel = navPanel + 1;
            break;
            case "prev":
                navPanel = navPanel - 1;
            break;
            case "first":
                navPanel = 0;
            break;
            case "last":
                navPanel = this.panels.length - 1;
            break;
        }
        this.setState({navPanel});
    }

    jumpPanel (e){
        let navPanel = parseInt(e.target.getAttribute("jump"));
        this.setState({navPanel});
    }

    render() {
        const buttons = {
            first:{
                tab: this.panels[0],
                icon: "fa fa-angle-double-left",
                class: "nav-reserva pointer",
                container: "box-padding",
                type: "first"
            },
            last:{
                tab: this.panels[this.panels.length-1],
                icon: "fa fa-angle-double-right",
                class: "nav-reserva pointer",
                container: "box-padding",
                type: "last"
            },
            right: {
                tab: this.state.navPanel+1,
                icon: "fa fa-angle-right",
                class: "nav-reserva pointer",
                container: "box-padding",
                type:"next"
            },
            left: {
                tab: this.state.navPanel-1,
                icon: "fa fa-angle-left",
                class: "nav-reserva pointer",
                container: "box-padding",
                type: "prev"
            },
            current:this.state.navPanel
        };
        const selectHandlers = {
            showToggle:this.showOptions,
            change: this.selectOption,
            preventBlur:this.noBlur
        };
        return (
            <div className="container">
                <div className="align-center">
                    <Local {...selectHandlers} select={this.state.select.local} show={this.state.navPanel === 0}/>
                    <Evento {...selectHandlers} eventos={this.state.select.evento} persona={this.state.select.personas} hora={this.state.select.hora} ubicacion={this.state.select.ubicacion} show={this.state.navPanel === 1} fecha={this.state.fecha} onCalendarChange={this.onCalendarChange}/>
                    <Exito show={this.state.navPanel === 2}/>
                </div>
                <Navigation {...buttons} panels ={this.panels} click={this.clickNavigation} jumpTo={this.jumpPanel}/>
            </div>
        );
    }
}
    
if (document.getElementById('reserva-container')) {
    ReactDOM.render(<Main />, document.getElementById('reserva-container'));
}
