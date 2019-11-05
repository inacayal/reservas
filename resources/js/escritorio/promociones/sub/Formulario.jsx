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
import LoadBar from '../../../utils/LoadBar';
import { GET } from '../../../utils/api';
import Actions from '../../../componentes/basic/Actions';
import { ConfirmarModal } from '../../../componentes/modal/Modal';

export default class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: null,
            loadFinished: false
        }
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
        e.preventDefault();
        console.log('guardar');
    }

    cancelarFormulario(e){
        e.preventDefault();
        console.log('cancelar');
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
        this.setState({
            data: null,
            isLoading: true,
            loadFinished: false
        });
        const conf = this.props.editar
            ?
            {
                endpoint: 'promociones/single/27/' + this.props.match.params.id,
                download: this.downloadHandler
            }
            :
            {
                endpoint: 'promociones/add/27',
                download: this.downloadHandler
            };
        const request = GET(conf);

        request
            .then(
                response => {
                    let data = {};
                    if (this.props.editar) {
                        data = {
                            selected: response.data.promociones[0],
                            all: {
                                eventos: response.data.eventos
                            }
                        };
                    } else {
                        data = response.data;
                    }
                    this.setState({
                        data: { ...data }
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
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
                        title="Eliminar Promocion"
                        content="¿estás seguro de eliminar esta promo?" />
                    <form className="full-width box-padding">
                        <Titulo
                            title={this.props.editar
                                ? this.state.data.selected.nombre
                                : "Agregar Promoción"}
                            links={this.props.nav.links}
                            buttons={this.props.nav.buttons}/>
                        <FormFields editar={this.props.editar} {...this.state.data} />
                        <div className="container">
                            <div className="row justify-content-end v-padding">
                                <Actions buttons={Object.values(this.actions)}/>
                            </div>
                        </div>
                    </form>
                </>
            );
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
