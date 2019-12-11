/**
 * react basic
 */
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import CustomLink from '../../../componentes/basic/CustomLink';
import Titulo from '../../../componentes/basic/Titulo';
import { assignHorarios } from '../../../generators/generateEventosCard';
import {CommaList} from '../../../componentes/basic/CommaList';
import PromocionesTable from '../../../componentes/tables/PromocionesTable';
import {createFeriadosList} from '../../../utils/Helper';


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
            feriados = createFeriadosList(data.feriados.data);
    return (
        <>
            <Titulo title={data.nombre}
                    links={props.nav.links}
                    buttons ={props.nav.buttons}/>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="mid-title">
                        Promociones
                    </div>
                    {
                        promociones.length>0
                        ?
                            <PromocionesTable data={promociones}/>
                        :
                            <div className="bold h-padding">
                                No hay promociones asociadas
                            </div>
                    }
                </div>
                <div className="col-md-4">
                    <div className="bold m-font text-right">
                        {data.estado}
                    </div>
                    <div className="m-font highlight">
                        Descripción:
                    </div>
                    <div style={{wordBreak:"break-word"}}>
                        {data.descripcion}
                    </div>
                    <div>
                        <h6 className="highlight no-margin m-font v-padding">
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
                        <h6 className="highlight m-font">
                            Feriados
                        </h6>
                        {
                            Object.values(feriados).length>0
                            ?
                                <ul className="nav-list no-padding">
                                    <CommaList list={feriados} route='horarios/feriados'/>
                                </ul>
                            :
                                <div className="bold">
                                    No hay feriados asociados
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
