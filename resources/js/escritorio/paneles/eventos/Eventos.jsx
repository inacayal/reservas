import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ButtonList from '../../../componentes/complex/allUse/ButtonList';
import CardList from '../../../componentes/complex/allUse/CardList';
import generateEventosCard from '../../../funciones/generateEventosCard';
import AgregarFormulario from './subElements/AgregarFormulario';
import ConfirmarModal from '../../../modal/Modal';
import Titulo from '../../../componentes/complex/allUse/Titulo';

import { formActions, formNavigation, panelNavigation } from '../../../funciones/generateActions';
export default class Eventos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formulario: false,
            agregar: null,
            editar: null,
            open:false,
            eventos: {
                1:{
                    nombre: "Cumpleaños",
                    descuento: 50,
                    promocion: "50% de descuento para el cumpleañero si reservas un fin de semana."
                },
                2:{
                    nombre: "Negocios",
                    descuento: 50,
                    promocion: "50% de descuento en bebidas si reservas antes de las 21hs."
                },
                3:{
                    nombre: "Amigos",
                    descuento: 10,
                    promocion: "10% de descuento en comidas compartidas si reservas antes de las 18hs."
                }
            }
        };

        this.agregarEvento = this.agregarEvento.bind(this);
        this.editarEvento = this.editarEvento.bind(this);
        this.eliminarEvento = this.eliminarEvento.bind(this);
        this.verEventos = this.verEventos.bind(this);

        this.editAddControls = panelNavigation(this.verEvento, this.agregarEvento);
        this.formNavigation = formNavigation(this.verEventos, this.eliminarEvento);
        this.formActions = formActions(this.verEventos, this.guardarEvento);

        this.closeModal = this.closeModal.bind(this);
        this.actions = {
            agregar: this.agregarEvento,
            editar: this.editarEvento,
            eliminar: this.eliminarEvento
        };
    }

    closeModal(e) {
        this.setState({ open: false });
    }

    agregarEvento(e) {
        let id = e.currentTarget.getAttribute('data');
        this.setState({ agregar: id, editar: null, formulario: true });
    }

    editarEvento(e) {
        let id = e.currentTarget.getAttribute('data');
        this.setState({ agregar: null, editar: id, formulario: true });
    }

    verEventos(e) {
        e.preventDefault();
        this.setState({ agregar: null, editar: null, formulario: false })
    }

    eliminarEvento(e) {
        e.preventDefault();
        this.setState({
            open: true
        })
    }

    render() {
        const eventos = generateEventosCard(
                this.state.eventos,
                this.actions
            ), 
            controls = this.state.formulario ?
                this.state.editar ?
                    this.formNavigation
                    : [this.formNavigation[0]]
                : [this.editAddControls[1]];
        return (
            <div className={this.props.panel ? "container" : "hidden"}>
                <Titulo
                    title="Eventos"
                    navigation={controls} />
                <ConfirmarModal
                    open={this.state.open}
                    closeModal={this.closeModal}
                    title="Eliminar Evento"
                    content="¿estás seguro de eliminar este evento? " />
                <div className={this.state.formulario ? "hidden" : "row" }>
                    <CardList
                        displayList="full-width nav-list no-padding"
                        elems={eventos} />
                </div>
                <div className={this.state.formulario ?  "row" : "hidden"}>
                    <AgregarFormulario
                        title={
                            this.state.editar ?
                                "Editar " + this.state.eventos[this.state.editar].nombre
                                : "Agregar evento"
                        }
                        formActions={this.formActions}
                        show={this.state.formulario}
                        data={this.state.eventos}
                        editar={this.state.editar}
                        agregar={this.state.agregar} />
                </div>
            </div>
        );
    }
}
