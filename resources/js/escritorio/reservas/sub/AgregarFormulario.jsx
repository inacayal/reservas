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

export default class AgregarFormulario extends Component{
    constructor(props){
        super(props);
        this.state = {
            date:new Date(),
            loading:0,
            loadFinished:false
        };
        
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
        
        this.nav = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-arrow-left inline-box side-margin" />
                        Volver a reservaciones
                    </div>
                ),
                to: '/reservas'
            }
        ];
    }

    guardarNuevaReserva() {
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
                        links={this.nav} />
                    <form className="text-right">
                        <div className="container">
                            <div className="row">
                                <EventoFrame
                                    displayTitles={false}
                                    current={true}
                                    fecha={this.state.date}
                                    fetch = {this.fetchData}
                                    data={this.state.data}/>
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