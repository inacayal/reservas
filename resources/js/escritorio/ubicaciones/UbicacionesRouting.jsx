/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import AgregarFormulario from './sub/AgregarFormulario';
import Ubicaciones from './sub/Ubicaciones';
import VerUbicacion from './sub/VerUbicacion';
import {Route,Switch} from 'react-router-dom';

export default class UbicacionesRouting extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        //fetch data from api call
        console.log('ubicacionesMount');
    }

    componentWillUnmount() {
        console.log('ubicacionesUnmount');
    }

    render(){
        return (
            <>
                <Route
                    path={this.props.match.url}
                    exact
                    component={
                        (match) => 
                            <Ubicaciones  
                                {...match}/>
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
                                <VerUbicacion
                                    {...match} />
                        } />
                </Switch>
            </>
        );
    }
}
