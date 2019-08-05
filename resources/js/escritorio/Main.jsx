/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * navigation
 */
import Lateral from './contenedores/Lateral';
import Navegacion from './contenedores/Navegacion';
import BreadCrumb from '../componentes/control/BreadCrumb';
/**
 * paneles
 */
import Configuracion from './paneles/configuracion/Configuracion';
import Escritorio from './paneles/escritorio/Escritorio';
import Eventos from './paneles/eventos/Eventos';
import Horarios from './paneles/horarios/Horarios';
import Locales from './paneles/locales/Locales';
import Reservas from './paneles/reservas/Reservas';
import Ubicaciones from './paneles/ubicaciones/Ubicaciones';
import Franquicias from './paneles/franquicias/Franquicias';

var sidebar = [//get on ajax request
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
        sub: []
    },
    {
        data: "2",
        disabled: false,
        title: "Horarios",
        sub: [
            {
                title: 'Días Feriados',
                data: "0",
                class: "box-transparent box-padding highlight-hover full-width text-left"
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
                data: "0",
                class: "box-transparent box-padding highlight-hover full-width text-left"
            },
            {
                title:"Ubicacion",
                data:"1",
                class: "box-transparent box-padding highlight-hover full-width text-left"
            },
            {
                title:"Contacto del local",
                data:"2",
                class: "box-transparent box-padding highlight-hover full-width text-left"
            },
            {
                title:"Usuario",
                data:"3",
                class: "box-transparent box-padding highlight-hover full-width text-left"
            },
            {
                title: "Reservas",
                data: "4",
                class: "box-transparent box-padding highlight-hover full-width text-left"
            }
        ]
    },
    {
        data: "7",
        disabled: false,
        title: "Franquicias",
        sub: []
    }
];
const COMPONENTES = [
    (parent)=>(
        <Escritorio
            changePanel={parent.changePanel}
            panel={true}
            selectInnerElement={parent.changeSubElement}
            subElements={parent.state.sidebar[1].sub}
            crumbControl={parent.changeCrumb}
            currentSub={parent.state.crumb[1] ? parent.state.crumb[1].data : null} />
    ),
    (parent)=>(
        <Reservas
            changePanel={parent.changePanel}
            panel={true}
            selectInnerElement={parent.changeSubElement}
            subElements={parent.state.sidebar[1].sub}
            crumbControl={parent.changeCrumb}
            currentSub={parent.state.crumb[1] ? parent.state.crumb[1].data : null} />
    ),
    (parent) => (
        <Horarios
            changePanel={parent.changePanel}
            panel={true}
            selectInnerElement={parent.changeSubElement}
            subElements={parent.state.sidebar[2].sub}
            crumbControl={parent.changeCrumb}
            currentSub={parent.state.crumb[1] ? parent.state.crumb[1].data : null} />
    ),
    (parent) => (
        <Ubicaciones
            changePanel={parent.changePanel}
            panel={true}
            selectInnerElement={parent.changeSubElement}
            subElements={parent.state.sidebar[3].sub}
            crumbControl={parent.changeCrumb}
            currentSub={parent.state.crumb[1] ? parent.state.crumb[1].data : null} />
    ),
    (parent) => (
        <Eventos
            changePanel={parent.changePanel}
            panel={true}
            selectInnerElement={parent.changeSubElement}
            subElements={parent.state.sidebar[4].sub}
            crumbControl={parent.changeCrumb}
            currentSub={parent.state.crumb[1] ? parent.state.crumb[1].data : null} />
    ),
    (parent)=>(
        <Locales
            changePanel={parent.changePanel}
            panel={true}
            selectInnerElement={parent.changeSubElement}
            subElements={parent.state.sidebar[5].sub}
            crumbControl={parent.changeCrumb}
            currentSub={parent.state.crumb[1] ? parent.state.crumb[1].data : null} />
    ),
    (parent) => (
        <Configuracion
            changePanel={parent.changePanel}
            panel={true}
            selectInnerElement={parent.changeSubElement}
            subElements={parent.state.sidebar[6].sub}
            crumbControl={parent.changeCrumb}
            currentSub={parent.state.crumb[1] ? parent.state.crumb[1].data : null} />
    ),
    (parent) => (
        <Franquicias
            changePanel={parent.changePanel}
            panel={true}
            selectInnerElement={parent.changeSubElement}
            crumbControl={parent.changeCrumb}
            subElements={parent.state.sidebar[7].sub}
            currentSub={parent.state.crumb[1] ? parent.state.crumb[1].data : null} />
    )
];
    
    

//holds reservation state
export default class Main extends Component {
    constructor() {
        super();
        this.changePanel = this.changePanel.bind(this);
        this.changeSubElement = this.changeSubElement.bind(this);
        this.state = {
            showing:"0",
            sidebar:sidebar,
            crumb: [{ 
                title: "Escritorio", 
                data: "0",
                class:"box-transparent small-v-padding highlight-title full-width text-left",
                click: this.changePanel
            }]
        };
        this.views = COMPONENTES;
    }

    changeSubElement(e){
        e.preventDefault();
        let clicked = e.currentTarget.getAttribute('data'),
            sidebar = this.state.sidebar,
            showing = this.state.showing,
            subElements = sidebar[showing].sub,
            crumb = this.state.crumb;

        if (crumb[1]){
            subElements[crumb[1].data].class = "box-transparent box-padding full-width text-left highlight-hover";
            if (crumb[1].data !== clicked) {
                subElements[clicked].class = "no-border background-border box-padding full-width text-left";   
                crumb[1] = {
                    title: subElements[clicked].title,
                    data: subElements[clicked].data,
                    class: "box-transparent small-v-padding highlight-title full-width text-left",
                    click: this.changeSubElement
                }; 
            } else 
                crumb.pop();
        } else {
            subElements[clicked].class = "no-border box-padding background-border full-width text-left";
            crumb[1] = {
                title: subElements[clicked].title,
                data: subElements[clicked].data,
                class: "box-transparent small-v-padding highlight-title full-width text-left",
                click: this.changeSubElement
            }; 
        }
        sidebar[showing].sub = subElements;
        this.setState({sidebar:sidebar,crumb:crumb});
    }

    changePanel(e){
        e.preventDefault();
        let showing = e.currentTarget.getAttribute('data'),
            sidebar = this.state.sidebar,
            crumb = this.state.crumb;
        
        if (sidebar[this.state.showing].sub.length>0 && crumb[1]){
            sidebar[this.state.showing].sub[crumb[1].data].class = "box-transparent box-padding full-width text-left";
        }
        crumb = [{
            title: sidebar[showing].title,
            data: showing,
            class: "small-v-padding box-transparent h-padding highlight-title full-width text-left",
            click: this.changePanel
        }];
        this.setState({ showing: showing, crumb:crumb, sidebar:sidebar});
    }

    render() {
        const renderComponent =this.views[this.state.showing](this);
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
                                {renderComponent}
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
