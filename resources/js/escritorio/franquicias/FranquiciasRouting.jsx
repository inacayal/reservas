/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import AgregarFormulario from './sub/AgregarFormulario';
import Franquicias from './sub/Franquicias';
import VerFranquicia from './sub/VerFranquicia';
import { Route, Switch } from 'react-router-dom';

export default class FranquiciasRouting extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('localesMount');
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    render() {
        return (
            <>
                <Route
                    path={this.props.match.url}
                    exact
                    component={
                        (match) =>
                            <Franquicias
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
                                <VerFranquicia
                                    {...match} />
                        } />
                </Switch>

            </>
        );
    }
}
