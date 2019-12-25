import React, {
    Component,
    useState,
    useEffect,
    useRef
} from 'react';
import {
    DAYS,
    MONTHS
} from '../constantes/DaysMonths';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

function CalendarioMemo(props) {
    const   today = new Date(props.date),
            [dateEvent,changeDate]  = useState({event:null,dt:today}),
            frst = useRef(true),
            inputRef = useRef(null),
            changeDay = (date) => {
                changeDate({
                    event:new Event('change',{
                        bubbles: true
                    }),
                    dt:date
                });
            },
            tileDisabled = ({
                activeStartDate,
                date,
                view
            }) => {
                let disableByDate = false;
                if (props.editar)
                    disableByDate =
                        today.getDate() < date.getDate()
                            || today.getDate() > date.getDate();
                else
                    disableByDate = view === 'month'
                        ? props.data.feriados[date.getDate()]
                        : date.getMonth() < activeStartDate.getMonth()
                            || date.getFullYear() < activeStartDate.getFullYear();

                return disableByDate;
            },
            monthChange = (date) => {
                props.fetch(
                    '/horarios/feriados/agregar',
                    {date:date,refresh:true},
                    'horarios/feriados'
                );
            },
            navChange = ({
                activeStartDate,
                view
            }) => {
                props.fetch(
                    '/horarios/feriados/agregar',
                    {date:activeStartDate,refresh:true},
                    'horarios/feriados'
                );
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
                    value={dateEvent.dt}
                    onChange={props.change}
                    name={"fecha_feriado"}
                    ref={inputRef}
                    className="hidden" />
            <Calendar   showNavigation={!props.editar}
                        tileClassName='relative'
                        showNeighboringMonth={false}
                        value={
                            props.editar
                                ? today
                                : dateEvent.dt
                        }
                        minDate={new Date()}
                        onClickDay={
                            props.editar
                                ? () => false
                                : (date) => changeDay(new Date(date))
                        }
                        onClickMonth={monthChange}
                        tileDisabled={tileDisabled}
                        onActiveDateChange={navChange} />
        </>
    );
}

export const Calendario = React.memo(CalendarioMemo)
