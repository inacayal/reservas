/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
import {Link} from 'react-router-dom';
import { assignHorarios } from '../../eventos/sub/generateEventosCard';
import {generateLinks} from '../../eventos/sub/VerEvento';

const generateList = (list,endpoint) => {
    const eventos = Object.values(list).map(
        (e,i) => {
            const horarios = assignHorarios(e.horarios.list)[0];
            return (
                <li 
                    key={i}
                    className="small-v-margin smaller-text">
                    <Link to={endpoint+'/'+e.id}>
                        {e.nombre}
                    </Link>
                    <div>{e.descripcion}</div>
                    <div>
                        <span className="side-margin bold">Horarios:</span>
                        <span className="side-margin">
                            <ul className="nav-list side-margin inline-block no-padding">
                                {generateLinks(horarios,'/horarios')}
                            </ul>
                        </span>
                    </div>
                </li>
            )
        }
    );
    return eventos;
};

export default class VerLocal extends Component {
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
            endpoint: '/promociones/single/27/'+this.props.match.params.id,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    this.setState({ data: response.data.promociones[0] });
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
                eventos = generateList(data.eventos.data,'/eventos');
            return (
                <div className="container">
                    < Titulo
                        title={data.nombre}
                        links={nav.links}
                        buttons ={nav.buttons}/>
                    <div className="container full-width">
                        <div className="row v-padding">
                            <div className="col-md-7">
                                <h6 className="highlight no-margin bold">Eventos</h6>
                                {
                                    eventos.length>0
                                    ?
                                        <ul className="nav-list h-padding">
                                            {eventos}
                                        </ul>
                                    :
                                        "No hay eventos asociados"
                                }
                            </div>
                            <div className="col-md-5">
                                <div className="light-danger bold">Descripción: </div>
                                <div className="h-padding">{data.descripcion}</div>
                                <h6 className="highlight no-margin bold top-padding">Descuento:</h6>
                                <div className="h-padding">{data.descuento+"%"}</div>
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

