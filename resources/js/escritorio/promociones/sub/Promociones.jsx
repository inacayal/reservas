/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
import { CardList } from '../../../componentes/basic/CardList';
import { closeModal, ConfirmarModal } from '../../../componentes/modal/Modal';
/**
 * funciones
 */
import generatePromocionesCard from './generatePromocionesCard';
import LoadBar from '../../../componentes/control/LoadBar';
/**
 * api
 */
import { GET } from '../../../utils/api';
/**
 * nav
 */
import { Navegacion } from '../Navegacion';
export default class Promociones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            loadFinished: false
        };

        this.eliminarPromocion = this.eliminarPromocion.bind(this);
        this.closeModal = closeModal.bind(this);

        this.actions = {
            agregar: this.agregarPromocion,
            editar: this.editarPromocion,
            eliminar: this.eliminarPromocion
        };
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
        this.eliminarPromocion = this.eliminarPromocion.bind(this);
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
            endpoint: 'promociones/list/27',
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    console.log(response.data)
                    this.setState({ data: response.data.promociones.data });
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

    eliminarPromocion(e) {
        e.preventDefault();
        this.setState({
            open: true
        })
    }

    componentWillUnmount() {
        console.log('eventosUnmount');
    }

    render() {
        if (this.state.data && this.state.loadFinished) {
            const promociones = generatePromocionesCard(
                    this.state.data,
                    this.actions
                ),
                nav = Navegacion.listado(this.state.data);
            return (
                <>
                    <Titulo
                        title="Promociones"
                        links={nav.links} />
                    <div className="container">
                        <ConfirmarModal
                            open={this.state.open}
                            closeModal={this.closeModal}
                            title="Eliminar Evento"
                            content="¿estás seguro de eliminar este evento?" />
                        <div className="row limit-height-half">
                            <div className="bold top-padding">
                                {"Mostrando " + promociones.length + " promociones encontradas"}
                            </div>
                            <ul className="full-width nav-list no-padding">
                                {
                                    promociones.map(
                                        (elem, index) =>
                                            <li key={index} className={elem.class}><elem.content /></li>
                                    )
                                }
                            </ul>
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
