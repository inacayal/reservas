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
import {Route} from 'react-router-dom';

export default class UbicacionesRouting extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                1:{
                    nombre: "Salón",
                    descripcion:"Salón principal",
                    capacidad: 32
                },
                2:{
                    nombre: "Terraza",
                    descripcion: "techada con jardín",
                    capacidad: 10
                },
                3:{
                    nombre: "Vereda",
                    descripcion: "mesas espaciosas al aire libre",
                    capacidad: 16
                }
            }
        };
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
                                data={this.state.data}
                                {...match}/>
                    } />
                <Route
                    path={this.props.match.url+'/agregar'}
                    component={
                        (match) => 
                            <AgregarFormulario  
                                {...match}/>
                    } />
                <Route
                    path={this.props.match.url + '/editar :id'}
                    component={
                        (match) => 
                            <AgregarFormulario 
                                data={this.state.data} 
                                {...match}/>
                    } />
            </>
        );
    }
}
