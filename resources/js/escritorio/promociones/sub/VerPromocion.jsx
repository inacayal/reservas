/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import Titulo from '../../../componentes/basic/Titulo';
import {Link} from 'react-router-dom';
import { assignHorarios } from '../../../generators/generateEventosCard';
import {CommaList} from '../../../componentes/basic/CommaList';
import EventosTable from '../../../componentes/tables/EventosTable'
import CustomLink from '../../../componentes/basic/CustomLink';

const generateList = (list) => {
    const eventos = Object.values(list).map(
        (e,i) => {
            const horarios = assignHorarios(e.horarios.list)[0];
            return {
                ...e,
                nombre:(
                    <CustomLink params={{
                                    to:`/eventos/${e.id}`,
                                    params:{id:e.id},
                                    route:'eventos'
                                }}>
                        <span className="text">
                            {e.nombre}
                        </span>
                    </CustomLink>
                ),
                horarios:(
                    <CommaList  list={horarios}
                                route='horarios'/>
                )
            }
        }
    );
    return eventos;
};
export default function VerPromocion (props) {
    props.nav.buttons[0].click = props.toggleModal;
    const   eventos = generateList(props.data.eventos.data),
            data = {...props.data,eventos};

    return (
        <>
            <Titulo title={data.nombre}
                    links={props.nav.links}
                    buttons ={props.nav.buttons}/>
            <div className="container ">
                <div className="row">
                    <div className="col-md-9">
                        <div className="mid-title">
                            Eventos
                        </div>
                        <EventosTable data={data.eventos}/>
                    </div>
                    <div className="col-md-3">
                        <div className="h-padding text-right bold sub-title">
                            {data.estado}
                        </div>
                        <div className="light-danger m-font">
                            Descripción:
                        </div>
                        <div>
                            {data.descripcion}
                        </div>
                        <h6 className="highlight no-margin m-font top-padding">
                            Descuento:
                        </h6>
                        <div>
                        {
                            data.descuento
                            ? (
                                <>{data.descuento}<span className="bold side-margin">%</span></>
                            )
                            : "Sin descuento"
                        }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
