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
import {Route} from 'react-router-dom';

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
                <Route
                    path={this.props.match.url + '/agregar'}
                    component={
                        (match) =>
                            <AgregarFormulario
                                {...match} />
                    } />
                <Route
                    path={this.props.match.url + '/editar :id'}
                    component={
                        (match) =>
                            <AgregarFormulario
                                {...match} />
                    } />
            </>
        );
    }
}
