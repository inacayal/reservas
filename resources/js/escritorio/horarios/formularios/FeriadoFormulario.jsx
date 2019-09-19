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
import { Toggle } from '../../../componentes/input/Toggle';
import LoadBar from '../../../componentes/control/LoadBar';
/**
 * constants
 */
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';
import generateHoursFromInterval from '../../../funciones/generateHoursFromInterval';
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
        const request = GET({
            endpoint: '/feriados/agregar/27/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ 
                        date: date, 
                        data: response.data || {},
                        minutes: generateHoursFromInterval(response.data.intervalo.data.id)
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
        this.fetchData(this.state.date);
    }

    changeToggleSide(e){
        console.log("e");
        this.setState({side:e})
    }

    render(){
        if (this.state.data && this.state.loadFinished)
            return (
                <>
                    <div className="c-title highlight-title" style={{paddingBottom:"10px"}}>Agregar Feriado</div>
                    <form className="full-width">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <Calendario
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
                                                minutos = {this.state.minutes}/> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row v-padding">
                                <EventoFields
                                    data={this.state.data.eventos.data} />
                            </div>
                        </div>
                    </form>
                </>
            );
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}