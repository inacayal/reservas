/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import AgregarFormulario from './sub/AgregarFormulario';
import Eventos from './sub/Eventos';
import VerEvento from './sub/VerEvento';
import {Route, Switch} from 'react-router-dom';

export default class EventosRouting extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <>
                <Route
                    path={this.props.match.url}
                    exact
                    component={
                        (match) =>
                            <Eventos
                                {...match} />
                    } />
                <Switch>
                    <Route
                        path={this.props.match.url + '/editar/:id'}
                        exact
                        component={
                            (match) =>
                                <AgregarFormulario
                                    editar={true}
                                    {...match} />
                        } />
                    <Route
                        path={this.props.match.url + '/agregar'}
                        component={
                            (match) =>
                                <AgregarFormulario
                                    editar={false}
                                    {...match} />
                        } />
                    <Route
                        path={this.props.match.url + '/:id'}
                        component={
                            (match) =>
                                <VerEvento
                                    {...match} />
                        } />
                </Switch>
            </>
        );
    }
}
