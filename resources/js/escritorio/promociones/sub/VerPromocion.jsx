/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * sub elementos
 */
import { GET } from '../../../utils/api';
import Titulo from '../../../componentes/basic/Titulo';
import {Link} from 'react-router-dom';
import { assignHorarios } from '../../eventos/sub/generateEventosCard';
import {CommaList} from '../../../componentes/basic/CommaList';
import EventosTable from '../../../componentes/tables/EventosTable'


const generateList = (list,endpoint) => {
    const eventos = Object.values(list).map(
        (e,i) => {
            const horarios = assignHorarios(e.horarios.list)[0];
            return {
                ...e,
                nombre:(
                    <Link to={"/eventos/"+e.id}>
                        {e.nombre}
                    </Link>
                ),
                horarios:<CommaList list={horarios} endpoint="/horarios"/>
            };
        }
    );
    return eventos;
};

export const singleHandler = (endpoint) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    this.setState({
                        data: response.data.promociones[0],
                        loadFinished: true
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}

export class VerPromocion extends Component {
    constructor(props){
        super(props);
        this.props.nav.buttons[0].click = this.toggleModal;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        console.log('localesUnmount');
    }

    render() {
        const eventos = generateList(this.props.data.eventos.data,'/eventos'),
            data = {...this.props.data,eventos};
        return (
            <>
                < Titulo
                    title={data.nombre}
                    links={this.props.nav.links}
                    buttons ={this.props.nav.buttons}/>
                <div className="container full-width ">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="light-danger bold">Descripción: </div>
                            <div>{data.descripcion}</div>
                        </div>
                        <div className="col-md-6">
                            <h6 className="highlight no-margin bold top-padding">Descuento:</h6>
                            <div>{data.descuento ? <>{data.descuento}<span className="bold side-margin">%</span></> : "Sin descuento"}</div>
                        </div>
                    </div>
                    <div className="row sub-title top-padding bold">
                        Eventos
                    </div>
                    <div className="row">
                        <EventosTable data={data.eventos}/>
                    </div>
                </div>
            </>
        )
    }
}
