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
import {ConfirmarModal} from '../../../componentes/modal/Modal';
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

        this.verFeriado = this.verFeriado.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
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
                    this.setState({
                        date:date,
                        data: response.data.feriados.data||{},
                        intervalo:response.data.intervalo
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

    verFeriado(e) {
        e.preventDefault();
        let dateString = parseInt(e.currentTarget.getAttribute('data'));
        this.setState({show:"2",date:new Date(dateString)});
    }

    componentWillUnmount() {
        console.log('feriadosUnmount');
    }

    render(){
        if (this.state.data && this.state.loadFinished){
            return (
                <>
                    <Titulo
                        title="Feriados"
                        links={this.props.nav.links} />
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Eliminar Feriado"
                        content="¿estás seguro de eliminar este feriado?" />
                    <div className="container">
                        <Agenda
                            show={this.state.show}
                            date={this.state.date}
                            type="feriados"
                            actions={{eliminar:this.toggleModal}}
                            controls={this.state.controls}
                            fetchNewMonth={this.fetchData}
                            data={this.state.data}/>
                    </div>
                </>
            );
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
