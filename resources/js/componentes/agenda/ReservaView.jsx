import React, {
    Component,
    useState,
    useContext,
    useRef,
    useEffect
 } from 'react';
import {withRouter} from 'react-router';
import {reservaGenerator} from '../../generators/reservaGenerator';
import ReservasTable from '../tables/ReservasTable';
import AttentionSchedule from '../basic/AttentionSchedule';
import {getMonthLength} from '../../utils/Helper';
import {DAYS,MONTHS} from '../../constantes/DaysMonths';
import {Select} from '../input/Select'

export function processData (
    data
) {
    return Object.values(data).reduce(
        (t,x) => [...t,...x],[]
    );
}

const generateDays =
    (month,year) => (
        Array.from(Array(getMonthLength(month,year)+1).keys()).reduce(
            (t,x) => {
                if (x)
                    t[x] = x;
                return t;
            },{}
        )
    );

export function DayNavigation (props){
    console.log(props.date)
    const date = new Date(props.date),
        day = {
            name: "day",
            selected: props.isFirst
                ? ""
                : date.getDate(),
            list: generateDays(date.getMonth(),date.getFullYear())
        }
    return (
        <div className="container-fluid no-padding">
            <div className="row">
                <div className="col-md-12">
                    <div className="inline-block margin-box text-super v-padding m-font">
                        {
                            props.isFirst
                                ? "Selecciona un "
                                : `Viendo: ${DAYS[props.date.getDay()]}`
                        }
                    </div>
                    <div className="inline-block margin-box" style={{width:"60px"}}>
                        <Select titulo="dia"
                            changeSelect={props.changeDay}
                            errors={[]}
                            {...day}/>
                    </div>
                    <div className="text-super inline-block margin-box twenty m-font">
                        {` de ${MONTHS[date.getMonth()]} del ${date.getFullYear()}`}
                    </div>
                </div>
            </div>
        </div>
    )
}

function changeScroll(ref,off){
    ref.current.scroll({
        left:(off*100)-600,
        top:0,
        behavior:'smooth'
    });
}

function View(props) {
    let data = processData(props.data.data),
        days;
    const [date,changeDate] = useState(new Date(props.data.date)),
        isFirst = useRef(props.data.first),
        ref = useRef(null),
        changeDay = (e) => {
            const off = parseInt(e.currentTarget.getAttribute('value')||0);
            isFirst.current = off === date.getDate()||!off;
            changeScroll(ref,isFirst.current ? 0 : off);
            changeDate(new Date(date.setDate(off)));
        },
        horarios = props.data.horarios.data[date.getDay()+1];

    useEffect(
        () => {
            if (props.data.date.getMonth() !== date.getMonth()){
                isFirst.current=true;
                changeScroll(ref,0);
                changeDate(new Date(props.data.date));
            }
            if (!ref.current.scrollLeft && !isFirst.current){
                changeScroll(ref,date.getDate());
            }
        },
        [props.data.date,date]
    );

    data = isFirst.current
        ? data
        : props.data.data[date.getDate()]||[];

    days =  reservaGenerator(
        date,
        props.data.data,
        changeDay,
        isFirst.current
    );

    return (
        <div className="full-width">
            <div className="v-padding">
                <ul className="nav-list flex-row no-padding" ref={ref}>
                    {days}
                </ul>
            </div>
            <div className="v-padding container-fluid">
                <div className="row">
                    <DayNavigation date={date}
                        isFirst={isFirst.current}
                        changeDay={changeDay}/>
                </div>
                {
                    (horarios)
                    ?
                        <>
                            <div className="row">
                                <AttentionSchedule data={horarios}
                                    displayQty={`${data.length} reservas encontradas`}/>
                            </div>
                            <div className="row v-padding">
                                <ReservasTable data={data}/>
                            </div>
                        </>
                    :
                        <div>
                            Aun no has asignado los horarios de trabajo de tu local
                        </div>
                }
            </div>
        </div>
    )
}

export const ReservaView = withRouter(
    React.memo(View)
);
