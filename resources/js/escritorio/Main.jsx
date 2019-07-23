import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//Navigation Components
import Lateral from './contenedores/Lateral';
import Navegacion from './contenedores/Navegacion';
//Panel Components
import Configuracion from './paneles/configuracion/Configuracion';
import Escritorio from './paneles/escritorio/Escritorio';
import Eventos from './paneles/eventos/Eventos';
import Horarios from './paneles/horarios/Horarios';
import Locales from './paneles/locales/Locales';
import Reservas from './paneles/reservas/Reservas';
import Ubicaciones from './paneles/ubicaciones/Ubicaciones';
import BreadCrumb from '../componentes/control/BreadCrumb';

const sidebar = [//get on ajax request
    {
        data: "0",
        disabled: false,
        title: "Escritorio",
        sub: []
    },
    {
        data: "1",
        disabled: false,
        title: "Reservaciones",
        sub: [
            {
                title:"Configuración",
                data: "0"
            },
        ]
    },
    {
        data: "2",
        disabled: false,
        title: "Horarios de atención",
        sub: [
            {
                title: 'Días Feriados',
                data: "0"
            }
        ]
    },
    {
        data: "3",
        disabled: false,
        title: "Ubicaciones",
        sub: []
    },
    {
        data: "4",
        disabled: false,
        title: "Eventos",
        sub: []
    },
    {
        data: "5",
        disabled: false,
        title: "Locales",
        sub: []
    },
    {
        data: "6",
        disabled: false,
        title: "Configuración",
        sub: [
            {
                title: 'Encargado',
                data: "0"
            },
            {
                title:"Ubicacion",
                data:"1"
            },
            {
                title:"Apertura y cierre",
                data:"2"
            },
            {
                title:"Contacto del local",
                data:"3"
            },
            {
                title:"Usuario",
                data:"4"
            }
        ]
    }
];

//holds reservation state
export default class Main extends Component {
    constructor() {
        super();
        this.changePanel = this.changePanel.bind(this);
        this.changeSubElement = this.changeSubElement.bind(this);
        this.restoreSubElements = this.restoreSubElements.bind(this);
        this.state = {
            showing:"0",
            sidebar: sidebar, 
            crumb: [{ 
                title: "Escritorio", 
                data: "0",
                class:"box-transparent small-v-padding highlight-title full-width text-left",
                click: this.changePanel
            }]
        };
    }

    changeSubElement(e){
        e.preventDefault();
        let clicked = e.currentTarget.getAttribute('data');
        let sidebar = this.state.sidebar;
        let subElements = sidebar[this.state.showing].sub;
        let crumb = this.state.crumb;
        subElements.map(
            (e, i) => { 
                if (i == clicked){
                    if (crumb[1]){
                        if (crumb[1].data !== clicked){
                            e.class = "highlight-title box-transparent box-padding"; 
                            crumb[1] = e;
                        } else {
                            crumb.pop();
                            e.class = "box-transparent box-padding highlight-hover full-width text-left";
                        }
                    } else {
                        e.class = "highlight-title box-transparent box-padding full-width text-left";
                        crumb.push(e)
                    };
                } else e.class = "box-transparent box-padding highlight-hover full-width text-left"
                return e;
            }
        );
        sidebar[this.state.showing].sub = subElements;
        this.setState({sidebar:sidebar,crumb:crumb});
    }
    restoreSubElements(elements){
        return elements.map(
            e => {
                e.class = "box-transparent box-padding highlight-hover full-width text-left";
                return e;
            }
        );
    }
    changePanel(e){
        e.preventDefault();
        let showing = e.currentTarget.getAttribute('data'),
            sidebar = this.state.sidebar,
            crumb = [];
        sidebar[this.state.showing].sub = this.restoreSubElements(sidebar[this.state.showing].sub);
        crumb = [{
            title: sidebar[showing].title,
            data: showing,
            class: "small-v-padding box-transparent h-padding highlight-title full-width text-left",
            click: this.changePanel
        }];
        this.setState({ showing: showing, crumb:crumb, sidebar:sidebar});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Navegacion/>
                </div>
                <div className="row">
                    <div className="col-md-3 no-padding">
                        <Lateral 
                            current={this.state.showing} 
                            items={this.state.sidebar} 
                            changePanel={this.changePanel}
                            changeSub={this.changeSubElement}/>
                    </div>
                    <div className="col-md-9">
                        <div className="container">
                            <div className="row">
                                <BreadCrumb 
                                    change={this.changeCrumb} 
                                    items={this.state.crumb} />
                            </div>
                            <div className="row">
                                <Escritorio 
                                    classes={(this.state.showing === "0") ? "full-width" : "hidden"} />
                                <Reservas 
                                    changePanel={this.changePanel}
                                    panel={this.state.showing === "1"} 
                                    crumbControl={this.changeCrumb}
                                    selectInnerElement={this.changeSubElement} 
                                    subElements={this.state.sidebar[1].sub} 
                                    currentSub={this.state.crumb[1] ? this.state.crumb[1].data : null}/>
                                <Horarios 
                                    changePanel={this.changePanel}
                                    panel={this.state.showing === "2"} 
                                    selectInnerElement={this.changeSubElement} 
                                    subElements={this.state.sidebar[2].sub} 
                                    currentSub={this.state.crumb[1] ? this.state.crumb[1].data : null}/>
                                <Ubicaciones 
                                    panel={this.state.showing === "3"}
                                    selectInnerElement={this.changeSubElement}
                                    subElements={this.state.sidebar[3].sub}
                                    currentSub={this.state.crumb[1] ? this.state.crumb[1].data : null}/>
                                <Eventos 
                                    panel={this.state.showing === "4"}
                                    selectInnerElement={this.changeSubElement}
                                    subElements={this.state.sidebar[4].sub}
                                    currentSub={this.state.crumb[1] ? this.state.crumb[1].data : null} />
                                <Locales
                                    panel={this.state.showing === "5"}
                                    selectInnerElement={this.changeSubElement}
                                    subElements={this.state.sidebar[5].sub}
                                    currentSub={this.state.crumb[1] ? this.state.crumb[1].data : null} />
                                <Configuracion
                                    changePanel={this.changePanel}
                                    panel={this.state.showing === "6"}
                                    selectInnerElement={this.changeSubElement}
                                    subElements={this.state.sidebar[6].sub}
                                    currentSub={this.state.crumb[1] ? this.state.crumb[1].data : null} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('escritorio-container')) {
    ReactDOM.render(<Main />, document.getElementById('escritorio-container'));
}
