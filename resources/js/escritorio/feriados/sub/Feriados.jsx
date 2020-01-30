/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Titulo from '../../../componentes/basic/Titulo';
import {NO_DAY_CONTROL} from '../../../constantes/CalendarControls';
import {DAYS,MONTHS} from '../../../constantes/DaysMonths';
import FeriadosTable from '../../../componentes/tables/FeriadosTable';
import DateFilter from '../../../hocs/DateFilter';
import FeriadoViews from '../../../componentes/agenda/FeriadoView';
import {WaitsLoading} from '../../../hocs/DataHandler';
import {assignType} from '../../../utils/Helper';

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


const dataByType = {
    agenda: (par) => (
        <DateFilter data={par.props.data}
            controls={NO_DAY_CONTROL}
            route={'feriados'}
            defaultView={"1"}>
            <FeriadoViews actions={{eliminar:par.props.toggleModal}}/>
        </DateFilter>
    ),
    tabla: (par) => (
        <div className="row">
            <FeriadosTable data={par.props.data.data}/>
        </div>
    )
}

export default class Feriados extends Component {
    constructor(props){
        super(props);
    }

    static contextType = WaitsLoading;

    componentDidMount() {
        console.log('mount')
    }

    componentWillUnmount() {
        console.log('feriadosUnmount');
    }

    changeView(){
        const loc = (this.props.location||{}).state||{};
        this.context({
            date:loc.date,
            type: assignType(this.props.data.type)
        });
    }

    render(){
        return (
            <>
                <Titulo title="Feriados"
                    changeView ={{
                        right:"viendo tabla",
                        left:"viendo agenda",
                        change:this.changeView.bind(this),
                        side:this.props.data.type === 'agenda'
                    }}
                    links={this.props.nav.links.concat(links)}/>
                <div className="container">
                {
                    dataByType[this.props.data.type](this)
                }
                </div>
            </>
        );
    }
}
