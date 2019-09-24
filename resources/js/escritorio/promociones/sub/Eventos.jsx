/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
import {CardList} from '../../../componentes/basic/CardList';
import { closeModal, ConfirmarModal } from '../../../componentes/modal/Modal';
/**
 * funciones
 */
import generateEventosCard from './generateEventosCard';

export default class EventosRouting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventos: {
                1: {
                    nombre: "Cumpleaños",
                    descuento: 50,
                    promocion: "50% de descuento para el cumpleañero si reservas un fin de semana."
                },
                2: {
                    nombre: "Negocios",
                    descuento: 50,
                    promocion: "50% de descuento en bebidas si reservas antes de las 21hs."
                },
                3: {
                    nombre: "Amigos",
                    descuento: 10,
                    promocion: "10% de descuento en comidas compartidas si reservas antes de las 18hs."
                }
            }
        };

        this.eliminarEvento = this.eliminarEvento.bind(this);
        this.closeModal = closeModal.bind(this);

        this.actions = {
            agregar: this.agregarEvento,
            editar: this.editarEvento,
            eliminar: this.eliminarEvento
        };
        this.nav = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-plus-circle inline-box side-margin" />
                        Agregar nuevo
                    </div>
                ),
                to: '/eventos/agregar'
            }
        ];
        
    }

    eliminarEvento(e) {
        e.preventDefault();
        this.setState({
            open: true
        })
    }

    componentDidMount() {
        console.log('eventosMount');
    }

    componentWillUnmount() {
        console.log('eventosUnmount');
    }

    render() {
        const eventos = generateEventosCard(
            this.props.data,
            this.actions
        );
        return (
            <>
                <Titulo
                    title="Eventos"
                    links={this.nav} />
                <div className="container">
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.closeModal}
                        title="Eliminar Evento"
                        content="¿estás seguro de eliminar este evento? " />
                    <div className={this.state.formulario ? "hidden" : "row"}>
                        <CardList
                            displayList="full-width nav-list no-padding"
                            elems={eventos} />
                    </div>
                </div>
            </>
        );
    }
}
