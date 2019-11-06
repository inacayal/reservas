/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import EventoFrame from '../../../reserva/pasos/evento/EventoFrame';
import { GET } from '../../../utils/api';
import Titulo from '../../../componentes/basic/Titulo';
import LoadBar from '../../../componentes/control/LoadBar';
import Actions from '../../../componentes/basic/Actions';

export default class Formulario extends Component{
    constructor(props){
        super(props);
        this.state = {
            date:new Date(),
            loading:0,
            loadFinished:false
        };

        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);

        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);
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
            data:null,
            isLoading:true,
            loadFinished:false
        });

        const request = GET({
            endpoint: 'reservas/add/' + 27 + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear(),
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    const data = response.data;
                    this.setState({
                        data,
                        date,
                        isLoading:false,
                        loadFinished:true
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

    componentWillUnmount() {
        console.log('formularioReservasUnmount');
    }

    render(){
        if (this.state.data && this.state.loadFinished){
            return (
                <>
                    <Titulo
                        title='Agregar Reservación'
                        links={this.props.nav.links} />
                    <form className="full-width">
                        <div className="container">
                            <div className="row">
                                <EventoFrame
                                    displayTitles={false}
                                    current={true}
                                    fecha={this.state.date}
                                    fetch = {this.fetchData}
                                    data={this.state.data}
                                    formActions={this.props.formActions}/>
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
