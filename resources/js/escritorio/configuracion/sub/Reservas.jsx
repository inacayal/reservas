/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FormularioReservas} from '../FormularioReservas';
/**
 * API
 */
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';


export class Reservas extends Component {
    constructor(props){
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

    componentWillUnmount() {
        console.log('configuracionReservasUnmount');
    }

    render(){
        return (
            <>
                < Titulo
                    title="Configurar Reservas"
                    links={this.props.nav.links} />
                <div className="container">
                    <FormularioReservas data ={this.props.data} />
                    <div className="row v-pading justify-content-end">
                        <Actions buttons={Object.values(this.actions)}/>
                    </div>
                </div>
            </>
        );
    }
}
