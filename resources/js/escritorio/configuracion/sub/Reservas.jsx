/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FormularioReservas} from '../FormularioReservas';
/**
 * API
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';

export const reservaHandler = (endpoint) => {
    return function (){
        this.setState({
            data: null,
            isLoading: true,
            loadFinished: false
        });

        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.data });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}

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
