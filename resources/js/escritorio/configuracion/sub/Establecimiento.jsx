/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input elements
 */
import Actions from '../../../componentes/basic/Actions';
import LoadBar from '../../../componentes/control/LoadBar';
/**
 * api
 */
import { GET } from '../../../utils/api';
import {Text} from '../../../componentes/input/Text';
import {ConfigurarUbicacion} from './ConfigurarUbicacion';

export default class Establecimiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:null,
            data:null,
            loadFinished:false
        };
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
            endpoint: 'usuario/single/e/27',
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

    render(){
        if (this.state.data && this.state.loadFinished){
            const data = this.state.data;
            return (
                <div className="container full-width ">
                    <div className="row c-title highlight-title">
                        Configurar Establecimiento
                    </div>
                    <div className="row v-padding">
                        <div className="col-md-4">
                            <Text 
                                rows={1} 
                                titulo="Nombre" 
                                name="nombre" 
                                value={data.nombre} 
                                classes={"border-box input-text margin-box"} 
                                container="full-width" />
                        </div>
                        <div className="col-md-4">
                            <Text 
                                rows={1} 
                                titulo="Correo" 
                                name="correo_local" 
                                value={data.correoLocal} 
                                classes={"border-box input-text margin-box"} 
                                container="full-width" />
                        </div>
                        <div className="col-md-4">
                            <Text 
                                rows={1} 
                                titulo="Teléfono" 
                                name="telefono_local" 
                                value={data.telefonoLocal} 
                                classes={"border-box input-text margin-box"} 
                                container="full-width" />
                        </div>
                    </div>
                    <div className="row v-padding">
                        <div className="col-md-6">
                            <Text 
                                rows={1} 
                                titulo="Razón Social" 
                                name="razon_social" 
                                value={data.razonSocial} 
                                classes={"border-box input-text margin-box"} 
                                container="full-width" />
                        </div>
                        <div className="col-md-6">
                            <Text
                                rows={1}
                                titulo="CUIT / CUIL"
                                name="cuit_cuil"
                                value={data.cuitCuil}
                                classes={"border-box input-text margin-box"}
                                container="full-width" />
                        </div>
                    </div>
                    <div className="row sub-title top-padding">
                        Encargado
                    </div>
                    <div className="row v-padding ">
                        <div className="col-md-4">
                            <Text
                                rows={1}
                                titulo="Nombre"
                                name="nombre_adm"
                                value={data.admNombre}
                                classes={"border-box input-text margin-box"}
                                container="full-width" />
                        </div>
                        <div className="col-md-4">
                            <Text
                                rows={1}
                                titulo="Teléfono"
                                name="telefono_adm"
                                value={data.admTelefono}
                                classes={"border-box input-text margin-box"}
                                container="full-width" />
                        </div>
                        <div className="col-md-4">
                            <Text
                                rows={1}
                                titulo="Correo"
                                name="correo_adm"
                                value={data.admEmail}
                                classes={"border-box input-text margin-box"}
                                container="full-width" />
                        </div>
                    </div>
                    <div className="row sub-title top-padding">
                        Ubicación
                    </div>
                    <div className="row v-padding margin-box">
                        <ConfigurarUbicacion data={this.state.data} provincias={this.state.provincias}/>
                    </div>
                </div>
            );
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );  
    }
}