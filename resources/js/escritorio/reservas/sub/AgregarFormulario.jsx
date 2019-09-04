/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * components
 */
import { showOptions, selectOption } from '../../../componentes/input/Select';
import Evento from '../../../reserva/pasos/Evento';
import { GET } from '../../../utils/api';
import Titulo from '../../../componentes/basic/Titulo';
import LoadBar from '../../../componentes/control/LoadBar';

export default class AgregarFormulario extends Component{
    constructor(props){
        super(props);
        this.state = {
            date:new Date(),
            loading:0,
            loadFinished:false,
            select: {
                ubicaciones: {
                    name: "ubicaciones",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {}
                },
                eventos: {
                    name: "eventos",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {}
                },
                hora: {
                    name: "hora",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {}
                },
                minuto: {
                    name: "minuto",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {}
                },
                personas: {
                    name: "personas",
                    show: false,
                    selected: null,
                    search: "",
                    input: React.createRef(),
                    list: {}
                }
            }
        };

        this.showOptions = showOptions.bind(this);
        this.selectOption = selectOption.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
        
        this.nav = [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-arrow-left inline-box side-margin" />
                        Volver a reservaciones
                    </div>
                ),
                to: '/reservas'
            }
        ];
    }

    guardarNuevaReserva() {
        console.log('guardar');
    }

    downloadHandler(pEvent) {
        let
            loading = Math.round((pEvent.loaded * 100) / pEvent.total),
            state = loading !== 100 ?
                { loading, loadFinished: false }
                : { loading, loadFinished: true };
        this.setState(state);
    }

    fetchData(date) {
        this.setState({ data:null,isLoading:true,loadFinished:false });
        const request = GET({
            endpoint: 'reservas/agregar/' + 27 + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear(),
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    let select = this.state.select,
                        data = Object.keys(response.data).reduce(
                            (p,e,i) => {
                                if(e==='horarios'){
                                    select.eventos.list = response.data[e].data[date.getDay() + 1].eventos.list;
                                }
                                if (select[e]){
                                    select[e].list = response.data[e].list;
                                }
                                p[e] = response.data[e].data||{};
                                return p;
                            },
                            {}
                        );
                    this.setState({
                        data,
                        select,
                        date,
                        isLoading:false,
                        loadFinished:true
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }

    componentDidMount() {
        this.fetchData(this.state.date);
    }

    componentWillUnmount() {
        console.log('formularioReservasUnmount');
    }

    render(){
        if (this.state.data && this.state.loadFinished){
            return (
                <>
                    <Titulo
                        title='Agregar Reservación'
                        links={this.nav} />
                    <form className="text-right">
                        <div className="container">
                            <div className="row">
                                <Evento
                                    showToggle={this.showOptions}
                                    change={this.selectOption}
                                    displayTitles={false}
                                    select = {this.state.select}
                                    current={true}
                                    fecha={this.state.date}
                                    fetch = {this.fetchData}
                                    data={this.state.data}/>
                            </div>
                        </div>
                    </form>
                </>
            );
        }
        return ( 
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}