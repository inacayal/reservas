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
import Contacto from './subElements/Contacto';
import Encargado from './subElements/Encargado';
import Ubicacion from './subElements/Ubicacion';
import Usuario from './subElements/Usuario';
import Reservas from './subElements/Reservas';
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
                intervalo: {
                    name: "intervalo",
                    show: false,
                    selected: null,
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
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        10: "10 minutos",
                        20: "20 minutos",
                        30: "30 minutos",
                        40: "40 minutos",
                        50: "50 minutos"
                    }
                },
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
                    <Contacto
                        formActions={this.formActions}
                        onTextChange={this.onTextChange}
                        text={this.state.text}
                        show={this.props.currentSub ? this.props.currentSub === "2" : true} />
                    <Usuario
                        formActions={this.formActions}
                        onTextChange={this.onTextChange}
                        text={this.state.text}
                        show={this.props.currentSub ? this.props.currentSub === "3" : true} />
                    <Reservas
                        formActions={this.formActions}
                        showOptions={this.showOptions}
                        selectOption={this.selectOption}
                        caida={this.state.select.caida}
                        intervalo={this.state.select.intervalo}
                        show = {this.props.currentSub ? this.props.currentSub === "4" : true} />
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
