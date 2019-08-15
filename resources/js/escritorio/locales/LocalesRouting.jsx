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

import {Route} from 'react-router-dom';

export default class LocalesRouting extends Component {
    constructor(props){
        super(props);
        this.state={
            data:{
                0:{
                    nombre:"Palermo Viejo",
                    email:"pásdopoasid@aklsdjalskjd.com",
                    razonSocial:"Bolsa de gatos SAS",
                    telefono: "8794531136",
                    provincia:"CABA",
                    cuitCuil:"656466542313",
                    direccion: "kahdkasjldhlkajsdhaksjdhaskdja",
                    administrador:"Jose Luis Rodriguez",
                    correoAdmin:"aspodasid@inacayal.com.ar",
                    telAdmin:"564687987",
                    estado: "1"
                },
                12:{
                    nombre: "Cañitas",
                    email:"askldalskjd@alksdjaklsjd.com",
                    razonSocial: "Razon Social 15",
                    telefono: "8798495",
                    provincia: "CABA",
                    cuitCuil: "656466542313",
                    direccion: "kahdkasjldhlkajsdhaksjdhaskdja",
                    administrador: "Maria Mora",
                    correoAdmin:"adlaksjd@lkasdk.com",
                    telAdmin:"7+97131321,",
                    estado: "1"
                },
                25:{
                    nombre: "Palermo Soho",
                    email:"alsdkasñlkd@aklsjdlaksd.com",
                    razonSocial: "Razon Social 25",
                    telefono:"46768798",
                    provincia: "CABA",
                    cuitCuil: "656466542313",
                    direccion: "kahdkasjldhlkajsdhaksjdhaskdja",
                    administrador: "Andres Galarraga",
                    correoAdmin:"aksdjaskljd@hotmail.com",
                    telAdmin:"5468798641531",
                    estado: "1"
                },
                13:{
                    nombre: "Recoleta",
                    email:"opwqepoqwei@askljdaslk.com",
                    razonSocial: "Razon Social 13",
                    telefono: "798712",
                    provincia: "CABA",
                    cuitCuil: "656466542313",
                    direccion:"kahdkasjldhlkajsdhaksjdhaskdja",
                    administrador: "Pedro Benitez",
                    correoAdmin:"asdlasdjlasd@yahoo.com",
                    telAdmin:"98741654",
                    estado: "1"
                },
                48: {
                    nombre: "Balvanera",
                    email:"añlskdlñasd@aslkdjaslkd.com",
                    razonSocial: "Razon Social 48",
                    telefono:"1654654665",
                    provincia: "CABA",
                    cuitCuil: "656466542313",
                    direccion: "kahdkasjldhlkajsdhaksjdhaskdja",
                    administrador: "Andres Peña",
                    correoAdmin:"bljklaksjld@inacayal.com",
                    telAdmin:"668798798",
                    estado: "1"
                }
            }
        }
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
            </>
        );
    }
}
