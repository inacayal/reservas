import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
/**
 * elements
 */
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';
/**
 * handlers and elements
 */
import LoadBar from '../../../utils/LoadBar';
/**
 * API
 */
import { GET } from '../../../utils/api';
import { FormFields } from '../FormFields';
import { assignHorarios } from './generateEventosCard';
import {ConfirmarModal} from '../../../componentes/modal/Modal';
/**
 * navegacion
 */
class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: null,
            loadFinished: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);

        this.props.actions.buttons.guardar.click = this.enviarFormulario;
        this.props.actions.buttons.cancelar.click = this.cancelarFormulario;
    }

    enviarFormulario(e){
        e.preventDefault();
        console.log('guardar');
    }

    cancelarFormulario(e){
        e.preventDefault();
        console.log('guardar');
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
                endpoint: 'eventos/single/27/' + this.props.match.params.id,
                download: this.downloadHandler
            }
        :
            {
                endpoint: 'eventos/add/27',
                download: this.downloadHandler
            };
        const request = GET(conf);

        request
            .then(
                response => {
                    let data = {};
                    if (this.props.editar) {
                        this.props.nav.buttons[0].click = this.toggleModal;
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
                    } else {
                        data = response.data;
                        data.horarios.list = assignHorarios(data.horarios.list)[0];
                    }
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

    componentDidMount() {
        this.fetchData();
    }

    toggleModal(e) {
        e.preventDefault();
        this.setState({
            open: !this.state.open
        });
    }
    render() {
        console.log('culo')
        if (this.state.data && this.state.loadFinished){
            const data = this.props.editar ? this.state.data.selected : this.state.data;
            return (
                <>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Eliminar Evento"
                        content="¿estás seguro de eliminar este evento?" />
                    <form className="full-width">
                        < Titulo
                        title={this.props.editar ? this.state.data.selected.nombre : "Agregar Evento"}
                        links={this.props.nav.links}
                        buttons={this.props.nav.buttons} />
                        <FormFields editar ={this.props.editar} {...this.state.data}/>
                        <div className="text-right">
                            <Actions
                                buttons={Object.values(this.props.actions.buttons)}/>
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

export default React.memo(Formulario);
