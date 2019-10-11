/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * input components
 */
import { onTextChange, Text } from '../../../componentes/input/Text'
import { showOptions, selectOption, Select } from '../../../componentes/input/Select'
/**
 * basic component
 */
import Titulo from '../../../componentes/basic/Titulo';
/**
 * API
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';
/**
 * Formulario
 */
import { FormularioEstablecimiento } from '../../configuracion/FormularioEstablecimiento';
import { FormularioUsuario } from '../../configuracion/FormularioUsuario';
/**
 * navegacion
 */
import { Navegacion } from '../Navegacion';

export default class AgregarFormulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loadFinished: false,
            loading: null
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
        if (this.props.editar) {
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
        } else {
            this.setState({
                data: {},
                loadFinished: true
            })
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (this.state.data && this.state.loadFinished) {
            const nav = Navegacion.formulario(
                this.state.data,
                this.props.editar
            );
            return (
                <form className="full-width box-padding">
                    <div className="c-title highlight-title">
                        < Titulo
                            title={
                                this.props.editar
                                    ? "Editando franquicia " + this.state.data.nombre
                                    : "Agregar franquicia"
                            }
                            links={nav.links}
                            buttons={nav.buttons} />
                    </div>
                    <div className="container">
                        <FormularioEstablecimiento data={this.state.data} isFranquicia />
                        <FormularioUsuario data={this.state.data} />
                    </div>
                </form>
            )
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}
