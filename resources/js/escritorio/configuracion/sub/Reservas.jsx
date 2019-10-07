/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ConfigurarReservas} from './ConfigurarReservas';
/**
 * api
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';

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
            endpoint: 'usuario/single/r/27',
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
                    <div className="c-title highlight-title v-padding">
                        Configurar Reservas
                    </div>
                    <ConfigurarReservas data ={this.state.data} />
                </>
            );
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );  
    }
}