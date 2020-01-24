/**
 * react basic
 */
import React,
{
    Component,
    useState,
    useEffect,
    useRef
} from 'react';
import {
    DAYS,
    MONTHS
} from '../../../constantes/DaysMonths';
import ReactDOM from 'react-dom';
import Promociones from './Promociones';
import Calendario from './Calendario';
import {compareDates} from '../../../utils/Helper';

function CalendarioEventos(props){
    const   data = props.data.data,
            [date,changeDate] = useState(props.showDate),
            [hoverDate, changeHover] = useState(props.showDate),
            fecha = hoverDate.getDate(),
            dia = hoverDate.getDay(),
            hoverData = data.feriados.data[fecha]
                ? data.feriados.data[fecha]
                : data.horarios.data[dia+1],
            feriado = data.feriados.data[fecha],
            horarioAtencion = `${hoverData.apertura.atencion.hora}:${hoverData.apertura.atencion.minuto < 10 ? "0" + hoverData.apertura.atencion.minuto : hoverData.apertura.atencion.minuto} - ${hoverData.cierre.atencion.hora}:${hoverData.cierre.atencion.minuto < 10 ? "0" + hoverData.cierre.atencion.minuto : hoverData.cierre.atencion.minuto}`,
            horarioReserva = `${hoverData.apertura.reserva.hora }:${hoverData.apertura.reserva.minuto < 10 ? "0" + hoverData.apertura.reserva.minuto : hoverData.apertura.reserva.minuto} - ${hoverData.cierre.reserva.hora}:${hoverData.cierre.reserva.minuto < 10 ? "0" + hoverData.cierre.reserva.minuto : hoverData.cierre.reserva.minuto}`;

    useEffect(
        () => {
            changeDate(props.showDate)
            changeHover(props.showDate)
        },
        [props.showDate]
    )

    return (
        <>
            <div className="row v-padding">
                <div className="col-md-8 no-padding highlight sub-title">
                    <div>
                        {`${DAYS[dia]} ${fecha} de ${MONTHS[hoverDate.getMonth()]} ${hoverDate.getFullYear()}`}
                    </div>
                    {
                        feriado
                        ?
                            <div className="sub-title text">
                                {feriado.nombre}
                            </div>
                        :
                            ""
                    }
                </div>
                <div className="col-md-4 no-padding text-right">
                    <div>
                        <span className="m-font side-margin">
                            atención:
                        </span>
                        <span className="side-margin">
                            {`${horarioAtencion} horas`}
                        </span>
                    </div>
                    <div>
                        <span className="m-font side-margin">
                            reservas:
                        </span>
                        <span className="side-margin">{`${horarioReserva} horas`}</span>
                    </div>
                </div>
                <div className="row justify-content-center v-padding">
                    <div className="container col-md-11">
                        <div className="row">
                            <div className="col-md-8 text-left">
                                <Calendario showDate={date}
                                            minDate={props.minDate}
                                            formDate = {props.fecha}
                                            data={props.data}
                                            changeHover={changeHover}
                                            fetch={props.fetch}
                                            clickCallback={props.clickCallback}
                                            change ={props.change} />
                            </div>
                            <div className="col-md-4 no-padding">
                                <Promociones data={hoverData.eventos.data}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default  React.memo(
    CalendarioEventos,
    (pp,np) => compareDates(
            pp.showDate,
            np.showDate,{
                d:'=',
                m:'=',
                y:'='
            }
        )
);
