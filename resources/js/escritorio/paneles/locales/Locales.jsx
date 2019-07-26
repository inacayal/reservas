/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * react table
 */
import ReactTable from 'react-table';
import "react-table/react-table.css";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
/**
 * componentes
 */
import Titulo from '../../../componentes/basic/Titulo';
import ButtonList from '../../../componentes/basic/ButtonList';
import {closeModal,ConfirmarModal} from '../../../componentes/modal/Modal';
/**
 * sub elementos
 */
import AgregarLocal from './subElements/AgregarLocal';
import VerLocal from './subElements/VerLocal';
/**
 * funciones
 */
import {onTextChange} from '../../../componentes/input/Text'
import {showOptions,selectOption} from '../../../componentes/input/Select'
import { formActions, formNavigation, panelNavigation } from '../../../funciones/dataActions';
export default class Locales extends Component {
    constructor(props){
        super(props);
        this.state={
            open:false,
            formulario:false,
            verLocal:false,
            hideColumns:[],
            text:{
                nombre:"",
                email:"",
                password:"",
                direccion:""
            },
            select:{
                provincia:{
                    name: "provincia",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {
                        0:"CABA",
                        1:"Buenos Aires",
                        2:"Cordoba",
                        3:"Santa fe"
                    }
                }
            },
            locales:{
                0:{
                    nombre:"Palermo Viejo",
                    email:"pásdopoasid@aklsdjalskjd.com",
                    razonSocial:"Bolsa de gatos SAS",
                    telefono: "8794531136",
                    provincia:"CABA",
                    cuitCuil:"656466542313",
                    direccion: "kahdkasjldhlkajsdhaksjdhaskdja",
                    administrador:"Jose Luis Rodriguez",
                    correoAdmin:"aspodasid@inacayal.com.ar",
                    telAdmin:"564687987",
                    estado: "1"
                },
                12:{
                    nombre: "Cañitas",
                    email:"askldalskjd@alksdjaklsjd.com",
                    razonSocial: "Razon Social 15",
                    telefono: "8798495",
                    provincia: "CABA",
                    cuitCuil: "656466542313",
                    direccion: "kahdkasjldhlkajsdhaksjdhaskdja",
                    administrador: "Maria Mora",
                    correoAdmin:"adlaksjd@lkasdk.com",
                    telAdmin:"7+97131321,",
                    estado: "1"
                },
                25:{
                    nombre: "Palermo Soho",
                    email:"alsdkasñlkd@aklsjdlaksd.com",
                    razonSocial: "Razon Social 25",
                    telefono:"46768798",
                    provincia: "CABA",
                    cuitCuil: "656466542313",
                    direccion: "kahdkasjldhlkajsdhaksjdhaskdja",
                    administrador: "Andres Galarraga",
                    correoAdmin:"aksdjaskljd@hotmail.com",
                    telAdmin:"5468798641531",
                    estado: "1"
                },
                13:{
                    nombre: "Recoleta",
                    email:"opwqepoqwei@askljdaslk.com",
                    razonSocial: "Razon Social 13",
                    telefono: "798712",
                    provincia: "CABA",
                    cuitCuil: "656466542313",
                    direccion:"kahdkasjldhlkajsdhaksjdhaskdja",
                    administrador: "Pedro Benitez",
                    correoAdmin:"asdlasdjlasd@yahoo.com",
                    telAdmin:"98741654",
                    estado: "1"
                },
                48: {
                    nombre: "Balvanera",
                    email:"añlskdlñasd@aslkdjaslkd.com",
                    razonSocial: "Razon Social 48",
                    telefono:"1654654665",
                    provincia: "CABA",
                    cuitCuil: "656466542313",
                    direccion: "kahdkasjldhlkajsdhaksjdhaskdja",
                    administrador: "Andres Peña",
                    correoAdmin:"bljklaksjld@inacayal.com",
                    telAdmin:"668798798",
                    estado: "1"
                }
            }
        }
        this.verLocales = this.verLocales.bind(this);
        this.showSingleLocal = this.showSingleLocal.bind(this);
        this.agregarLocal = this.agregarLocal.bind(this);
        this.guardarNuevoLocal = this.guardarNuevoLocal.bind(this);
        
        this.closeModal = closeModal.bind(this); 
        this.onTextChange = onTextChange.bind(this);
        this.showOptions = showOptions.bind(this);
        this.selectOption = selectOption.bind(this);
        
        this.panelNavigation = panelNavigation(this.verLocales,this.agregarLocal);
        this.formActions = formActions(this.verLocales,this.guardarNuevoLocal);

        this.columns = [
            {
                Header: "Nombre",
                accessor: "nombre",
                headerClassName: 'bold highlight-title',
                fixed: "left"
            },
            {
                Header: "Provincia",
                accessor: "provincia",
                headerClassName: 'bold highlight-title',
                fixed: "left"
            },
            {
                Header: "Dirección",
                accessor: "direccion",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Razón Social",
                accessor: "razonSocial",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Teléfono",
                accessor: "telefono",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "CUIT / CUIL",
                accessor: "cuitCuil",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Administrador",
                accessor: "administrador",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Correo del administrador",
                accessor: "correoAdmin",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Teléfono del administrador",
                accessor: "telAdmin",
                headerClassName: 'bold highlight-title'
            },
            {
                Header: "Estado",
                accessor: "estado",
                headerClassName: 'bold highlight-title'
            }, 
            {
                Header: "Acciones",
                accessor: "acciones",
                className: "text-right",
                headerClassName: 'bold highlight-title',
                fixed: "right"
            }
        ];
    }

