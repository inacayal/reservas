/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import ButtonList from '../../../componentes/basic/ButtonList';
import CardList from '../../../componentes/basic/CardList';
import Titulo from '../../../componentes/basic/Titulo';
/**
 * handlers
 */
import {showOptions,selectOption} from '../../../componentes/input/Select';
import {onTextChange} from '../../../componentes/input/Text';
/**
 * modal
 */
import ConfirmarModal from '../../../componentes/modal/Modal';
/**
 * form sub elements
 */
import AperturaCierre from './subElements/AperturaCierre';
import Contacto from './subElements/Contacto';
import Encargado from './subElements/Encargado';
import Ubicacion from './subElements/Ubicacion';
import Usuario from './subElements/Usuario';
/**
 * funciones
 */
import generateHoursFromInterval from '../../../funciones/generateHoursFromInterval';
import { formActions, formNavigation, panelNavigation, generateConfigurationActions } from '../../../funciones/dataActions';
/**
 * constantes
 */
import {DAYS,MONTHS,HOURS} from '../../../constantes/DaysMonths';

export default class Configuracion extends Component {
    constructor(props) {
        super(props);
        this.validMinutes = generateHoursFromInterval(1);
        this.state = {
            text:{
                email_local:"",
                adm_email:"",
                adm_nombre:"",
                adm_telefono:"",
                email_local:"",
                password_local:"",
                correo_local:"",
                telefono_local:"",
                razon_social:"",
                cuit_cuil:""
            },
            select: {
                id_provincia: {
                    name: "id_provincia",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        0: "CABA",
                        1: "Buenos Aires",
                        2: "Cordoba",
                        3: "Santa fe"
                    }
                },
                apertura_hora: {
                    name: "apertura_hora",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: HOURS
                },
                apertura_minuto: {
                    name: "apertura_minuto",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: this.validMinutes
                },
                cierre_hora: {
                    name: "cierre_hora",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: HOURS
                },
                cierre_minuto: {
                    name: "cierre_minuto",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: this.validMinutes
                },
                apertura_dia: {
                    name: "apertura_dia",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: Object(DAYS)
                }
            },
            atencion: {
                0: {
                    apertura_hora: "15",
                    apertura_minuto: "20",
                    cierre_hora: "21",
                    cierre_minuto: "00",
                },
                1: {
                    apertura_hora: "16",
                    apertura_minuto: "30",
                    cierre_hora: "23",
                    cierre_minuto: "59",
                },
                2: {
                    apertura_hora: "16",
                    apertura_minuto: "30",
                    cierre_hora: "23",
                    cierre_minuto: "59",
                },
                3: {
                    apertura_hora: "16",
                    apertura_minuto: "30",
                    cierre_hora: "23",
                    cierre_minuto: "59",
                },
                4: {
                    apertura_hora: "16",
                    apertura_minuto: "30",
                    cierre_hora: "23",
                    cierre_minuto: "59",
                },
                5: {
                    apertura_hora: "16",
                    apertura_minuto: "30",
                    cierre_hora: "23",
                    cierre_minuto: "59",
                },
                6: {
                    apertura_hora: "16",
                    apertura_minuto: "30",
                    cierre_hora: "23",
                    cierre_minuto: "59",
                }
            }
        };
        
        this.configurationCards = generateConfigurationActions(this.props.selectInnerElement);
        this.formActions = formActions(this.props.changePanel,this.guardarConfiguracion,"6");
        this.formNavigation = formNavigation(this.props.changePanel,null,"6");
        this.guardarConfiguracion = this.guardarConfiguracion.bind(this);
        
        this.onTextChange = onTextChange.bind(this);
        this.showOptions  = showOptions.bind(this);
        this.selectOption = this.selectOption.bind(this);
    }

    selectOption(e) {
        let value = e.target.getAttribute('keyvalue'),
            name = e.target.getAttribute('select'),
            select = this.state.select,
            trigger = select[name];
        trigger.selected = (value !== select[name].selected) ? value : null;
        if(name==='apertura_dia'){
            let horario = this.state.atencion[value];
            select['apertura_hora'].selected = horario.apertura_hora;
            select['apertura_minuto'].selected = horario.apertura_minuto;
            select['cierre_hora'].selected = horario.cierre_hora;
            select['cierre_minuto'].selected = horario.cierre_minuto;
        }
        select[name] = trigger;
        this.setState({ select });
    }

    guardarConfiguracion(e){
        e.preventDefault();
        console.log('guardado');
    }   

    render() {
        return (
            <div className={this.props.panel ? "full-width" : "hidden"}>
                <Titulo
                    title="Configuración"
                    navigation={this.props.currentSub ? [this.formNavigation[0]] : []}/>
                <div className={this.props.currentSub ? "hidden" : "full-width container box-padding"}>
                    <ButtonList
                        displayList="flex-column nav-list align-center full-width"
                        container="box-padding full-width highlight-hover"
                        elemClass="box-padding full-width text-left box-transparent"
                        clickHandler={this.props.selectInnerElement}
                        elems={this.props.subElements} />
                </div>
                <div className={this.props.currentSub?"full-width container":"hidden"}>
                    <Encargado 
                        formActions={this.formActions}
                        onTextChange={this.onTextChange}
                        text={this.state.text}
                        show={this.props.currentSub ? this.props.currentSub === "0" : true}/>
                    <Ubicacion
                        formActions={this.formActions}
                        onTextChange={this.onTextChange}
                        text={this.state.text}
                        select={this.state.select}
                        selectOption={this.selectOption}
                        showOptions={this.showOptions}
                        show={this.props.currentSub ? this.props.currentSub === "1" : true} />
                    <AperturaCierre
                        formActions={this.formActions}
                        onTextChange={this.onTextChange}
                        text={this.state.text}
                        selectOption={this.selectOption}
                        showOptions={this.showOptions}
                        select={this.state.select}
                        show={this.props.currentSub ? this.props.currentSub === "2" : true} />
                    <Contacto
                        formActions={this.formActions}
                        onTextChange={this.onTextChange}
                        text={this.state.text}
                        show={this.props.currentSub ? this.props.currentSub === "3" : true} />
                    <Usuario
                        formActions={this.formActions}
                        onTextChange={this.onTextChange}
                        text={this.state.text}
                        show={this.props.currentSub ? this.props.currentSub === "4" : true} />
                    <div className="row box-padding justify-content-end">
                        <ButtonList
                            displayList="flex-row nav-list no-padding inline-block  align-center"
                            container="side-margin inline-block"
                            elems={this.formActions} />
                    </div>
                </div>
            </div>
        );
    }
}
