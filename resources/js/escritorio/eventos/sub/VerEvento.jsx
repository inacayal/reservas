/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
/**
 * sub elementos
 */
import LoadBar from '../../../componentes/control/LoadBar';
import { GET } from '../../../utils/api';
/**
 * basic
 */
import { Navegacion } from '../Navegacion';
import Titulo from '../../../componentes/basic/Titulo';
import { assignHorarios } from './generateEventosCard';

const generateLinks =  (list,endpoint) => {
    return Object.keys(list).map(
        (e,i) => 
            <li 
                key={i}
                className="bold highlight-title inline-block side-margin small-v-margin smaller-text button-border border-box">
                <Link to={endpoint+'/'+e}>
                    {list[e]}
                </Link>
            </li>
    )
}
export default class VerEvento extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadFinished: false,
            data: null,
            open: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
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
            endpoint: '/eventos/single/27/'+this.props.match.params.id,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.eventos[0] });
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
        console.log('localesUnmount');
    }

    render() {
        if (this.state.data && this.state.loadFinished) {
            const data = this.state.data,
                nav = Navegacion.singular(data),
                promociones = generateLinks(data.promociones.list,'/promociones'),
                horario = generateLinks(assignHorarios(data.horarios.list)[0],'/horarios'),
                feriados = generateLinks(data.feriados.list,'/feriados');
            return (
                <div className="container">
                    < Titulo
                        title={"Viendo Evento " + data.nombre}
                        links={nav.links}
                        buttons ={nav.buttons}/>
                    <div className="container full-width v-padding">
                        <div className="row v-padding">
                            <div className="row v-padding" style={{paddingLeft:"28px"}}>
                                <span className="light-danger bold side-margin">Descripción: </span>
                                <span className="side-margin">{data.descripcion}</span>
                            </div>
                        </div>
                        <div className="row v-padding">
                            <div className="col-md-4">
                                <h6 className="highlight no-margin bold">Promociones</h6>
                                {
                                    promociones.length>0
                                    ?
                                        <ul className="nav-list no-padding">
                                            {promociones}
                                        </ul>
                                    :
                                        "No hay promociones asociadas"
                                }
                            </div>
                            <div className="col-md-4">
                                <h6 className="highlight no-margin bold">Horarios</h6>
                                {
                                    horario.length>0
                                    ?
                                        <ul className="nav-list no-padding">
                                            {horario}
                                        </ul>
                                    :
                                        "No hay horarios asociados"
                                }
                            </div>
                            <div className="col-md-4">
                                <h6 className="highlight no-margin bold">Feriados</h6>
                                {
                                    feriados.length>0
                                    ?
                                        <ul className="nav-list no-padding">
                                            {feriados}
                                        </ul>
                                    :
                                        "No hay feriados asociados"
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        );
    }
}

