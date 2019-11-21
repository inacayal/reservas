/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import Agenda from '../../../componentes/agenda/Agenda';
import Titulo from '../../../componentes/basic/Titulo';
/**
 * constants
 */
import {NO_DAY_CONTROL} from '../../../constantes/CalendarControls';
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';

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
                        endpoint="horarios/feriados"
                        data={data.data}/>
                </div>
            </>
        );
    }
}
