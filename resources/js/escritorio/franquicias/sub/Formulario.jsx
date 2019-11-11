/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * basic component
 */
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';
/**
 * API
 */
import { GET } from '../../../utils/api';
/**
 * Formulario
 */
import { FormularioEstablecimiento } from '../../configuracion/FormularioEstablecimiento';
import { FormularioUsuario } from '../../configuracion/FormularioUsuario';

export const editFormHandler = (endpoint) => {
    return function () {
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

export const addFormHandler = () => {
    return function () {
        this.setState({data:{},loadFinished:true})
    }
}

export class Formulario extends Component {
    constructor(props) {
        super(props);
        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);

        if (this.props.editar)
            this.props.nav.buttons[0].click = this.props.toggleModal;

        this.actions = this.props.formActions.buttons;
        this.actions.cancelar.click = this.cancelarFormulario;
        this.actions.guardar.click = this.enviarFormulario;
    }

    enviarFormulario(e){
        console.log('guardar');
        e.preventDefault();
    }

    cancelarFormulario(e){
        console.log('cancelar');
        e.preventDefault();
    }

    componentDidMount() {
    }

    render() {
        const data = this.props.data;
        return (
            <form className="full-width">
                < Titulo
                    title={
                        this.props.editar
                        ? data.nombre
                        : "Agregar franquicia"
                    }
                    links={this.props.nav.links}
                    buttons={this.props.nav.buttons} />
                <div className="container">
                    <FormularioEstablecimiento data={data} isFranquicia />
                    <FormularioUsuario data={data} />
                    <div className="row justify-content-end v-padding">
                        <Actions buttons={Object.values(this.actions)}/>
                    </div>
                </div>
            </form>
        )
    }
}
