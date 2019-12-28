/**
 * react basic
 */
import React, {
    Component,
    useState,
    useEffect
} from 'react';
import ReactDOM from 'react-dom';
import CalendarioEventos from './CalendarioEventos';
import CalendarioFormulario from './CalendarioFormulario';
import {
    DAYS,
    MONTHS
} from '../../../constantes/DaysMonths';
import {
    generateHourArray,
    calculateOffset,
    generateAcceptedHours,
    checkValid
} from './Handlers';
import {compareDates} from '../../../utils/Helper';

export default class EventoFrame extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.changeDate = this.changeDate.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    changeDate(e){
        this.props.change(e.currentTarget)
    }

    fetchData(date,callback){
        const data = this.props.data.data;
        new Promise (
            (resolve,reject) => {
                this.props.fetch(date)
                    .then(resolve())
            }
        )
        .then(callback)
    }

    render(){
        const   props = this.props,
                data = props.data.data,
                showDate = new Date(props.fecha),
                horario = generateAcceptedHours({
                    a: data.antelacion,
                    g: props.current,
                    i: data.intervalo.id,
                    f: showDate,
                    m: props.minDate
                });
        return (
            <div className="container">
                <CalendarioEventos  data={props.data}
                                    current = {props.current}
                                    showDate={showDate}
                                    minDate={props.minDate}
                                    fecha = {props.fecha}
                                    clickCallback={this.changeDate}
                                    fetch = {this.fetchData}
                                    change={props.change}/>
                <div className="row justify-content-end smaller-text top-padding">
                    {`Debes reservar con al menos ${props.data.antelacion} horas de antelación.'`}
                </div>
                <div className="row">
                    <CalendarioFormulario   date={showDate}
                                            currentData={this.props.current}
                                            ubicaciones={data.ubicaciones}
                                            horario={horario}
                                            fields={props.fields}
                                            change={props.change}
                                            errors={props.errors} />
                </div>
            </div>
        );
    }
}
