import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
/**
 * elements
 */
import  Titulo from '../../../componentes/basic/Titulo';
/**
 * handlers and elements
 */
import { FormFields } from '../FormFields';
/**
 * api
 */
import { GET } from '../../../utils/api';

export const editFormHandler = (endpoint) => {
    return function () {
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
                this.setState({
                    data: {
                        selected: response.data.promociones[0],
                        all: {
                            eventos: response.data.eventos
                        }
                    }
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
    return function () {
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
                this.setState({
                    data: { ...response.data }
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

    render() {
        return (
            <form className="full-width box-padding">
                <Titulo
                    title={this.props.editar
                        ? this.props.data.selected.nombre
                        : "Agregar Promoción"}
                    links={this.props.nav.links}
                    buttons={this.props.nav.buttons}/>
                <FormFields editar={this.props.editar} {...this.props.data} />
                <div className="container">
                    <div className="row justify-content-end v-padding">
                        <Actions buttons={Object.values(this.actions)}/>
                    </div>
                </div>
            </form>
        );
    }
}
