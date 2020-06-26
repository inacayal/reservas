import ReactDOM from 'react-dom';
import React, {
    Component
} from 'react';
import {
    Redirect
} from 'react-router-dom';

import {
    ReservaView
} from '../../../app/componentes/agenda/ReservaView';
import DateFilter from '../../../app/hocs/DateFilter';
import Titulo from '../../../app/componentes/basic/Titulo';

const links = [
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-plus-circle inline-box side-margin" />
                Agregar
            </div>
        ),
        to:`/escritorio/reservas/agregar`
    }
];

export default class Escritorio extends Component {
    constructor(props){
        super(props);
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

    render(){
        const props = this.props,
            data = props.data;
        return (
            <>
                <Titulo title="Reservaciones"
                    links={links}/>
                <DateFilter hideViews
                    hideSearch
                    data={data}
                    route={'reservas'}
                    controls={{}}>
                    <ReservaView actions={this.actions}/>
                </DateFilter>
            </>
        );
    }
}
