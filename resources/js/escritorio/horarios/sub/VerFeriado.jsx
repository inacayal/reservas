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
import { FeriadoNavegacion as Navegacion } from '../FeriadoNavegacion';
import Titulo from '../../../componentes/basic/Titulo';
export default class VerFeriado extends Component {
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
            endpoint: '/feriados/single/27/'+this.props.match.params.id,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.feriados[0] });
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
            const nav = Navegacion.singular(this.state.data);
            return (
                <div className="container">
                    < Titulo
                        title={"Viendo feriado " + this.state.data.nombre}
                        links={nav.links}
                        buttons ={nav.buttons}/>
                    <div className="container full-width v-padding">
                        <div className="row justify-content-end v-padding">
                            singular feriado
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
