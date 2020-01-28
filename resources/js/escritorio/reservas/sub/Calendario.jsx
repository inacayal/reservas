import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import Titulo from '../../../componentes/basic/Titulo';
import { NO_WEEK_CONTROLS } from '../../../constantes/CalendarControls';
import ReservasTable from '../../../componentes/tables/ReservasTable'
import {ReservaView,processData} from '../../../componentes/agenda/ReservaView';
import DateFilter from '../../../hocs/DateFilter';

export default class Calendario extends Component {
    constructor(props){
        super(props);
        this.state = {
            view:true
        };

        this.actions = {
            aceptar: this.aceptarReserva.bind(this),
            rechazar: this.rechazarReserva.bind(this),
            revertir: this.revertirReserva.bind(this)
        };
    }

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
        this.setState({view:!this.state.view})
    }

    render(){
        const tData = this.props.data.data.length>0
            ? processData(this.props.data.data)
            : []
        return (
            <>
                <Titulo title={"Reservaciones"}
                    changeView={{
                        right:"Ver tabla",
                        left:"Ver agenda",
                        change:this.changeView.bind(this),
                        side:this.state.view
                    }}
                    links={this.props.nav.links} />
                <div className="container">
                {
                    this.state.view
                    ?
                        <DateFilter hideViews
                            data={this.props.data}
                            controls={{}}>
                            <ReservaView actions={this.actions}/>
                        </DateFilter>
                    :
                        <div className="row">
                            <div className="bold text-right">{`${tData.length} reservas encontradas`}</div>
                            <ReservasTable data={tData}/>
                        </div>
                }
                </div>
            </>
        );
    }
}
