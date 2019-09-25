/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import Agenda from '../../../componentes/agenda/Agenda';
import ButtonList from '../../../componentes/basic/ButtonList';
import Titulo from '../../../componentes/basic/Titulo';
/**
 * function
 */
import {closeModal,ConfirmarModal} from '../../../componentes/modal/Modal';
/**
 * constants
 */
import {NO_DAY_CONTROL} from '../../../constantes/CalendarControls';
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';
import LoadBar from '../../../componentes/control/LoadBar';
/**
 * api
 */
import { GET } from '../../../utils/api';
export default class Feriados extends Component {
    constructor(props){
        super(props);
        this.state= {
            data: null,
            show:"2",
            date:new Date(),
            controls : NO_DAY_CONTROL
        };
        
        this.actions = {
            outer: {
                eliminar: this.eliminarFeriado
            }
        };

        this.verFeriado = this.verFeriado.bind(this);
        this.eliminarFeriado = this.eliminarFeriado.bind(this);
        this.closeModal = closeModal.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);

        this.nav = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar nuevo
                    </div>
                ),
                to: '/horarios/feriados/agregar'
            }
        ];
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
            endpoint: '/feriados/list/27/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ date:date, data: response.data.data||{}, intervalo:response.data.intervalo.id });
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

    verFeriado(e) {
        e.preventDefault();
        let dateString = parseInt(e.currentTarget.getAttribute('data'));
        this.setState({show:"2",date:new Date(dateString)});
    }
    
    eliminarFeriado(e) {
        e.preventDefault();
        this.setState({
            open: true
        });
    }

    componentWillUnmount() {
        console.log('feriadosUnmount');
    }

    render(){
        if (this.state.data && this.state.loadFinished)
            return (
                <>
                    <Titulo
                        title="Feriados"
                        links={this.nav} />
                    <div className="container">
                        <ConfirmarModal
                            open={this.state.open}
                            closeModal={this.closeModal}
                            title="Eliminar Feriado"
                            content="¿estás seguro de eliminar este feriado?" />        
                        <Agenda
                            show={this.state.show}
                            date={this.state.date} 
                            type="feriados"
                            actions={this.actions}
                            controls={this.state.controls}
                            fetchNewMonth={this.fetchData}
                            data={this.state.data}/>
                    </div>
                </>
            );
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
