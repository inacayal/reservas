/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * API
 */
import { GET } from '../../../utils/api';
/**
 * formularios
 */
import { FormularioEstablecimiento } from '../../configuracion/FormularioEstablecimiento';
import { FormularioUsuario } from '../../configuracion/FormularioUsuario';
import { FormularioFranquicia } from '../FormularioFranquicia';
/**
 * components
 */
import Actions from '../../../componentes/basic/Actions';
import Titulo from '../../../componentes/basic/Titulo';
import { Navegacion } from '../../../acciones/ActionsByView';

export const editFormHandler = (endpoint) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    const data = response.data.data
                    this.setState({data});
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}

export const addFormHandler = (endpoint) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.props.downloadHandler
        });
        request
            .then(
                response => {
                    const data = response.data.usuarios.list;
                    this.setState({ data,loadFinished:true });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}


export class Formulario extends Component{
    constructor(props){
        super(props);

        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);

        if (this.props.editar)
            this.props.nav.buttons[0].click = this.props.toggleModal;

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

    componentDidMount(){
    }

    render(){
        const data = this.props.data;
        return (
            <form className="full-width">
                < Titulo
                    title={
                        this.props.editar
                            ?
                                data.nombre
                            : "Agregar Local"
                    }
                    links={this.props.nav.links}
                    buttons ={this.props.nav.buttons} />
                <div className="container">
                    <FormularioFranquicia data={data} agregarLocal={!this.props.editar}/>
                    <div className="row sub-title bold top-padding">
                        Información
                    </div>
                    <FormularioEstablecimiento data={data}/>
                    <FormularioUsuario data={data}/>
                    <div className="row justify-content-end v-padding">
                        <Actions
                            buttons={Object.values(this.props.formActions.buttons)}/>
                    </div>
                </div>
            </form>
        );
    }
}
