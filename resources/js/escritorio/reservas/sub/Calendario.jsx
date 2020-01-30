import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import Titulo from '../../../componentes/basic/Titulo';
import { NO_WEEK_CONTROLS } from '../../../constantes/CalendarControls';
import ReservasTable from '../../../componentes/tables/ReservasTable'
import {ReservaView} from '../../../componentes/agenda/ReservaView';
import DateFilter from '../../../hocs/DateFilter';
import {WaitsLoading} from '../../../hocs/DataHandler';
import {assignType} from '../../../utils/Helper';

const dataByType = {
    agenda: (par) => (
        <DateFilter hideViews
            data={par.props.data}
            route={'reservas'}
            controls={{}}>
            <ReservaView actions={par.actions}/>
        </DateFilter>
    ),
    tabla: (par) => (
        <div className="row">
            <div className="bold text-right">
                {`${par.props.data.data.length} reservas encontradas`}
            </div>
            <ReservasTable data={par.props.data.data}/>
        </div>
    )
}

export default class Calendario extends Component {
    constructor(props){
        super(props);
        this.actions = {
            aceptar: this.aceptarReserva.bind(this),
            rechazar: this.rechazarReserva.bind(this),
            revertir: this.revertirReserva.bind(this)
        };
    }

    static contextType = WaitsLoading;

    revertirReserva() {
        console.log('revertir');
    }

    aceptarReserva() {
        console.log('aceptarReserva');
    }

    rechazarReserva() {
        console.log('rechazarReserva');
    }

    componentWillUnmount() {
        console.log('reservasSubUnmount');
    }

    changeView(){
        const loc = (this.props.location||{}).state||{};
        this.context({
            date:loc.date,
            type: assignType(this.props.data.type)
        });
    }

    render(){
        const loc = this.props.location.state||{},
            type = loc.type
                ? loc.type
                : this.props.data.type;
        return (
            <>
                <Titulo title="Reservaciones"
                    changeView={{
                        right:"viendo tabla",
                        left:"viendo agenda",
                        change:this.changeView.bind(this),
                        side:this.props.data.type==='agenda'
                    }}
                    links={this.props.nav.links}/>
                <div className="container">
                {
                    dataByType[this.props.data.type](this)
                }
                </div>
            </>
        );
    }
}
