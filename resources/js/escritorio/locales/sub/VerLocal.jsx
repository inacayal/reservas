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
import { Navegacion } from '../../../acciones/ActionsByView';
import Titulo from '../../../componentes/basic/Titulo';
import FranquiciasTable from '../../../componentes/tables/FranquiciasTable';
import Actions from '../../../componentes/basic/Actions';
import {ExpandableComponent} from '../../../componentes/basic/ExpandableComponent';

export default class VerLocal extends Component {
    constructor(props){
        super(props);
        this.state = {
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
            data: null
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

    links(key){
        return [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-eye" />
                        Ver
                    </div>
                ),
                to: '/franquicias/' + key
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen" />
                        Editar
                    </div>
                ),
                to: '/franquicias/editar/' + key
            }
        ];
    }

    render() {
        if (this.state.data && this.state.loadFinished) {
            const data = this.state.data;
            data.franquicia.acciones= <Actions links ={this.links(data.franquicia.id)}/>;
            return (
                <>
                    <div className="container no-padding">
                        < Titulo
                            title={this.state.data.nombre}
                            links={this.props.nav.links}
                            buttons ={this.props.nav.buttons}/>
                        <div className="v-padding row">
                            <FranquiciasTable data={[data.franquicia]} withPagination={false}/>
                        </div>
                    </div>
                    <ExpandableComponent
                        title = {'Información'}
                        show={true}
                        component= {
                            <>
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
                        title = {'Ubicación'}
                        component= {
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
                        }/>
                    <ExpandableComponent
                        title = {'Encargado'}
                        component= {
                            <>
                                <div className="row v-padding margin-v">
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
                            </>
                        }/>
                    <ExpandableComponent
                        title = {'Usuario'}
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
                                </div>
                            </div>
                        }/>
                </>
            )
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
