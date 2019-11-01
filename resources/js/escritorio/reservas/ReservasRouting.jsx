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
import VerReserva from'./sub/VerReserva';
/**
 * constantes
 */
import {ALL_CONTROL} from '../../constantes/CalendarControls';
import { Route, Switch } from 'react-router-dom';

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
                            <Calendario {...match}/>
                    } />
                <Switch>
                    <Route
                        path={this.props.match.url + '/agregar'}
                        component={
                            (match) =>
                                <AgregarFormulario
                                    {...match} />
                        } />
                    <Route
                        path={this.props.match.url + '/:id'}
                        component={
                            (match) =>
                                <VerReserva
                                    {...match} />
                        } />
                </Switch>
            </>
        );
    }
}
