/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Calendario} from '../Calendario';
import { SelectFields } from '../SelectFields';
import { EventoFields } from '../EventoFields';
/**
 * elements
 */
import Titulo from '../../../componentes/basic/Titulo';
import { Toggle } from '../../../componentes/input/Toggle';
import Actions from '../../../componentes/basic/Actions';
/**
 * constants
 */
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';
import {generateHoursFromInterval} from '../../../utils/Helper';

export class FeriadoFormulario extends Component {
    constructor(props){
        super(props);
        this.state = {
            right: true,
            side:true
        }
        this.changeToggleSide = this.changeToggleSide.bind(this);

        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);

        if (this.props.editar)
            this.props.nav.buttons[0].click = this.toggleModal;

        this.props.formActions.buttons.guardar.click = this.enviarFormulario;
        this.props.formActions.buttons.cancelar.click = this.cancelarFormulario;
    }

    enviarFormulario(e){
        e.preventDefault();
        console.log('guardar');
    }

    cancelarFormulario(e){
        e.preventDefault();
        console.log('guardar');
    }

    componentDidMount() {

    }

    changeToggleSide(e){
        this.setState({side:e})
    }

    render(){
        const data = this.props.data;
        return (
            <>
                <Titulo
                    title={
                        this.props.editar
                            ? data.feriados.nombre
                            : "Agregar Feriado"
                    }
                    links={this.props.nav.links}
                    buttons={this.props.nav.buttons} />
                <div className="bold">
                    {
                        this.props.editar
                        ? MONTHS[data.date.getMonth()] + " de " + data.date.getFullYear()
                        : ""
                    }
                </div>
                <form className="full-width">
                    <div className="container">
                        <div className="row v-padding">
                            <div className="col-md-6">
                                <Calendario
                                    editar={this.props.editar}
                                    date={data.date}
                                    data={data}
                                    fetch={this.props.fetch}/>
                                <span className="bold smaller-text text-center">* Los días inhabilitados ya tienen feriados asignados</span>
                            </div>
                            <div className="col-lg-6">
                                <div className="container">
                                    <div className="row sub-title">
                                        {data.title}
                                    </div>
                                    <div className="row justify-content-end">
                                        <Toggle
                                            rightTitle="Laboral"
                                            leftTitle="No laboral"
                                            name="estado"
                                            side={this.state.side}
                                            changeSide = {this.changeToggleSide}/>
                                    </div>
                                    <div className="row relative visible">
                                        <div className={this.state.side ? "hidden" : "top-padding full-width overlay"} />
                                        <SelectFields
                                            editar ={this.props.editar}
                                            data={data.feriados}
                                            minutos = {data.minutes}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row v-padding">
                            <EventoFields
                                side={this.state.side}
                                editar = {this.props.editar}
                                eventos={this.props.data.eventos}
                                class={{ type: "feriado", col: "col-md-4" }}
                                data={this.props.data.feriados} />
                        </div>
                        <div className="row justify-content-end">
                            <Actions buttons={Object.values(this.props.formActions.buttons)}/>
                        </div>
                    </div>
                </form>
            </>
        );

    }
}
