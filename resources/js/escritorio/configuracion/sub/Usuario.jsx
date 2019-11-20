/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import Titulo from '../../../componentes/basic/Titulo';
/**
 * API
 */
import { FormularioUsuario } from '../FormularioUsuario';
import Actions from '../../../componentes/basic/Actions';


export class Usuario extends Component {
    constructor(props) {
        super(props);
        this.actions = this.props.formActions.buttons;
        this.actions.cancelar.click = this.cancelarFormulario;
        this.actions.guardar.click = this.enviarFormulario;
    }

    enviarFormulario(e){
        e.preventDefault();
        console.log('guardar');
    }

    cancelarFormulario(e){
        e.preventDefault();
        console.log('cancelar');
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                < Titulo
                    title="Configurar Usuario"
                    links={this.props.nav.links} />
                <div className="container">
                    <FormularioUsuario data={this.props.data} />
                    <div className="row v-padding justify-content-end">
                        <Actions buttons={Object.values(this.actions)}/>
                    </div>
                </div>
            </>
        );
    }
}
