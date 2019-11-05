/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FormularioReservas} from '../FormularioReservas';
/**
 * API
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';
import Titulo from '../../../componentes/basic/Titulo';
import Actions from '../../../componentes/basic/Actions';

export default class Reservas extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:null,
            loading:null,
            loadFinished:false
        };
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
        this.actions = this.props.formActions.buttons;

        this.actions.cancelar.click = this.cancelarFormulario;
        this.actions.guardar.click = this.enviarFormulario;
    }

    enviarFormulario(e){
        e.preventDefault();
        console.log('guardar');
    }

    cancelarFormulario(e){
        e.preventDefault();
        console.log('cancelar');
    }

    toggleModal(e) {
        e.preventDefault();
        this.setState({
            open: !this.state.open
        });
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
            endpoint: 'usuario/local/27',
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
        console.log('configuracionReservasUnmount');
    }

    render(){
        if (this.state.data && this.state.loadFinished){
            return (
                <>
                    < Titulo
                        title="Configurar Reservas"
                        links={this.props.nav.links} />
                    <div className="container">
                        <FormularioReservas data ={this.state.data} />
                        <div className="row v-pading justify-content-end">
                            <Actions buttons={Object.values(this.actions)}/>
                        </div>
                    </div>
                </>
            );
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
