/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * basic component
 */
import LoadBar from '../../../componentes/control/LoadBar';
/**
 * API
 */
import { GET } from '../../../utils/api';
/**
 * formularios
 */
import { FormularioEstablecimiento } from '../../configuracion/FormularioEstablecimiento';
import { FormularioUsuario } from '../../configuracion/FormularioUsuario';
import { FormularioFranquicia } from '../FormularioFranquicia';
/**
 * components
 */
import Actions from '../../../componentes/basic/Actions';
import Titulo from '../../../componentes/basic/Titulo';
import { Navegacion } from '../../../acciones/ActionsByView';

export default class Formulario extends Component{
    constructor(props){
        super(props);
        this.state = {
            open:false,
            loading:0,
            data:null,
            loadFinished : false
        };
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);

        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        if (this.props.editar)
            this.props.nav.buttons[0].click = this.toggleModal;

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
        const conf = this.props.editar
        ?
            {
                endpoint: '/usuario/local/'+this.props.match.params.id,
                download: this.downloadHandler
            }
        :
            {
                endpoint: '/usuario/add/4/1',
                download: this.props.downloadHandler
            },
            request = GET(conf);
        request
            .then(
                response => {
                    const data = this.props.editar
                    ?
                        response.data.data
                    :
                        response.data.usuarios.list;
                    this.setState({ data,loadFinished:true });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){
        if (this.state.data && this.state.loadFinished) {
            return (
                <form className="full-width box-padding">
                    < Titulo
                        title={
                            this.props.editar
                                ?
                                    this.state.data.nombre
                                : "Agregar Local"
                        }
                        links={this.props.nav.links}
                        buttons ={this.props.nav.buttons} />
                    <div className="container">
                        {
                            this.props.editar
                            ?
                                ""
                            :
                                <FormularioFranquicia data={this.state.data}/>
                        }
                        <FormularioEstablecimiento data={this.state.data}/>
                        <FormularioUsuario data={this.state.data}/>
                        <div className="row justify-content-end v-padding">
                            <Actions
                                buttons={Object.values(this.actions)}/>
                        </div>
                    </div>
                </form>
            )
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        )
    }
}
