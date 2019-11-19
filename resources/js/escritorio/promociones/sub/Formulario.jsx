import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import {Redirect} from 'react-router-dom';
/**
 * elements
 */
import  Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';
/**
 * handlers and elements
 */
import { FormFields } from '../FormFields';
/**
 * api
 */
import { GET } from '../../../utils/api';

export class Formulario extends Component {
    constructor(props) {
        super(props);
        if (this.props.editar)
            this.props.nav.buttons[0].click = this.toggleModal;
        this.props.formActions.buttons.cancelar.click = this.cancelarFormulario;
        this.props.formActions.buttons.guardar.click = this.enviarFormulario;
    }

    enviarFormulario(e){
        e.preventDefault();
        console.log('guardar');
    }

    cancelarFormulario(e){
        e.preventDefault();
        console.log('cancelar');
    }

    render() {
        return (
            <>
                <Titulo
                title={this.props.editar
                    ? this.props.data.selected.nombre
                    : "Agregar Promoción"}
                    links={this.props.nav.links}
                    buttons={this.props.nav.buttons}/>
                <form className="full-width box-padding">
                    <FormFields editar={this.props.editar} {...this.props.data} />
                    <div className="container">
                        <div className="row justify-content-end v-padding">
                            <Actions buttons={Object.values(this.props.formActions)}/>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}
