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

export const listHandler = (endpoint) => {
    return function (params){
        const date = params.date||new Date(),
            request = GET({
                endpoint: endpoint + (date.getMonth() + 1) + '/' + date.getFullYear(),
                download: this.downloadHandler
            });
        request
            .then(
                response => {
                    this.setState({
                        data:{
                            date:date,
                            data: response.data.feriados.data||{},
                            intervalo: response.data.intervalo,
                            show: params.show||"2"
                        },
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
}

export class Feriados extends Component {
    constructor(props){
        super(props);
        this.state= {
            show:"2",
            controls : NO_DAY_CONTROL
        };
    }

    componentDidMount() {
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
        const data = this.props.data;
        return (
            <>
                <Titulo
                    title="Feriados"
                    links={this.props.nav.links} />
                <div className="container">
                    <Agenda
                        show={data.show}
                        date={data.date}
                        type="feriados"
                        actions={{eliminar:this.toggleModal}}
                        controls={this.state.controls}
                        fetchNewMonth={this.props.fetch}
                        data={data.data}/>
                </div>
            </>
        );
    }
}
