import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../../../componentes/basic/Button';
import CardList from '../../../componentes/complex/allUse/CardList';
import generateEventosCard from '../../../funciones/generateEventosCard';
export default class Eventos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventos: [
                {
                    id: 1,
                    nombre: "Cumpleaños",
                    descripcion: "",
                    promocion: "50% de descuento para el cumpleañero si reservas un fin de semana."
                },
                {
                    id: 2,
                    nombre: "Negocios",
                    descripcion: "",
                    promocion: "50% de descuento en bebidas si reservas antes de las 21hs."
                },
                {
                    id: 3,
                    nombre: "Amigos",
                    descripcion: "",
                    promocion: "10% de descuento en comidas compartidas si reservas antes de las 18hs."
                }
            ]
        };

        this.agregar = this.agregar.bind(this);
        this.editar = this.editar.bind(this);
        this.eliminar = this.eliminar.bind(this);

        this.actions = {
            agregar: this.agregar,
            editar: this.editar,
            eliminar: this.eliminar
        };
    }
    agregar(e) {

    }

    eliminar(e) {

    }

    editar(e) {

    }
    render() {
        let eventos = generateEventosCard(
            this.state.eventos,
            this.actions
        );
        return (
            <div className={this.props.panel ? "container" : "hidden"}>
                <Button
                    title={(
                        <div className="smaller-text text bold">
                            <i className="fas fa-plus-circle inline-box side-margin" />
                            Agregar Eventos
                        </div>
                    )}
                    click={this.agregar}
                    class="box-transparent highlight-hover border-box button-border inline-block"
                    disabled={false} />
                <div className="container">
                    <CardList
                        displayList="row h-align-center full-width nav-list no-padding"
                        elems={eventos} />
                </div>
            </div>
        );
    }
}
