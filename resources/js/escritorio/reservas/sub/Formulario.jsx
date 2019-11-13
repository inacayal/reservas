/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import EventoFrame from '../../../reserva/pasos/evento/EventoFrame';
import { GET } from '../../../utils/api';
import Titulo from '../../../componentes/basic/Titulo';
import LoadBar from '../../../componentes/control/LoadBar';
import Actions from '../../../componentes/basic/Actions';

export const formHandler = (endpoint) => {
    return function (params) {
        const date = this.state.date ? this.state.date : new Date(),
            request = GET({
                endpoint: endpoint + parseInt(date.getMonth() + 1) + '/' + date.getFullYear(),
                download: this.downloadHandler
            });
        request
            .then(
                response => {
                    const data = response.data;
                    this.setState({
                        data:{
                            data:data,
                            date:date
                        },
                        loadFinished:true
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}

export class Formulario extends Component{
    constructor(props){
        super(props);

        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);

        this.props.formActions.buttons.cancelar.click = this.cancelarFormulario;
        this.props.formActions.buttons.guardar.click = this.enviarFormulario;
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
        console.log('formularioReservasUnmount');
    }

    render(){
        const data = this.props.data;
        return (
            <>
                <Titulo
                    title='Agregar Reservación'
                    links={this.props.nav.links} />
                <form className="full-width">
                    <div className="container">
                        <div className="row">
                            <EventoFrame
                                displayTitles={false}
                                current={true}
                                fecha={data.date}
                                fetch = {this.props.fetch}
                                data={data.data}
                                formActions={this.props.formActions}/>
                        </div>
                        <div className="row justify-content-end">
                            <Actions buttons={Object.values(this.props.formActions.buttons)}/>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}