    verLocales(e) {
        e.preventDefault();
        this.setState({ formulario: false,verLocal:false });
    }

    agregarLocal(e) {
        e.preventDefault();
        this.setState({formulario:true,verLocal:false});
    }

    showSingleLocal(e) {
        e.preventDefault();
        const local = e.currentTarget.getAttribute('data');
        this.setState({formulario:false,verLocal:local})
    }

    guardarNuevoLocal(e){
        e.preventDefault();
        console.log('guardar');
    }

    generateActionsForElement(elem){
        return[
            {
                title:(
                    <div className="smaller-text text bold text-center">
                        <i className="fas fa-eye"/>
                        Ver 
                    </div>
                ),
                data:elem,
                class:"box-transparent highlight-hover border-box button-border inline-block smaller-text",
                click:this.showSingleLocal
            }
        ]
    }

    shouldComponentUpdate(nextProps) {
        return this.props.panel || nextProps.panel;
    }

    render(){
        const controls = this.state.formulario ?
            [this.panelNavigation[0]] 
            : this.state.verLocal ?
                this.panelNavigation
                : [this.panelNavigation[1]],
            columns = this.columns,
            data = Object.keys(this.state.locales).map(
                e=>({
                        ...this.state.locales[e],
                        acciones: <ButtonList
                            displayList="flex-row nav-list no-padding inline-block  align-center"
                            container="side-margin inline-block"
                            elems={this.generateActionsForElement(e)} />
                    })
            ),
            ReactTableFixedColumns = withFixedColumns(ReactTable);
        return (
            <div className={(this.props.panel) ? "full-width container" : "hidden"}>
                <Titulo
                    title="Locales"
                    navigation={controls}/>
                <ConfirmarModal
                    open={this.state.open}
                    closeModal={this.closeModal}
                    title="props.title"
                    content="props.content"/>
                <div className={this.state.formulario || this.state.verLocal ? "hidden" : "row full-width"}>
                    <ReactTableFixedColumns
                        data={data}
                        columns={columns}
                        minRows={0}
                        previousText= {
                            <div>
                                <i className="line-v-middle highlight middle-font fas fa-angle-left" />
                                <span className="text ">Anterior</span>
                            </div>
                        }
                        nextText= {
                            <div>
                                <span className="text ">Siguiente</span>
                                <i className="line-v-middle highlight middle-font fas fa-angle-right" />
                            </div>
                        }
                        pageText = 'Página'
                        ofText= 'de'
                        rowsText= 'filas'/>
                </div>
                <div className={this.state.formulario ? "row" : "hidden"}>
                    <AgregarLocal 
                        onTextChange={this.onTextChange}
                        text = {this.state.text}
                        select={this.state.select}
                        selectOption={this.selectOption}
                        showOptions={this.showOptions}
                        formActions={this.formActions}/>
                </div>
                <div className={this.state.verLocal ? "row" : "hidden"}>
                    <VerLocal 
                        elem={this.state.verLocal ? this.state.locales[this.state.verLocal] : null}/>
                </div>
            </div>
        )
    }
}
