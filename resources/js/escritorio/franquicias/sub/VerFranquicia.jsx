/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * API
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
/**
 * navegacion
 */
import { Navegacion } from '../Navegacion';

export default class VerFranquicia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadFinished: false,
            data: null,
            open: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
        this.nav = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-store inline-box side-margin" />
                        Locales
            </div>
                ),
                to: '/locales'
            }
        ];
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
            endpoint: '/usuario/franquicia/' + this.props.match.params.id,
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
                        title={"Viendo franquicia " + this.state.data.nombre}
                        links={nav.links}
                        buttons={nav.buttons} />
                    <div className="container full-width v-padding">
                        <div className="row justify-content-end v-padding">
                            <div className="col-md-6">
                                <h6 className="full-width light-danger bold">
                                    Administrador
                                </h6>
                                <div>
                                    {data.administrador}
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
                            Usuario
                        </div>
                        <div className="row">
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

