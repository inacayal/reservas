import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Local from './steps/Local.jsx';
import Calendario from './steps/Calendario.jsx';
import Ubicacion from './steps/Ubicacion.jsx';
import Datos from "./steps/Datos.jsx";
import Exito from "./steps/Exito.jsx";
import Evento from "./steps/Evento.jsx";
import Navigation from './Navigation.jsx';

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
                    selected:null,
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
                    list: {
                        1: "Terraza",
                        2: "Salón",
                        3: "Vereda"
                    },
                    images: {
                        1: "ubicaciones/terraza-roja.png",
                        2: "ubicaciones/lampara-roja.png",
                        3: "ubicaciones/banco-rojo.png",
                    }
                },
                evento: {
                    name: "evento",
                    show: false,
                    selected: null,
                    list: {
                        1: "Cumpleaños",
                        2: "Cita",
                        3: "Amigos",
                        4: "Boda"
                    },
                    images: {
                        1: "eventos/torta-roja.png",
                        2: "eventos/pareja-roja.png",
                        3: "eventos/equipo-rojo.png",
                        4: "eventos/anillo-rojo.png"
                    }
                },
            }
        };
        this.panels = [
            "Selecciona el local donde vas a reservar",
            "Selecciona el dia y hora de tu reserva",
            "Selecciona el lugar de tu reserva",
            "Selecciona el tipo de evento",
            "Deja tus datos personales",
            "Exito"
        ];
        this.onCalendarChange = this.onCalendarChange.bind(this);
        this.clickNavigation = this.clickNavigation.bind(this);
        /** start Select */
        this.selectOption = this.selectOption.bind(this);
        this.onLocalChange = this.onLocalChange.bind(this);
        this.onUbicacionChange = this.onUbicacionChange.bind(this);
        this.onEventoChange = this.onEventoChange.bind(this);
        /** start Select */
        this.jumpPanel = this.jumpPanel.bind(this);
        this.showOptions = this.showOptions.bind(this);
    }
    
    onCalendarChange (date) {
        this.setState({
            fecha:date
        });
    }
    /** start select functions */
    showOptions(e){
        let name = e.currentTarget.getAttribute('name');
        let select = this.state.select;
        let trigger = select[name];
        trigger.show = !trigger.show;
        select[name] = trigger;
        this.setState({select});
    }
    selectOption(e){
        let value = e.target.getAttribute('keyvalue');
        let name = e.target.getAttribute('name');
        let select = this.state.select;
        let trigger = select[name];
        trigger.show = false;
        if (value !== select[name].selected) {
            trigger.selected = value;
        } else {
            trigger.selected = null;
        }
        select[name] = trigger;
        this.setState({ select });
    }
    onLocalChange (ev) {
        this.selectOption(ev);
    }

    onUbicacionChange(e){
        this.selectOption(e);
    }

    onEventoChange(e) {
        this.selectOption(e);
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
                container: "small center-margin",
                type: "first"
            },
            last:{
                tab: this.panels[this.panels.length - 1],
                icon: "fa fa-angle-double-right",
                class: "nav-reserva pointer",
                container: "small center-margin",
                type: "last"
            },
            right: {
                tab: this.state.navPanel+1,
                icon: "fa fa-angle-right",
                class: "nav-reserva pointer",
                container: "small center-margin",
                type:"next"
            },
            left: {
                tab: this.state.navPanel-1,
                icon: "fa fa-angle-left",
                class: "nav-reserva pointer",
                container: "small center-margin",
                type: "prev"
            },
            current:this.state.navPanel
        };
        const selectLocal = {
            showToggle:this.showOptions,
            select:this.state.select.local
        };
        const selectUbicacion = {
            showToggle: this.showOptions,
            select: this.state.select.ubicacion
        }
        const selectEvento = {
            showToggle: this.showOptions,
            select: this.state.select.evento
        }
        return (
            <div className="container">
                <div className="align-center">
                    <Local {...selectLocal} change={this.onLocalChange} show={this.state.navPanel === 0}/>
                    <Calendario {...this.state.fecha} onChange={this.onCalendarChange} show={this.state.navPanel === 1}/>
                    <Ubicacion {...selectUbicacion} change={this.onUbicacionChange} show={this.state.navPanel === 2}/>
                    <Evento {...selectEvento} change={this.onEventoChange} show={this.state.navPanel === 3} />
                    <Datos show={this.state.navPanel === 4}/>
                    <Exito show={this.state.navPanel === 5}/>
                </div>
                <Navigation {...buttons} panels ={this.panels} click={this.clickNavigation} jumpTo={this.jumpPanel}/>
            </div>
        );
    }
}
    
if (document.getElementById('reserva-container')) {
    ReactDOM.render(<Main />, document.getElementById('reserva-container'));
}
