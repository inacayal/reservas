/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
import CardList from '../../../componentes/basic/CardList';
import ButtonList from '../../../componentes/basic/ButtonList';
import { ConfirmarModal, closeModal } from '../../../componentes/modal/Modal';
/**
 * funciones
 */
import generateUbicacionesCard from './generateUbicacionesCard';
import { formActions, formNavigation, panelNavigation } from '../../../funciones/dataActions';

export default class UbicacionesRouting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.eliminarUbicacion = this.eliminarUbicacion.bind(this),
        this.closeModal = closeModal.bind(this);

        this.actions = {
            agregar: this.agregarUbicacion,
            editar: this.editarUbicacion,
            eliminar: this.eliminarUbicacion
        };
    }

    eliminarUbicacion(e) {
        e.preventDefault();
        this.setState({
            open: true
        })
    }

    render() {
        const ubicaciones = generateUbicacionesCard(
            this.props.data,
            this.actions
        );
        return (
            <div className="container">
                <Titulo
                    title="Ubicaciones"
                    navigation={[]} />
                <ConfirmarModal
                    open={this.state.open}
                    closeModal={this.closeModal}
                    title="Eliminar Ubicación"
                    content="¿estás seguro de eliminar este ubicación?" />
                <div className={this.state.formulario ? "hidden" : "row"}>
                    <CardList
                        displayList="full-width nav-list no-padding"
                        elems={ubicaciones} />
                </div>
            </div>
        );
    }
}
