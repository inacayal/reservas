/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * form sub elements
 */
import Establecimiento from './sub/Establecimiento';
import Usuario from './sub/Usuario';
import Reservas from './sub/Reservas';
import Configuracion from './sub/Configuracion';

import {Route} from 'react-router-dom';

export default class ConfiguracionRouting extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log('configuracionMount');
    }

    componentWillUnmount(){
        console.log('configuracionUnmount');
    }

    render() {
        return (
            <>
                <Route
                    path={this.props.match.url}
                    exact
                    component={
                        (match) =>
                            <Configuracion
                                {...match} />
                    } />
                <Route
                    path={this.props.match.url+'/usuario'}
                    component={
                        (match) =>
                            <Usuario
                                {...match} />
                    } />
                <Route
                    path={this.props.match.url + '/establecimiento'}
                    component={
                        (match) =>
                            <Establecimiento
                                {...match} />
                    } />
                <Route
                    path={this.props.match.url + '/reservas'}
                    component={
                        (match) =>
                            <Reservas
                                {...match}/>
                    } />
            </>
        );
    }
}
