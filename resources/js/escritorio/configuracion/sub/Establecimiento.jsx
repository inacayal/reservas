/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormularioEstablecimiento } from '../FormularioEstablecimiento';
/**
 * api
 */
import Titulo from '../../../componentes/basic/Titulo';
import { GET } from '../../../utils/api';
import Actions from '../../../componentes/basic/Actions';

export const establecimientoHandler = (endpoint) => {
    return function () {
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

export class Establecimiento extends Component {
    constructor(props) {
        super(props);

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

    componentDidMount() {
    }


    componentWillUnmount() {
        console.log('configuracionReservasUnmount');
    }

    render() {
        console.log(this.props)
        return (
            <>
                <Titulo
                    title="Configurar Establecimiento"
                    links={this.props.nav.links} />
                <div className="container">
                    <FormularioEstablecimiento data={this.props.data} />
                    <div className="row v-padding justify-content-end">
                        <Actions buttons={Object.values(this.actions)}/>
                    </div>
                </div>
            </>
        );
    }
}
