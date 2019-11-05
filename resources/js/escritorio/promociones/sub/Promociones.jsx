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
import { ConfirmarModal } from '../../../componentes/modal/Modal';
/**
 * funciones
 */
import generatePromocionesCard from './generatePromocionesCard';
import LoadBar from '../../../componentes/control/LoadBar';
/**
 * api
 */
import { GET } from '../../../utils/api';
export default class Promociones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            loadFinished: false
        };
        this.toggleModal = this.toggleModal.bind(this);

        this.actions = {
            eliminar: this.toggleModal
        };

        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
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


    componentWillUnmount() {
        console.log('eventosUnmount');
    }

    render() {
        if (this.state.data && this.state.loadFinished) {
            const promociones = generatePromocionesCard(
                this.state.data,
                this.actions
            );
            return (
                <>
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Eliminar Promocion"
                        content="¿estás seguro de eliminar esta promo?" />
                    <Titulo
                        title="Promociones"
                        links={this.props.nav.links} />
                    <div className="container">
                        <div className="row limit-height-half">
                            <div className="bold top-padding">
                                {"Mostrando " + promociones.length + " promociones encontradas"}
                            </div>
                            <ul className="nav-list no-padding">
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
