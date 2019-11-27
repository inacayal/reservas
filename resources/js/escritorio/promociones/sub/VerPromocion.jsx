/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
/**
 * sub elementos
 */
import { GET } from '../../../utils/api';
import Titulo from '../../../componentes/basic/Titulo';
import {Link} from 'react-router-dom';
import { assignHorarios } from '../../../generators/generateEventosCard';
import {CommaList} from '../../../componentes/basic/CommaList';
import EventosTable from '../../../componentes/tables/EventosTable'


const generateList = (list) => {
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
export function VerPromocion (props) {
    props.nav.buttons[0].click = props.toggleModal;
    const eventos = generateList(props.data.eventos.data,'/eventos'),
        data = {...props.data,eventos};
    return (
        <>
            < Titulo
                title={data.nombre}
                links={props.nav.links}
                buttons ={props.nav.buttons}/>
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
