/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Calendario} from '../Calendario';
import { SelectFields } from '../SelectFields';
import { EventoFields } from '../EventoFields';
/**
 * elements
 */
import ButtonList from '../../../componentes/basic/ButtonList';
import Titulo from '../../../componentes/basic/Titulo';
import { Toggle } from '../../../componentes/input/Toggle';
import LoadBar from '../../../componentes/control/LoadBar';
import {ConfirmarModal} from '../../../componentes/modal/Modal';
import Actions from '../../../componentes/basic/Actions';
/**
 * constants
 */
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';
import {generateHoursFromInterval} from '../../../utils/Helper';
/**
 * api
 */
import { GET } from '../../../utils/api';

export default class FeriadoFormulario extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            right: true,
            isLoading: true,
            loadFinished: false,
            side:true
        }
        this.downloadHandler = this.downloadHandler.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.changeToggleSide = this.changeToggleSide.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);

        if (this.props.editar)
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

    fetchData(date) {

        this.setState({
            data: null,
            isLoading: true,
            loadFinished: false
        });

        const conf = this.props.editar
        ?
            {
                endpoint: '/feriados/single/27/' + this.props.match.params.id,
                download: this.downloadHandler
            }
        :
            {
                endpoint: '/feriados/add/27/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
                download: this.downloadHandler
            },
        request = GET(conf);

        request
            .then(
                response => {
                    const state = this.props.editar
                        ?
                            {
                                date: new Date(response.data.feriados[0].fecha),
                                data: {
                                    feriados: response.data.feriados[0],
                                    eventos: response.data.eventos
                                },
                                minutes: generateHoursFromInterval(response.data.intervalo),
                                side: response.data.feriados[0].estado === 'laboral'
                            }
                        :
                            {
                                date: date,
                                data: {
                                    feriados: response.data.feriados.list,
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
        this.fetchData(this.state.date);
    }

    changeToggleSide(e){
        this.setState({side:e})
    }

    render(){
        if (this.state.data && this.state.loadFinished){
            return (
                <>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Eliminar Feriado"
                        content="¿estás seguro de eliminar este feriado?" />
                    <Titulo
                        title={
                            this.props.editar
                                ? this.state.data.nombre
                                : "Agregar Feriado"
                        }
                        links={this.props.nav.links}
                        buttons={this.props.nav.buttons} />
                    <div className="bold">
                        {
                            this.props.editar
                            ? MONTHS[this.state.date.getMonth() + 1] + " de " + this.state.date.getFullYear()
                            : ""
                        }
                    </div>
                    <form className="full-width">
                        <div className="container">
                            <div className="row v-padding">
                                <div className="col-md-6">
                                    <Calendario
                                        editar={this.props.editar}
                                        date={this.state.date}
                                        data={this.state.data}
                                        fetch={this.fetchData}/>
                                    <span className="bold smaller-text text-center">* Los días inhabilitados ya tienen feriados asignados</span>
                                </div>
                                <div className="col-lg-6">
                                    <div className="container">
                                        <div className="row sub-title">
                                            {this.props.title}
                                        </div>
                                        <div className="row justify-content-end">
                                            <Toggle
                                                rightTitle="Laboral"
                                                leftTitle="No laboral"
                                                name="estado"
                                                side={this.state.side}
                                                changeSide = {this.changeToggleSide}/>
                                        </div>
                                        <div className="row relative visible">
                                            <div className={this.state.side ? "hidden" : "top-padding full-width overlay"} />
                                            <SelectFields
                                                editar ={this.props.editar}
                                                data={this.state.data.feriados}
                                                minutos = {this.state.minutes}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row v-padding">
                                <EventoFields
                                    side={this.state.side}
                                    editar = {this.props.editar}
                                    eventos={this.state.data.eventos}
                                    class={{ type: "feriado", col: "col-md-4" }}
                                    data={this.state.data.feriados} />
                            </div>
                            <div className="row justify-content-end">
                                <Actions buttons={Object.values(this.props.formActions.buttons)}/>
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
