import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import CardList from '../../../componentes/complex/allUse/CardList';
import generateUbicacionesCard from '../../../funciones/generateUbicacionesCard';
import AgregarFormulario from './subElements/AgregarFormulario';
import { formActions, formNavigation, panelNavigation} from '../../../funciones/generateActions';
import ButtonList from '../../../componentes/complex/allUse/ButtonList';
import ConfirmarModal from '../../../modal/Modal';
export default class Ubicaciones extends Component {
    constructor(props){
        super(props);
        this.state = {
            formulario:false,
            agregar:null,
            editar:null,
            open:false,
            ubicaciones: {
                1:{
                    nombre: "Salón",
                    descripcion:"Salón principal",
                    capacidad: 32
                },
                2:{
                    nombre: "Terraza",
                    descripcion: "techada con jardín",
                    capacidad: 10
                },
                3:{
                    nombre: "Vereda",
                    descripcion: "mesas espaciosas al aire libre",
                    capacidad: 16
                }
            }
        };

        this.agregarUbicacion = this.agregarUbicacion.bind(this);
        this.editarUbicacion = this.editarUbicacion.bind(this);
        this.verUbicaciones = this.verUbicaciones.bind(this);
        this.guardarUbicacion = this.guardarUbicacion.bind(this);
        this.eliminarUbicacion = this.eliminarUbicacion.bind(this),
        this.closeModal = this.closeModal.bind(this);

        this.editAddControls = panelNavigation(this.verUbicaciones,this.agregarUbicacion);
        this.formNavigation = formNavigation(this.verUbicaciones, this.eliminarUbicacion);
        this.formActions = formActions(this.verUbicaciones, this.guardarUbicacion);
        this.actions = {
            agregar: this.agregarUbicacion,
            editar: this.editarUbicacion,
            eliminar: this.eliminarUbicacion
        };
    }

    guardarUbicacion(e) {
        console.log('culo');
    }

    agregarUbicacion(e){
        let id = e.currentTarget.getAttribute('data');
        this.setState({agregar:id,editar:null,formulario:true});
    }

    closeModal(e) {
        this.setState({ open: false });
    }

    eliminarUbicacion(e) {
        e.preventDefault();
        this.setState({
            open: true
        })
    }

    editarUbicacion(e) {
        let id = e.currentTarget.getAttribute('data');
        this.setState({ agregar: null, editar: id, formulario: true });
    }

    verUbicaciones(e){
        e.preventDefault();
        this.setState({ agregar: null, editar: null, formulario: false })
    }

    render(){
        let ubicaciones = generateUbicacionesCard(
            this.state.ubicaciones,
            this.actions
        );
        
        return (
            <div className={this.props.panel ? "container" : "hidden"}>
                <div className={this.state.formulario ? "hidden" : "row"}>
                    <div className="small-v-padding box-transparent h-padding highlight-title full-width text-left c-title">Ubicaciones</div>
                    <ButtonList
                        displayList="flex-row nav-list no-padding inline-block  align-center"
                        container="side-margin inline-block"
                        elems={this.state.editar ? this.editAddControls : [this.editAddControls[1]]} />
                    <div className="container">
                        <div className="row">
                            <CardList
                                displayList="full-width nav-list no-padding"
                                elems={ubicaciones} />
                        </div>
                        <div className="row">
                            <ConfirmarModal
                                open={this.state.open}
                                closeModal={this.closeModal}
                                title="Eliminar Ubicación"
                                content="¿estás seguro de eliminar este ubicación?" />
                        </div>
                    </div>
                </div>
                <div className={this.state.formulario ? "row" : "hidden"}>
                    <AgregarFormulario
                        title={
                            this.state.editar ? 
                                "Editar " + this.state.ubicaciones[this.state.editar].nombre
                            :"Agregar ubicación"
                        }
                        formActions={this.formActions}
                        formNavigation={this.formNavigation}
                        show={this.state.formulario}
                        data={this.state.ubicaciones}
                        editar={this.state.editar}
                        agregar={this.state.agregar}/>
                </div>
            </div>
        );
    }
}
