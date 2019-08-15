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
        this.state = {
            data: {
                1:{
                    nombre: "Cumpleaños",
                    descuento: 50,
                    promocion: "50% de descuento para el cumpleañero si reservas un fin de semana."
                },
                2:{
                    nombre: "Negocios",
                    descuento: 50,
                    promocion: "50% de descuento en bebidas si reservas antes de las 21hs."
                },
                3:{
                    nombre: "Amigos",
                    descuento: 10,
                    promocion: "10% de descuento en comidas compartidas si reservas antes de las 18hs."
                }
            }
        };
    }

    componentDidMount() {
        console.log('eventosMount');
    }

    componentWillUnmount() {
        console.log('eventosUnmount');
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
                                data={this.state.data}
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
                                data={this.state.data}
                                {...match} />
                    } />
            </>
        );
    }
}
