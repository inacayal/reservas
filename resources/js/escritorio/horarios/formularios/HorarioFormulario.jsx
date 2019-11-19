/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Calendario } from '../Calendario';
import Titulo from '../../../componentes/basic/Titulo';
/**
 * elements
 */
import { SelectFields } from '../SelectFields';
import { EventoFields } from '../EventoFields';
import { Toggle } from '../../../componentes/input/Toggle';
import Actions from '../../../componentes/basic/Actions';
/**
 * constants
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';

export class HorarioFormulario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            side:this.props.data ? this.props.data.side : true
        };
        this.changeToggleSide = this.changeToggleSide.bind(this);

        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);

        if(this.props.editar)
            this.props.nav.buttons[0].click = this.props.toggleModal;
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

    changeToggleSide(e) {
        this.setState({ side: e })
    }

    render() {
        const data = this.props.data;
        return (
            <>
                <Titulo
                    title={
                        this.props.editar
                            ? "Editar horario del " + DAYS[parseInt(data.horarios.diaSemana) - 1]
                            : "Agregar horario al " + DAYS[parseInt(this.props.match.params.day) - 1]
                    }
                    links={this.props.nav.links}
                    buttons={this.props.nav.buttons} />
                <form className="full-width top-padding">
                    <div className="container">
                        <div className="row v-padding">
                            <div className="col-lg-6 relative visible">
                                <div className={this.state.side ? "hidden" : "top-padding full-width overlay"} />
                                <SelectFields
                                    editar = {this.props.editar}
                                    data={data.horarios}
                                    minutos={data.minutes} />
                            </div>
                            <div className="col-lg-6">
                                <div className="container">
                                    <div className="row justify-content-end">
                                        <Toggle
                                            rightTitle="Laboral"
                                            leftTitle="No laboral"
                                            name="estado"
                                            side={this.state.side}
                                            changeSide={this.changeToggleSide} />
                                    </div>
                                    <div className="row">
                                        <EventoFields
                                            side={this.state.side}
                                            editar={this.props.editar}
                                            eventos={data.eventos}
                                            class={{type:"horario",col:"col-md-12"}}
                                            data={data.horarios} />
                                    </div>
                                    <div className="row">
                                        <Actions
                                            buttons={Object.values(this.props.formActions.buttons)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}
