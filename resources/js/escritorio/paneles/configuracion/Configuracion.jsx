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
import generateConfigurationCards from './procedimientos/generateConfigurationCards';
import generateHoursFromInterval from '../../../funciones/generateHoursFromInterval';
import { formActions, formNavigation, panelNavigation, generateConfigurationActions } from '../../../funciones/dataActions';
/**
 * constantes
 */
import {DAYS,MONTHS,HOURS} from '../../../constantes/DaysMonths';

const COMPONENTES = [
    (parent) => (
        <Encargado
            formActions={parent.formActions}
            onTextChange={parent.onTextChange}
            text={parent.state.text}
            show={parent.props.currentSub ? parent.props.currentSub === "0" : true} />
    ),
    (parent) => (
        <Ubicacion
            formActions={parent.formActions}
            show={parent.props.currentSub ? parent.props.currentSub === "1" : true} />
    ),
    (parent) => (
        <Contacto
            formActions={parent.formActions}
            onTextChange={parent.onTextChange}
            text={parent.state.text}
            show={parent.props.currentSub ? parent.props.currentSub === "2" : true} />
    ),
    (parent)=> (
        <Usuario
            formActions={parent.formActions}
            onTextChange={parent.onTextChange}
            text={parent.state.text}
            show={parent.props.currentSub ? parent.props.currentSub === "3" : true} />
    ),
    (parent) => (
        <Reservas
            formActions={parent.formActions}
            show={parent.props.currentSub ? parent.props.currentSub === "4" : true} />
    )
];
export default class Configuracion extends Component {
    constructor(props) {
        super(props);
        this.validMinutes = generateHoursFromInterval(1);
        this.state = {
            text:{
                email_local:"data1",
                adm_email:"data2",
                adm_nombre:"data3",
                adm_telefono:"data4",
                password_local:"data6",
                correo_local:"data7",
                telefono_local:"data8",
                razon_social:"data9",
                cuit_cuil:"data10",
                id_provincia:"data11",
                intervalo:"data12",
                caida:"data13",
                provincia:"provincia",
                direccion_local:"direccion de local",
                show:null
            }
        };
        
        this.configurationCards = generateConfigurationActions(this.props.selectInnerElement);
        this.formActions = formActions(this.props.changePanel,this.guardarConfiguracion,"6");
        this.formNavigation = formNavigation(this.props.changePanel,null,"6");
        this.guardarConfiguracion = this.guardarConfiguracion.bind(this);
        this.expandirElemento = this.expandirElemento.bind(this);
        this.onTextChange = onTextChange.bind(this);
        this.componentes = COMPONENTES;
        
    }

    expandirElemento (e){
        let show = e.currentTarget.getAttribute('data');
        this.setState({ show: this.state.show !== show ? show : null});
    }

    guardarConfiguracion(e){
        e.preventDefault();
        console.log('guardado');
    }   

    componentDidMount(){
        console.log('configuracionMount');
    }

    componentWillUnmount(){
        console.log('configuracionUnmount');
    }

    render() {
        const renderComponent = this.props.currentSub ? 
            this.componentes[this.props.currentSub](this)
            : null,
            configurationList = generateConfigurationCards(
                this.props.selectInnerElement,
                this.expandirElemento,
                this.props.subElements,
                this.state.text,
                this.state.show
            );
        return (
            <div className={this.props.panel ? "full-width" : "hidden"}>
                <Titulo
                    title="Configuración"
                    navigation={this.props.currentSub ? [this.formNavigation[0]] : []}/>
                <div className={this.props.currentSub ? "hidden" : "full-width container box-padding"}>
                    <CardList
                        displayList="no-padding flex-column nav-list align-center full-width"
                        container="full-width highlight-hover"
                        elems={configurationList} />
                </div>
                <div className={this.props.currentSub?"full-width container":"hidden"}>
                    {renderComponent}
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
