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
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import {
    DAYS,
    MONTHS
} from '../../../constantes/DaysMonths';
import {compareDates} from '../../../utils/Helper';

function CalendarioMemo(props) {
    const   [dateEvent,changeDate]  = useState({event:null,dt:props.showDate}),
            frst = useRef(true),
            inputRef = useRef(null),
            dayChange = (date) => {
                changeDate({
                    event:new Event('change',{
                        bubbles: true
                    }),
                    dt:date
                });
            },
            tileDisabled = ({ activeStartDate, date, view }) => {
                const   normal = props.data.horarios.data[date.getDay() + 1],
                        feriado = props.data.feriados.data[date.getDate()],
                        feriadoNoLaboral = feriado!==undefined
                            ? feriado.estado === 'no_laboral'
                            : false,
                        disableByDate = view === 'month'
                            ? normal.estado === 'no_laboral' || feriadoNoLaboral
                            : date.getMonth() < activeStartDate.getMonth() || date.getFullYear() < activeStartDate.getFullYear();

                return disableByDate;
            },
            monthChange = (date) => {
                props.fetch(date);
            },
            navChange = ({ activeStartDate, view }) => {
                props.fetch(activeStartDate);
            },
            tileContent = ({ date, view }) => {
                const   index = date.getDate(),
                        feriado = props.data.feriados.data[index],
                        data = feriado !== undefined
                            ? feriado
                            : props.data.horarios.data[date.getDay()+1],
                        cond = data.estado === 'no_laboral' || compareDates(date, props.minDate, {d:'<',m:'=',y:'='}),
                        handler =  (date) =>
                            (e) =>
                                props.changeHover(date);

                return feriado !== undefined
                    ?
                        <>
                            <div    className="full-cover box-padding"
                                    onMouseOver={cond ? e => false : handler(date) }
                                    onMouseLeave={cond ? e => false :handler(props.showDate)}/>
                            <p className="no-margin bold smaller-text">
                                <i className="line-v-middle fas fa-ellipsis-h highlight-title" />
                            </p>
                        </>
                    :
                        <>
                            <div    className="full-cover box-padding"
                                    onMouseOver={cond ? e => false : handler(date) }
                                    onMouseLeave={cond ? e => false :handler(props.showDate)}/>
                            <p></p>
                        </>
            };

    useEffect(
        () => {
            if (!frst.current)
                inputRef.current.dispatchEvent(dateEvent.event);
            else
                frst.current = false;
        },
         [dateEvent]
    );

    return (
        <>
            <input  readOnly
                    type="date"
                    ref = {inputRef}
                    value={dateEvent.dt}
                    onChange={props.clickCallback(dateEvent.dt)}
                    name="fecha_reserva"
                    className="hidden" />
            <Calendar   tileClassName='relative'
                        showNeighboringMonth={false}
                        value={props.showDate}
                        minDate={props.minDate}
                        onClickDay={dayChange}
                        onClickMonth={monthChange}
                        tileDisabled={tileDisabled}
                        tileContent={tileContent}
                        onActiveDateChange={navChange} />
        </>
    );
}

export const Calendario =  React.memo(CalendarioMemo)
