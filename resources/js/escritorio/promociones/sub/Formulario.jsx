import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
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

export const editFormHandler = (endpoint) => {
    return function (params) {
        this.setState({
            data: null,
            isLoading: true,
        });

        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        request
        .then(
            response => {
                this.setState({
                    data: {
                        selected: response.data.promociones[0],
                        all: {
                            eventos: response.data.eventos
                        }
                    },
                    loadFinished: true
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
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
        .then(
            response => {
                this.setState({
                    data: { ...response.data },
                    loadFinished: true
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
