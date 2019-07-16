import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '../../../componentes/basic/Button';
import CardList from '../../../componentes/complex/allUse/CardList';
import generateUbicacionesCard from '../../../funciones/generateUbicacionesCard';
export default class Ubicaciones extends Component {
    constructor(props){
        super(props);
        this.state = {
            ubicaciones: [
                {
                    id: 1,
                    nombre: "Salón",
                    descripcion:"Salón principal",
                    capacidad: 32
                },
                {
                    id: 2,
                    nombre: "Terraza",
                    descripcion: "techada con jardín",
                    capacidad: 10
                },
                {
                    id:3,
                    nombre: "Vereda",
                    descripcion: "mesas espaciosas al aire libre",
                    capacidad: 16
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
    agregar(e){

    }
    
    eliminar(e) {

    }

    editar(e) {

    }
    render(){
        let ubicaciones = generateUbicacionesCard(
            this.state.ubicaciones,
            this.actions
        );
        return (
            <div className={this.props.panel ? "container" : "hidden"}>
                <Button
                    title={(
                        <div className="smaller-text text bold">
                            <i className="fas fa-plus-circle inline-box side-margin" />
                            Agregar ubicaciones
                        </div>
                    )}
                    click={this.agregar}
                    class="box-transparent highlight-hover border-box button-border inline-block"
                    disabled={false} />
                <div className="container">
                    <CardList 
                        displayList="row h-align-center full-width nav-list no-padding"
                        elems={ubicaciones}/>
                </div>
            </div>
        );
    }
}
