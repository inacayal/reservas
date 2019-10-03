import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
/**
 * elements
 */
import ButtonList from '../../../componentes/basic/ButtonList';
/**
 * handlers and elements
 */
import LoadBar from '../../../utils/LoadBar';
/**
 * api
 */
import { GET } from '../../../utils/api';
import { FormFields } from '../FormFields';
import { assignHorarios } from './generateEventosCard';
export default class AgregarFormulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: null,
            loadFinished: false
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
        const conf = this.props.editar 
        ? 
            {
                endpoint: 'eventos/single/27/' + this.props.match.params.id,
                download: this.downloadHandler
            } 
        :
            {
                endpoint: 'eventos/add/27',
                download: this.downloadHandler
            };
        const request = GET(conf);

        request
            .then(
                response => {
                    let data = {};
                    if (this.props.editar) {
                        data = {
                            selected: response.data.eventos[0],
                            all: {
                                feriados: response.data.feriados,
                                horarios: response.data.horarios,
                                promociones: response.data.promociones
                            }
                        };
                        data.selected.horarios.list = assignHorarios(data.selected.horarios.list)[0];
                        data.all.horarios.list = assignHorarios(data.all.horarios.list)[0];
                    } else {
                        data = response.data;
                        data.horarios.list = assignHorarios(data.horarios.list)[0];
                    }
                    this.setState({
                        data: {...data}
                    });
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
    
    render() {
        if (this.state.data && this.state.loadFinished){
            return (
                <form className="full-width box-padding">
                    <div className="row c-title highlight-title">
                        {this.props.editar ? "Editando evento "+this.state.data.selected.nombre : "Agregar Evento"  }
                    </div>
                    <FormFields editar ={this.props.editar} {...this.state.data}/> 
                </form>
            );
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}