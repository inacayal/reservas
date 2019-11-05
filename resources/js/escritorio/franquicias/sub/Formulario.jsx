/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input components
 */
import { onTextChange, Text } from '../../../componentes/input/Text'
import { showOptions, selectOption, Select } from '../../../componentes/input/Select'
/**
 * basic component
 */
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';
/**
 * API
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';
/**
 * Formulario
 */
import { FormularioEstablecimiento } from '../../configuracion/FormularioEstablecimiento';
import { FormularioUsuario } from '../../configuracion/FormularioUsuario';
import {ConfirmarModal} from '../../../componentes/modal/Modal';

export default class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loadFinished: false,
            loading: null,
            open:false
        };

        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);

        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);

        this.toggleModal = this.toggleModal.bind(this);

        if (this.props.editar)
            this.props.nav.buttons[0].click = this.toggleModal;

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

    toggleModal(e) {
        e.preventDefault();
        this.setState({
            open: !this.state.open
        });
    }

    downloadHandler(pEvent) {
        let
            loading = Math.round((pEvent.loaded * 100) / pEvent.total),
            state = loading !== 100 ?
                { loading, loadFinished: false }
                : { loading, loadFinished: true };
        this.setState(state);
    }

    fetchData() {
        if (this.props.editar) {
            const request = GET({
                endpoint: '/usuario/franquicia/' + this.props.match.params.id,
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
        } else {
            this.setState({
                data: {},
                loadFinished: true
            })
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (this.state.data && this.state.loadFinished) {
            return (
                <>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Desactivar Franquicia"
                        content="¿estás seguro de desactivar esta franquicia?" />
                    <form className="full-width">
                        < Titulo
                            title={
                                this.props.editar
                                ? this.state.data.nombre
                                : "Agregar franquicia"
                            }
                            links={this.props.nav.links}
                            buttons={this.props.nav.buttons} />
                        <div className="container">
                            <FormularioEstablecimiento data={this.state.data} isFranquicia />
                            <FormularioUsuario data={this.state.data} />
                            <div className="row justify-content-end v-padding">
                                <Actions
                                    buttons={Object.values(this.actions)}/>
                            </div>
                        </div>

                    </form>
                </>
            )
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
