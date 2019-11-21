/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
/**
 * sub elementos
 */
import { GET } from '../../../utils/api';
/**
 * basic
 */
import Titulo from '../../../componentes/basic/Titulo';
import { assignHorarios } from './generateEventosCard';
import {CommaList} from '../../../componentes/basic/CommaList';
import PromocionesTable from '../../../componentes/tables/PromocionesTable';


export function VerEvento (props) {
    props.nav.buttons[0].click = props.toggleModal;
    const data = props.data,
        promociones = Object.values(data.promociones.data),
        horarios = Object.values(data.horarios.list),
        feriados = Object.values(data.feriados.list);
    return (
        <>
            <Titulo
                title={data.nombre}
                links={props.nav.links}
                buttons ={props.nav.buttons}/>
            <div className="row">
                <div className="col-md-3 light-danger bold">Descripción: </div>
                <div className="col-md-9">{data.descripcion}</div>
            </div>
            <div className="row v-padding">
                <div className="col-md-6">
                    <h6 className="highlight no-margin bold v-padding">Horarios</h6>
                    {
                        horarios.length>0
                        ?
                            <ul className="nav-list no-padding">
                                <CommaList list={assignHorarios(data.horarios.list)[0]} endpoint='/horarios'/>
                            </ul>
                        :
                            "No hay horarios asociados"
                    }
                </div>
                <div className="col-md-6">
                    <h6 className="highlight bold">Feriados</h6>
                    {
                        feriados.length>0
                        ?
                            <ul className="nav-list no-padding">
                                <CommaList list={data.feriados.list} endpoint='/feriados'/>
                            </ul>
                        :
                            <div className="bold">No hay feriados asociados</div>
                    }
                </div>
            </div>
            <div className="row v-padding">
                <div className="col-md-12">
                    <div className="sub-title bold">Promociones</div>
                    {
                        promociones.length>0
                        ?
                            <PromocionesTable data={promociones}/>
                        :
                        <div className="bold h-padding">No hay promociones asociadas</div>
                    }
                </div>
            </div>
        </>
    );
}
