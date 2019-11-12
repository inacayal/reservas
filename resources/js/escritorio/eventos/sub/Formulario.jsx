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
import {GET} from '../../../utils/api';

export const editFormHandler = (endpoint) => {
    return function (params) {
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
                    let data = {};
                    data = {
                        selected: response.data.eventos[0],
                        all: {
                            feriados: response.data.feriados,
                            horarios: response.data.horarios,
                            promociones: response.data.promociones
                        }
                    };
                    data.selected.horarios.list = assignHorarios(data.selected.horarios.list)[0];
                    data.all.horarios.list = assignHorarios(data.all.horarios.list)[0];
                    this.setState({
                        data: {...data}
                    });
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
                        let data = {};
                        data = response.data;
                        data.horarios.list = assignHorarios(data.horarios.list)[0];
                        this.setState({
                            data: {...data}
                        });
                    }
                )
                .catch(
                    error => {
                        console.log(error.message)
                    }
                );
    }
}

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
