/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';
/**
 * basic
 */
import { Navegacion } from '../Navegacion';
import Titulo from '../../../componentes/basic/Titulo';
export default class VerLocal extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadFinished: false,
            data: null,
            open: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
    }

    downloadHandler(pEvent) {
        let
            loading = Math.round((pEvent.loaded * 100) / pEvent.total),
            state = loading !== 100 ?
                { loading, loadFinished: false }
                : { loading, loadFinished: true };
        this.setState(state);
    }

    fetchData() {
        this.setState({
            data: null,
            isLoading: true,
            loadFinished: false
        });
        const request = GET({
            endpoint: '/usuario/local/'+this.props.match.params.id,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.data });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    render() {
        if (this.state.data && this.state.loadFinished) {
            const data = this.state.data,
                nav = Navegacion.singular(data);
            return (
                <div className="container">
                    < Titulo
                        title={"Viendo local " + this.state.data.nombre}
                        links={nav.links}
                        buttons ={nav.buttons}/>
                    <div className="container full-width v-padding">
                        <div className="row justify-content-end v-padding">
                            <div className="col-md-6">
                                <h6 className="full-width light-danger bold">
                                    Franquicia
                                </h6>
                                <div>
                                    {data.franquicia}
                                </div>
                            </div>
                        </div>
                        <div className="row v-padding">
                            <div className="col-md-4">
                                <h6 className="full-width light-danger bold">
                                    Username
                                </h6>
                                <div>
                                    {data.username}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h6 className="full-width light-danger bold">
                                    Correo
                                </h6>
                                <div>
                                    {data.email}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h6 className="full-width light-danger bold">
                                    Contraseña de usuario
                            </h6>
                                <div>
                                    *******************
                            </div>
                            </div>
                        </div>
                        <div className="row v-padding">
                            <div className="col-md-4">
                                <h6 className="full-width light-danger bold">
                                    Nombre
                                </h6>
                                <div>
                                    {data.nombre}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h6 className="full-width light-danger bold">
                                    Correo 
                                </h6>
                                <div>
                                    {data.correoLocal}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h6 className="full-width light-danger bold">
                                    Teléfono 
                            </h6>
                                <div>
                                    {data.telefonoLocal}
                                </div>
                            </div>
                        </div>
                        <div className="row v-padding">
                            <div className="col-md-6">
                                <h6 className="full-width light-danger bold">
                                    Razón Social
                            </h6>
                                <div>
                                    {data.razonSocial}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h6 className="full-width light-danger bold">
                                    CUIT / CUIL
                                </h6>
                                <div>
                                    {data.cuitCuil}
                                </div>
                            </div>
                        </div>
                        <div className="row sub-title bold v-padding">
                            Encargado
                        </div>
                        <div className="row v-padding margin-box">
                            <div className="col-md-4">
                                <h6 className="full-width light-danger bold">
                                    Nombre
                                </h6>
                                <div>
                                    {data.admNombre}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h6 className="full-width light-danger bold">
                                    Teléfono
                                </h6>
                                <div>
                                    {data.admTelefono}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h6 className="full-width light-danger bold">
                                    Correo
                                </h6>
                                <div>
                                    {data.admEmail}
                                </div>
                            </div>
                        </div>
                        <div className="row sub-title bold v-padding">
                            Ubicación
                        </div>
                        <div className="row v-padding margin-box">
                            <div className="col-md-6">
                                <h6 className="full-width light-danger bold">
                                    Provincia
                                </h6>
                                <div>
                                    {data.provincia.nombre}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h6 className="full-width light-danger bold">
                                    Dirección del local
                                </h6>
                                <div>
                                    {data.direccionLocal}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}

