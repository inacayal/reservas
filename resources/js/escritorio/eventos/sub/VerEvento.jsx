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
import Titulo from '../../../componentes/basic/Titulo';
import { assignHorarios } from './generateEventosCard';
import {ConfirmarModal} from '../../../componentes/modal/Modal';

export const generateLinks =  (list,endpoint) => {
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
};
const generateList = (list,endpoint) => {
    return Object.keys(list).map(
        (e,i) =>
            <li
                key={i}
                className="small-v-margin smaller-text">
                <Link to={endpoint+'/'+e}>
                    {list[e].nombre}
                </Link>
                <div>{list[e].descripcion}</div>
                <div className="bold text-right">{list[e].descuento ? list[e].descuento+"% de descuento" : "sin descuento"}</div>
            </li>
    )
};
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
        this.toggleModal = this.toggleModal.bind(this);
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
                    console.log(error)
                }
            );
    }

    toggleModal(e) {
        e.preventDefault();
        this.setState({
            open: !this.state.open
        })
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
                promociones = generateList(data.promociones.data,'/promociones'),
                horario = generateLinks(assignHorarios(data.horarios.list)[0],'/horarios'),
                feriados = generateLinks(data.feriados.list,'/feriados');
            this.props.nav.buttons[0].click = this.toggleModal;
            return (
                <div className="container">
                    <ConfirmarModal
                        open={this.state.open}
                        closeModal={this.toggleModal}
                        title="Eliminar Evento"
                        content="¿estás seguro de eliminar este evento?" />
                    <Titulo
                        title={data.nombre}
                        links={this.props.nav.links}
                        buttons ={this.props.nav.buttons}/>
                    <div className="container full-width">
                        <div className="row">
                            <div className="col-md-9 container no-margin">
                                <div className="row">
                                    <div className="col-md-3 light-danger bold">Descripción: </div>
                                    <div className="col-md-9">{data.descripcion}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row v-padding">
                            <div className="col-md-7">
                            <h6 className="highlight no-margin bold">Promociones</h6>
                                {
                                    promociones.length>0
                                    ?
                                        <ul className="nav-list h-padding">
                                            {promociones}
                                        </ul>
                                    :
                                        "No hay promociones asociadas"
                                }
                            </div>
                            <div className="col-md-5 container">
                                <div className="row h-padding">
                                    <h6 className="highlight no-margin bold v-padding">Horarios</h6>
                                    <div>
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
                                </div>
                                <div className="row v-padding">
                                    <div className="col-md-12 v-padding">
                                        <h6 className="highlight bold">Feriados</h6>
                                        {
                                            feriados.length>0
                                            ?
                                                <ul className="nav-list no-padding">
                                                    {feriados}
                                                </ul>
                                            :
                                                <div>No hay feriados asociados</div>
                                        }
                                    </div>
                                </div>
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
