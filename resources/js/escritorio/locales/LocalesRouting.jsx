/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import AgregarFormulario from './sub/AgregarFormulario';
import Locales from './sub/Locales';
import VerLocal from './sub/VerLocal';
import {Route, Switch} from 'react-router-dom';

export default class LocalesRouting extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        console.log('localesMount');
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    render(){
        return (
            <>
                <Route
                    path={this.props.match.url}
                    exact
                    component={
                        (match) =>
                            <Locales
                                downloadHandler={this.props.downloadHandler}
                                {...match} />
                    } />
                    <Switch>
                        <Route
                            path={this.props.match.url + '/editar/:id'}
                            exact
                            component={
                                (match) =>
                                    <AgregarFormulario
                                        downloadHandler={this.props.downloadHandler}
                                        editar={true}
                                        {...match} />
                            } />
                        <Route
                            path={this.props.match.url + '/agregar'}
                            component={
                                (match) =>
                                    <AgregarFormulario
                                        downloadHandler={this.props.downloadHandler}
                                        editar={false}
                                        {...match} />
                            } />
                        <Route
                            path={this.props.match.url + '/:id'}
                            downloadHandler={this.props.downloadHandler}
                            component={
                                (match) =>
                                    <VerLocal
                                        {...match} />
                            } />                        
                    </Switch>
            </>
        );
    }
}
