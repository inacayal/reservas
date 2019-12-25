import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import CustomLink from '../../../componentes/basic/CustomLink';
import Titulo from '../../../componentes/basic/Titulo';
import {DAYS} from '../../../constantes/DaysMonths';
import {CommaList} from '../../../componentes/basic/CommaList';
import EventosTable from '../../../componentes/tables/EventosTable';

export function VerHorario (props) {
    props.nav.buttons[0].click = props.toggleModal;
    const   data = props.data,
            estado = data.estado.replace('_',' '),
            eventos = Object.values(data.eventos.data).map(
                e => ({
                    ...e,
                    nombre: (
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
                    promociones:(
                        <CommaList  list={e.promociones.list}
                                    route={'promociones'}/>
                    )
                })
            );

    return (
        <>
            <Titulo title={`Horario del ${DAYS[data.diaSemana-1]}`}
                    links={props.nav.links}
                    buttons={props.nav.buttons} />
            <div className="container">
                <div className="row bold sub-title justify-content-end">
                    {`día ${estado}`}
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-5 container-fluid">
                        <div className="sub-title row light-danger">
                            Horario de atención:
                        </div>
                        <div className="row">
                            <div className="col-md-5 no-padding">
                                <span className="mid-font side-margin bold">
                                    Apertura:
                                </span>
                                <span className="side-margin">
                                    {`${data.apertura.atencion.hora}:${data.apertura.atencion.minuto} horas`}
                                </span>
                            </div>
                            <div className="col-md-6">
                                <span className="mid-font side-margin bold">
                                    Cierre:
                                </span>
                                <span className="side-margin">
                                    {`${data.cierre.atencion.hora}:${data.cierre.atencion.minuto} horas`}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 container-fluid">
                        <div className="row sub-title light-danger">
                            Horario de reservas:
                        </div>
                        <div className="row">
                            <div className="col-md-6 no-padding">
                                <span className="mid-font side-margin bold">
                                    Apertura:
                                </span>
                                <span className="side-margin">
                                    {`${data.apertura.reserva.hora}:${data.apertura.reserva.minuto} horas`}
                                </span>
                            </div>
                            <div className="col-md-6">
                                <span className="mid-font side-margin bold">
                                    Cierre:
                                </span>
                                <span className="side-margin">
                                    {`${data.cierre.reserva.hora}:${data.cierre.reserva.minuto} horas`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row v-padding justify-content-center">
                    <div className="col-md-12 top-padding">
                        <h6 className="sub-title">
                            Eventos
                        </h6>
                        {
                            eventos.length>0
                            ?
                                <EventosTable   data={eventos}
                                                showPromociones ={true}/>
                            : "No hay eventos asociados"
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
