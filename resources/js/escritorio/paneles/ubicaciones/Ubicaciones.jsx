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
import {ConfirmarModal,closeModal} from '../../../componentes/modal/Modal';
/**
 * funciones
 */
import generateUbicacionesCard from './procedures/generateUbicacionesCard';
import { formActions, formNavigation, panelNavigation } from '../../../funciones/dataActions';
/**
 * sub elementos
 */
import AgregarFormulario from './subElements/AgregarFormulario';
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

        this.closeModal = closeModal.bind(this);

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

    componentDidMount() {
        console.log('ubicacionesMount');
    }

    componentWillUnmount() {
        console.log('ubicacionesUnmount');
    }

    shouldComponentUpdate(nextProps) {
        return this.props.panel || nextProps.panel;
    }
    
    render(){
        const ubicaciones = generateUbicacionesCard(
                this.state.ubicaciones,
                this.actions
            ),
            controls = this.state.formulario?
                this.state.editar ? 
                    this.formNavigation
                : [this.formNavigation[0]]
            : [this.editAddControls[1]];
        return (
            <div className={this.props.panel ? "container" : "hidden"}>
                <Titulo
                    title="Ubicaciones"
                    navigation={controls} />
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
                <div className={this.state.formulario ? "row" : "hidden"}>
                    <AgregarFormulario
                        title={
                            this.state.editar ? 
                                "Editar " + this.state.ubicaciones[this.state.editar].nombre
                            :"Agregar ubicación"
                        }
                        formActions={this.formActions}
                        show={this.state.formulario}
                        data={this.state.ubicaciones}
                        editar={this.state.editar}
                        agregar={this.state.agregar}/>
                </div>
            </div>
        );
    }
}
