/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import Calendar from '../../../componentes/agenda/Agenda';
import ButtonList from '../../../componentes/basic/ButtonList';
import {CardList} from '../../../componentes/basic/CardList';
import Titulo from '../../../componentes/basic/Titulo';
import LoadBar from '../../../componentes/control/LoadBar';
/**
 * api
 */
import { GET } from '../../../utils/api';
/**
 * function
 */
import generateWeek from '../../../componentes/agenda/procedimientos/generateWeek';
import { closeModal, ConfirmarModal } from '../../../componentes/modal/Modal';
/**
 * constants
 */
import { NO_DAY_CONTROL } from '../../../constantes/CalendarControls';
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';

export default class Horarios extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            data:{},
            loading: 0,
            loadFinished: false
        };

        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
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
            data:null,
            isLoading:true,
            loadFinished:false
        });
        const request = GET({
            endpoint: '/horarios/list/27',
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.horarios.data });
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

    componentWillUnmount() {
        console.log('horariosUnmount');
    }

    eliminarHorario(e) {
        e.preventDefault();
        this.setState({
            open: true
        })
    }
    render(){
        if ( this.state.data && this.state.loadFinished ){
            const week = generateWeek(
                    null,
                    this.state.data,
                    {eliminar: this.toggleModal},
                    'horarios'
                );
            return (
                <>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Eliminar Horario"
                        content="¿estás seguro de eliminar este horario?" />
                    <Titulo
                        title="Horarios"/>
                    <ul className="justify no-padding full-width flex-column nav-list h-center">
                        {
                            week.map(
                                (elem, index) =>
                                    <li key={index} className={elem.class}><elem.content /></li>
                            )
                        }
                    </ul>
                </>
            );
        }
        return(
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
