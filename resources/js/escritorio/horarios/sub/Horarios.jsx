/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import Calendar from '../../../componentes/agenda/Agenda';
import {CardList} from '../../../componentes/basic/CardList';
import Titulo from '../../../componentes/basic/Titulo';
/**
 * api
 */
import { GET } from '../../../utils/api';
/**
 * function
 */
import generateWeek from '../../../componentes/agenda/procedimientos/generateWeek';
/**
 * constants
 */
import { NO_DAY_CONTROL } from '../../../constantes/CalendarControls';
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';

export const listHandler = (endpoint) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({
                        data: response.data.horarios.data,
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

export class Horarios extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        console.log('horariosUnmount');
    }

    render(){
        const week = generateWeek(
                null,
                this.props.data,
                {eliminar: this.props.toggleModal},
                'horarios'
            );
        return (
            <>
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
}
