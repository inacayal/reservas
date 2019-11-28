import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Titulo from '../../../componentes/basic/Titulo';
import {DAYS} from '../../../constantes/DaysMonths';
import {CommaList} from '../../../componentes/basic/CommaList';
import EventosTable from '../../../componentes/tables/EventosTable';

export function VerHorario (props) {
    props.nav.buttons[0].click = props.toggleModal;
    const data = props.data,
        estado = data.estado.replace('_',' '),
        eventos = Object.values(data.eventos.data).map(
            e => ({
                ...e,
                nombre:<Link to={"/eventos/"+e.id}>{e.nombre}</Link>,
                promociones:<CommaList list={e.promociones.list} endpoint={'/promociones'}/>
            })
        );

    return (
        <>
            < Titulo
                title={DAYS[data.diaSemana-1]}
                links={props.nav.links}
                buttons={props.nav.buttons} />
            <div className="container">
                <div className="row bold sub-title justify-content-end">{"día " +estado}</div>
                <div className="row ">
                    <div className="col-md-6 container-fluid">
                        <div className="bold row light-danger side-margin">Horario de atención:</div>
                        <div className="row">
                            <div className="col-md-6">
                                <span className="bold side-margin">Apertura:</span>
                                <span className="side-margin">
                                {
                                    data.apertura.atencion.hora + ":" +
                                    data.apertura.atencion.minuto +"hs"
                                }
                                </span>
                            </div>
                            <div className="col-md-6">
                                <span className="bold side-margin">Cierre:</span>
                                <span className="side-margin">
                                {
                                    data.cierre.atencion.hora + ":" +
                                    data.cierre.atencion.minuto +"hs"
                                }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 container-fluid">
                        <div className="row bold light-danger side-margin top-padding">Horario de reservas:</div>
                        <div className="row medium-left-padding">
                            <div className="col-md-6">
                                <span className="bold side-margin">Apertura:</span>
                                <span className="side-margin">
                                {
                                    data.apertura.reserva.hora + ":" +
                                    data.apertura.reserva.minuto +"hs"
                                }
                                </span>
                            </div>
                            <div className="col-md-6">
                                <span className="bold side-margin">Cierre:</span>
                                <span className="side-margin">
                                {
                                    data.cierre.reserva.hora + ":" +
                                    data.cierre.reserva.minuto +"hs"
                                }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row v-padding">
                    <h6 className="sub-title bold">Eventos</h6>
                    {
                        eventos.length>0
                        ?
                            <EventosTable data={eventos} showPromociones ={true}/>
                        :
                            "No hay eventos asociados"
                    }
                </div>
            </div>
        </>
    );
}
