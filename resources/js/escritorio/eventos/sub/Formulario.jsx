import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
/**
 * elements
 */
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';
/**
 * API
 */
import { FormFields } from '../FormFields';
import { assignHorarios } from './generateEventosCard';

export class Formulario extends Component {
    constructor(props) {
        super(props);
        if (this.props.editar)
            this.props.nav.buttons[0].click = this.props.toggleModal;
        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);
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

    render() {
        const data = this.props.data;
        return (
            <form className="full-width">
                < Titulo
                    title={this.props.editar ? data.selected.nombre : "Agregar Evento"}
                    links={this.props.nav.links}
                    buttons={this.props.nav.buttons} />
                <FormFields editar ={this.props.editar} {...data}/>
                <div className="text-right">
                    <Actions
                        buttons={Object.values(this.props.formActions.buttons)}/>
                </div>
            </form>
        );
    }
}
