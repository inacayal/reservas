/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CustomLink from '../../../componentes/basic/CustomLink';
import Titulo from '../../../componentes/basic/Titulo';
import { assignHorarios } from '../../../generators/generateEventosCard';
import {CommaList} from '../../../componentes/basic/CommaList';
import PromocionesTable from '../../../componentes/tables/PromocionesTable';


export function VerEvento (props) {
    props.nav.buttons[0].click = props.toggleModal;
    const   data = props.data,
            promociones = Object.values(data.promociones.data).map(
                e => ({
                    ...e,
                    nombre:(
                        <CustomLink params={{
                                        to:`/promociones/${e.id}`,
                                        params:{id:e.id},
                                        route:'promociones'
                                    }}>
                            <span className="text">
                                {e.nombre}
                            </span>
                        </CustomLink>
                    )
                })
            ),
            horarios = Object.values(data.horarios.list),
            feriados = Object.values(data.feriados.list);
    return (
        <>
            <Titulo title={data.nombre}
                    links={props.nav.links}
                    buttons ={props.nav.buttons}/>
            <div className="row justify-content-center">
                <div className="col-md-11 container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mid-font highlight">
                                Descripción:
                            </div>
                            <div className="top-padding">
                                {data.descripcion}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <h6 className="highlight no-margin mid-font v-padding">
                                    Horarios
                                </h6>
                                {
                                    horarios.length>0
                                    ?
                                        <ul className="nav-list no-padding">
                                            <CommaList list={assignHorarios(data.horarios.list)[0]} route='horarios'/>
                                        </ul>
                                    :
                                        "No hay horarios asociados"
                                }
                            </div>
                            <div className="top-padding">
                                <h6 className="highlight mid-font">
                                    Feriados
                                </h6>
                                {
                                    feriados.length>0
                                    ?
                                        <ul className="nav-list no-padding">
                                            <CommaList list={data.feriados.list} route='horarios/feriados'/>
                                        </ul>
                                    :
                                        <div className="bold">No hay feriados asociados</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row v-padding h-padding">
                <div className="col-md-12">
                    <div className="sub-title">Promociones</div>
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
