/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import AgregarFormulario from './sub/AgregarFormulario';
import Promociones from './sub/Promociones';
import VerPromocion from './sub/VerPromocion';
import { Route, Switch } from 'react-router-dom';

export default class PromocionesRouting extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('promocionesMount');
    }

    render() {
        return (
            <>
                <Route
                    path={this.props.match.url}
                    exact
                    component={
                        (match) =>
                            <Promociones
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
                                <VerPromocion
                                    {...match} />
                        } />
                </Switch>
            </>
        );
    }
}
