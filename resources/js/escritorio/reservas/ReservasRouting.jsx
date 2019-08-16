/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elements
 */
import AgregarFormulario from './sub/AgregarFormulario';
import Calendario from './sub/Calendario';
/**
 * componentes
 */
import Titulo from '../../componentes/basic/Titulo';
/**
 * funciones
 */
import { formActions, formNavigation, panelNavigation } from '../../funciones/dataActions';
/**
 * constantes
 */
import {ALL_CONTROL} from '../../constantes/CalendarControls';
import { Route } from 'react-router-dom';

export default class ReservasRouting extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        };
    }

    render() { 
        return (
            <>
                <Route
                    path={this.props.match.url}
                    exact
                    component={
                        (match) =>
                            <Calendario />
                    } />
                <Route
                    path={this.props.match.url + '/agregar'}
                    component={
                        (match) =>
                            <AgregarFormulario
                                {...match} />
                    } />
            </>
        );
    }
}