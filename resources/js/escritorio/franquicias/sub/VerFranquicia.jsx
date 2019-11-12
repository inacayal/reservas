/**
 * react basic
 */
import React, { Component,useState } from 'react';
import ReactDOM from 'react-dom';
/**
 * API
 */
import { GET } from '../../../utils/api';
import Actions from '../../../componentes/basic/Actions';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
import LocalesTable from '../../../componentes/tables/LocalesTable';
import {ExpandableComponent} from '../../../hocs/ExpandableComponent';

export const singleHandler = (endpoint) => {
    return function (params) {
        this.setState({
            data: null,
            isLoading: true,
            loadFinished: false
        });
        const request = GET({
            endpoint: endpoint,
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
}

export class VerFranquicia extends Component {
    constructor(props) {
        super(props);
        this.props.nav.buttons[0].click = this.props.toggleModal;
    }
    enviarFormulario(e){
        e.preventDefault();
        console.log('guardar');
    }

    cancelarFormulario(e){
        e.preventDefault();
        console.log('guardar');
    }


    componentDidMount() {
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    links(key) {
        return [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-eye" />
                        Ver
                    </div>
                ),
                to: '/locales/' + key
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen" />
                        Editar
                    </div>
                ),
                to: '/locales/editar/' + key
            }
        ];
    }

    render() {
        const data = this.props.data,
            localesData = Object.values(data.locales.data).map(
                e => ({
                    ...e,
                    acciones: <Actions links={this.links(e.id)} buttons={[]}/>
                })
            ),
            agregar = [{
                title:(
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" /> Agregar Local
                    </div>
                ),
                to:"/locales/agregar"
            }];
        return (
            <>
                < Titulo
                    title={data.nombre}
                    links={this.props.nav.links}
                    buttons={this.props.nav.buttons} />
                <div className="container full-width no-padding">
                    <div className="row top-padding">
                        <div className="col-md-6 sub-title bold">
                            Locales
                        </div>
                        <div className="col-md-6 text-right">
                            <Actions links={agregar}/>
                        </div>
                    </div>
                    <div className="row h-padding">
                        <LocalesTable data={localesData}/>
                    </div>
                </div>
                <div className="container">
                    <ExpandableComponent
                        title = {"Información"}
                        show={true}
                        component = {
                            <>
                                <div className="row justify-content-end v-padding">
                                    <div className="col-md-4">
                                        foto perfil
                                    </div>
                                    <div className="col-md-8">
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
                            </>
                        }/>
                    <ExpandableComponent
                        title = {"Usuario"}
                        component = {
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
                        }/>
                </div>
            </>
        )
    }
}
