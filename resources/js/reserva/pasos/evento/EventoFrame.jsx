/**
 * react basic
 */
import React,
{
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
    generateAcceptedHours
} from './Handlers';
import {compareDates} from '../../../utils/Helper';

function initializeComponent (props) {
    const   date = props.fecha,
            currentData = props.data.feriados.data[date.getDate()]
            ? props.data.feriados.data[date.getDate()]
            : props.data.horarios.data[date.getDay()+1];

    return {
        date:date,
        current:currentData,
        min: calculateOffset(
            props.data.antelacion,
            new Date(),
            currentData
        ),
        horario: generateAcceptedHours({
            a: props.data.antelacion,
            g: currentData,
            i: props.data.intervalo.id,
            f: date,
            m: date
        })
    }
}

export default class EventoFrame extends Component {
    constructor(props){
        super(props);
        this.state = initializeComponent(this.props);
        this.changeDate = this.changeDate.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    changeDate(d){
        return (e) => {
            const   date = new Date(d),
                    props = this.props,
                    generateData = props.data.feriados.data[date.getDate()]
                        ? props.data.feriados.data[date.getDate()]
                        : props.data.horarios.data[date.getDay() + 1];

            this.setState ({
                date:date,
                horario: generateAcceptedHours({
                    a: props.data.antelacion,
                    g: generateData,
                    i: props.data.intervalo.id,
                    f: date,
                    m: this.state.min
                }),
                current:generateData
            });
        }
    }

    fetchData(date){
        this.props.fetch('/reservas/agregar',{date:date,refresh:true},'reservas');
    }

    render(){
        const   props = this.props,
                showDate = compareDates(this.state.date,this.state.min,{d:'<',m:'=',y:'='})
                    ? this.state.min
                    : this.state.date,
                minDate = this.state.min,
                horario = this.state.horario,
                currentData = this.state.current,
                ubicaciones = props.data.ubicaciones;

        return (
            <div className="container">
                <CalendarioEventos
                    data={props.data}
                    current = {currentData}
                    showDate={showDate}
                    minDate={minDate}
                    clickCallback={this.changeDate}
                    fetch = {this.fetchData}/>
                <div className="row justify-content-end smaller-text top-padding">
                    {'Debes reservar con al menos ' + props.data.antelacion + ' horas de antelación.'}
                </div>
                <div className="row">
                    <CalendarioFormulario
                        date={showDate}
                        currentData={currentData}
                        ubicaciones={ubicaciones}
                        horario={horario}
                        fields={props.fields}
                        change={props.change}
                        errors={props.errors} />
                </div>
            </div>
        );
    }
}
