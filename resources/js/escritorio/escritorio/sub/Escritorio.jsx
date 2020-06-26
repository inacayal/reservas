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

export default class Escritorio extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const props = this.props,
            data = props.data;
        return (
            <>
                <Titulo title={`Bienvenido, ${props.user.nombre}`} />
                <h2>Resumen de Actividad</h2>
            </>
        );
    }
}
