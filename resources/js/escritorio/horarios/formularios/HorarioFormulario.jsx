/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Calendario } from '../Calendario';
import Titulo from '../../../componentes/basic/Titulo';
/**
 * elements
 */
import { SelectFields } from '../SelectFields';
import { EventoFields } from '../EventoFields';
import ButtonList from '../../../componentes/basic/ButtonList';
import { Toggle } from '../../../componentes/input/Toggle';
import LoadBar from '../../../componentes/control/LoadBar';
import {ConfirmarModal} from '../../../componentes/modal/Modal';
import Actions from '../../../componentes/basic/Actions';
/**
 * constants
 */
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';
import {generateHoursFromInterval} from '../../../utils/Helper';
/**
 * api
 */
import { GET } from '../../../utils/api';
export default class FeriadoFormulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            right: true,
            isLoading: true,
            loadFinished: false,
            side: true
        }
        this.downloadHandler = this.downloadHandler.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.changeToggleSide = this.changeToggleSide.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);

        if(this.props.editar)
            this.props.nav.buttons[0].click = this.toggleModal;

        this.props.formActions.buttons.guardar.click = this.enviarFormulario;
        this.props.formActions.buttons.cancelar.click = this.cancelarFormulario;
    }

    toggleModal(e) {
        e.preventDefault();
        this.setState({
            open: !this.state.open
        });
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
                endpoint: '/horarios/single/27/' + this.props.match.params.id,
                download: this.downloadHandler
            }
            :
            {
                endpoint: '/horarios/add/27',
                download: this.downloadHandler
            },
            request = GET(conf);
        request
            .then(
                response => {
                    const state = this.props.editar
                        ?
                        {
                            data: {
                                horarios:response.data.horarios[0],
                                eventos:response.data.eventos
                            },
                            minutes: generateHoursFromInterval(response.data.intervalo),
                            side: response.data.horarios[0].estado === 'laboral'
                        }
                        :
                        {
                            data: {
                                horarios: null,
                                eventos: response.data.eventos
                            },
                            minutes: generateHoursFromInterval(response.data.intervalo)
                        };
                    this.setState(state);
                }
            )
            .catch(
                error => {
                    console.log(error.message);
                }
            );
    }

    componentDidMount() {
        this.fetchData();
    }

    changeToggleSide(e) {
        this.setState({ side: e })
    }

    render() {
        if (this.state.data && this.state.loadFinished){
            return (
                <>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Eliminar Horario"
                        content="¿estás seguro de eliminar este horario?" />
                    <div className="c-title highlight-title" style={{ paddingBottom: "10px" }}>
                        <Titulo
                            title={
                                this.props.editar
                                    ? "Editar horario del " + DAYS[parseInt(this.state.data.horarios.diaSemana) - 1]
                                    : "Agregar horario al " + DAYS[parseInt(this.props.match.params.day) - 1]
                            }
                            links={this.props.nav.links}
                            buttons={this.props.nav.buttons} />
                    </div>
                    <form className="full-width">
                        <div className="container">
                            <div className="row v-padding">
                                <div className="col-lg-6 relative visible">
                                    <div className={this.state.side ? "hidden" : "top-padding full-width overlay"} />
                                    <SelectFields
                                        editar = {this.props.editar}
                                        data={this.state.data.horarios}
                                        minutos={this.state.minutes} />
                                </div>
                                <div className="col-lg-6">
                                    <div className="container">
                                        <div className="row justify-content-end">
                                            <Toggle
                                                rightTitle="Laboral"
                                                leftTitle="No laboral"
                                                name="estado"
                                                side={this.state.side}
                                                changeSide={this.changeToggleSide} />
                                        </div>
                                        <div className="row">
                                            <EventoFields
                                                side={this.state.side}
                                                editar={this.props.editar}
                                                eventos={this.state.data.eventos}
                                                class={{type:"horario",col:"col-md-12"}}
                                                data={this.state.data.horarios} />
                                        </div>
                                        <div className="row">
                                            <Actions
                                                buttons={Object.values(this.props.formActions.buttons)}/>
                                        </div>
                                    </div>
                                </div>
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
