import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
/**
 * elements
 */
import  Titulo from '../../../componentes/basic/Titulo';
/**
 * handlers and elements
 */
import { FormFields } from '../FormFields';
/**
 * api
 */
import LoadBar from '../../../utils/LoadBar';
import { GET } from '../../../utils/api';
/**
 * nav
 */
import {Navegacion} from '../Navegacion';
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
                endpoint: 'promociones/single/27/' + this.props.match.params.id,
                download: this.downloadHandler
            }
            :
            {
                endpoint: 'promociones/add/27',
                download: this.downloadHandler
            };
        const request = GET(conf);

        request
            .then(
                response => {
                    let data = {};
                    if (this.props.editar) {
                        data = {
                            selected: response.data.promociones[0],
                            all: {
                                eventos: response.data.eventos
                            }
                        };
                    } else {
                        data = response.data;
                    }
                    this.setState({
                        data: { ...data }
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
        if (this.state.data && this.state.loadFinished) {
            const nav = Navegacion.formulario(
                this.state.data.selected,
                this.props.editar
            );
            return (
                <form className="full-width box-padding">
                    <Titulo
                        title={this.props.editar 
                            ? "Editando promoción " + this.state.data.selected.nombre 
                            : "Agregar Promoción"}
                        links={nav.links} 
                        buttons={nav.buttons}/>
                    <FormFields editar={this.props.editar} {...this.state.data} />
                </form>
            );
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}