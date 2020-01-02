/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Agenda from '../../../componentes/agenda/Agenda';
import Titulo from '../../../componentes/basic/Titulo';
import {NO_DAY_CONTROL} from '../../../constantes/CalendarControls';
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';

const links = [
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-calendar-week inline-box side-margin" />
                Horarios
            </div>
        ),
        to:`/horarios`,
        params:{},
        route:`horarios`
    }
];

export default class Feriados extends Component {
    constructor(props){
        super(props);
        this.state= {
            date: this.props.data.date,
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

    componentDidUpdate(pp){
        if (this.props.location.state.date !== (pp.location.state||{}).date)
            this.setState({
                date:new Date(this.props.location.state.date),
                show:this.props.location.state.show
            })
    }

    render(){
        const   data = this.props.data,
                nav = this.props.nav.links.concat(links);
        return (
            <>
                <Titulo title="Feriados"
                        links={nav} />
                <div className="container">
                    <Agenda show={data.show}
                            date={this.state.date}
                            type="feriados"
                            actions={{eliminar:this.toggleModal}}
                            controls={this.state.controls}
                            fetchNewMonth={this.props.fetch}
                            endpoint="feriados"
                            data={data.data}/>
                </div>
            </>
        );
    }
}
