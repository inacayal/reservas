/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * form sub elements
 */
import Contacto from './sub/Contacto';
import Encargado from './sub/Encargado';
import Ubicacion from './sub/Ubicacion';
import Usuario from './sub/Usuario';
import Reservas from './sub/Reservas';
import Configuracion from './sub/Configuracion';

import {Route} from 'react-router-dom';

export default class ConfiguracionRouting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                email_local:"data1",
                adm_email:"data2",
                adm_nombre:"data3",
                adm_telefono:"data4",
                password_local:"data6",
                correo_local:"data7",
                telefono_local:"data8",
                razon_social:"data9",
                cuit_cuil:"data10",
                id_provincia:"1",
                intervalo:"5",
                caida:"10",
                direccion_local:"direccion de local",
                show:null
            }
        };
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
                                sub={this.props.sub}
                                data={this.state.data}
                                {...match} />
                    } />
                <Route
                    path={this.props.match.url+'/encargado'}
                    component={
                        (match) =>
                            <Encargado
                                data={{
                                    nombre: this.state.data.adm_nombre,
                                    email: this.state.data.adm_email,
                                    telefono: this.state.data.adm_telefono
                                }}
                                {...match} />
                    } />
                <Route
                    path={this.props.match.url + '/ubicacion'}
                    component={
                        (match) =>
                            <Ubicacion
                                data={{
                                    direccion: this.state.data.direccion_local,
                                    provincia: this.state.data.id_provincia
                                }}
                                {...match} />
                    } />
                <Route
                    path={this.props.match.url + '/contacto'}
                    component={
                        (match) =>
                            <Contacto
                                data={{
                                    email: this.state.data.correo_local,
                                    telefono: this.state.data.telefono_local
                                }}
                                {...match} />
                    } />
                <Route
                    path={this.props.match.url + '/usuario'}
                    component={
                        (match) =>
                            <Usuario
                                data={{
                                    social: this.state.data.razon_social,
                                    cuit: this.state.data.cuit_cuil,
                                    email: this.state.data.email_local
                                }}
                                {...match}/>
                    } />
                <Route
                    path={this.props.match.url + '/reservas'}
                    component={
                        (match) =>
                            <Reservas
                                data={{
                                    intervalo:this.state.data.intervalo,
                                    caida:this.state.data.caida
                                }}
                                {...match}/>
                    } />
            </>
        );
    }
}
