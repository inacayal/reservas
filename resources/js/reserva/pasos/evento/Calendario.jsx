/**
 * react basic
 */
import React,
{
    Component,
    useState,
    useEffect
} from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import {
    DAYS,
    MONTHS
} from '../../../constantes/DaysMonths';
import {compareDates} from '../../../utils/Helper';

function CalendarioMemo(props) {
    const   dayChange = (date) => {
                props.clickCallback(date)(date);
                props.changeHover(date);
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
                        data = feriado !== undefined ? feriado : props.data.horarios.data[date.getDay()+1],
                        cond = data.estado === 'no_laboral' || compareDates(date, props.minDate, {d:'<',m:'=',y:'='}),
                        handler =  (date) => (e) => props.changeHover(date);

                return feriado !== undefined
                    ?
                        <>
                            <div    className="full-cover box-padding"
                                    onMouseOver={cond ? e => false : handler(date) }
                                    onMouseLeave={cond ? e => false :handler(props.showDate)}
                                    onClick={props.clickCallback(date)}/>
                            <p className="no-margin bold smaller-text">
                                <i className="line-v-middle fas fa-ellipsis-h highlight-title" />
                            </p>
                        </>
                    :
                        <>
                            <div    className="full-cover box-padding"
                                    onMouseOver={cond ? e => false : handler(date) }
                                    onMouseLeave={cond ? e => false :handler(props.showDate)}
                                    onClick={props.clickCallback(date)}/>
                            <p></p>
                        </>
            },
            noOp = () => false;
    useEffect(() =>  noOp,[props.showDate]);
    return (
        <>
            <input type="date" value={props.showDate} readOnly name="fecha_reserva" className="hidden" />
            <Calendar
                tileClassName='relative'
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
